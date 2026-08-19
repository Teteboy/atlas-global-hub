import { db, siteContentTable, siteSettingsTable } from "./src/index";
import { sql } from "drizzle-orm";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_SRC = path.resolve(__dirname, "..", "..", "frontend", "atlas", "src");

// Regexes for quoted string literals (double or single)
const STR_RE = `"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'`;

const getTextRe = new RegExp(
  `getText\\s*\\(\\s*(${STR_RE})\\s*(?:,\\s*(${STR_RE})\\s*)?(?:,\\s*(${STR_RE})\\s*)?\\)`,
  "gs"
);
const getSettingRe = new RegExp(
  `getSetting\\s*\\(\\s*(${STR_RE})\\s*(?:,\\s*(${STR_RE})\\s*)?\\)`,
  "gs"
);
const getValueRe = new RegExp(
  `getValue\\s*\\(\\s*(${STR_RE})\\s*(?:,\\s*(${STR_RE})\\s*)?\\)`,
  "gs"
);
const getJsonRe = new RegExp(
  `getJson\\s*\\(\\s*(${STR_RE})\\s*,\\s*([\\s\\S]+?)\\s*\\)`,
  "gs"
);
const tRe = new RegExp(
  `t\\s*\\(\\s*(${STR_RE})\\s*,\\s*(${STR_RE})\\s*\\)`,
  "gs"
);

const CATEGORIES = [
  "home",
  "about",
  "contact",
  "services",
  "sectors",
  "insights",
  "projects",
  "images",
  "navigation",
  "footer",
  "theme",
  "general",
];

function unquote(raw: string): string {
  if (!raw || raw.length < 2) return "";
  const q = raw[0];
  const inner = raw.slice(1, -1);

  if (q === '"') {
    return JSON.parse(raw);
  }

  if (q === "'") {
    try {
      return JSON.parse(raw.replace(/^'|'$/g, '"').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, "\\\\"));
    } catch {
      return inner.replace(/\\(.)/g, "$1");
    }
  }

  // template literal / fallback
  return inner.replace(/\\(.)/g, "$1");
}

function categoryFromKey(key: string): string {
  const first = key.split(".")[0];
  return CATEGORIES.includes(first) ? first : "general";
}

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(p));
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) files.push(p);
  }
  return files;
}

const contentRows = new Map<
  string,
  {
    key: string;
    valueFr: string | null;
    valueEn: string | null;
    value: string | null;
    type: string;
    category: string;
  }
>();
const settingsRows = new Map<string, { key: string; value: string }>();

function addContent(
  key: string,
  opts: Partial<{
    valueFr: string;
    valueEn: string;
    value: string;
    type: string;
    category: string;
  }>
) {
  const existing = contentRows.get(key) ?? {
    key,
    valueFr: null,
    valueEn: null,
    value: null,
    type: "text",
    category: categoryFromKey(key),
  };
  if (opts.valueFr !== undefined) existing.valueFr = opts.valueFr;
  if (opts.valueEn !== undefined) existing.valueEn = opts.valueEn;
  if (opts.value !== undefined) existing.value = opts.value;
  if (opts.type !== undefined) existing.type = opts.type;
  if (opts.category !== undefined) existing.category = opts.category;
  contentRows.set(key, existing);
}

function addSetting(key: string, value: string) {
  const existing = settingsRows.get(key);
  if (existing) existing.value = value;
  else settingsRows.set(key, { key, value });
}

for (const file of walk(FRONTEND_SRC)) {
  const src = fs.readFileSync(file, "utf8");

  for (const m of src.matchAll(getTextRe)) {
    const key = unquote(m[1]);
    const fr = m[2] ? unquote(m[2]) : undefined;
    const en = m[3] ? unquote(m[3]) : undefined;
    if (fr && en) {
      addContent(key, { valueFr: fr, valueEn: en });
    } else if (fr) {
      addContent(key, { value: fr });
    }
  }

  for (const m of src.matchAll(tRe)) {
    const fr = unquote(m[1]);
    const en = unquote(m[2]);
    addContent(fr, { valueFr: fr, valueEn: en, category: "general" });
  }

  for (const m of src.matchAll(getSettingRe)) {
    const key = unquote(m[1]);
    const fallback = m[2] ? unquote(m[2]) : "";
    addSetting(key, fallback);
  }

  for (const m of src.matchAll(getValueRe)) {
    const key = unquote(m[1]);
    const fallback = m[2] ? unquote(m[2]) : "";
    addContent(key, { value: fallback });
  }

  for (const m of src.matchAll(getJsonRe)) {
    const key = unquote(m[1]);
    const raw = m[2].trim();
    const first = raw[0];

    if (first === '"' || first === "'" || first === "`") {
      const val = unquote(raw);
      addContent(key, { value: val, type: "json" });
    } else if (first === "[" || first === "{") {
      try {
        JSON.parse(raw);
        addContent(key, { value: raw, type: "json" });
      } catch {
        // fallback is a JS expression (variables, unquoted keys). Skip so the
        // runtime fallback in the source continues to work and the admin can
        // later add a valid JSON value if desired.
      }
    }
  }
}

// Default settings referenced by the admin UI but not called via getSetting()
// in public components (e.g. contact details, brand name).
const manualSettings = [
  { key: "theme.colorDark", value: "#041b40" },
  { key: "theme.colorPrimary", value: "#00c4d4" },
  { key: "theme.colorPrimaryHover", value: "#00b0bf" },
  { key: "theme.colorLight", value: "#f5f0e6" },
  { key: "site.brandName", value: "Atlas Global" },
  { key: "site.brandTagline", value: "Resilience Corp." },
  { key: "contact.email", value: "contact@atlasglobal.com" },
  { key: "contact.phone", value: "+33 1 23 45 67 89" },
  { key: "contact.address", value: "Paris, France" },
];
for (const s of manualSettings) addSetting(s.key, s.value);

// Image / JSON fallbacks that are JS expressions (variables or inline arrays)
// cannot be auto-extracted by the regex. Seed them explicitly so the site
// displays the default images and they become editable in the CMS.
const manualImageContent = [
  {
    key: "projects.images.json",
    value: JSON.stringify([
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577041677443-8bbef8a04d1f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    ]),
    type: "json",
    category: "images",
  },
  {
    key: "insights.images.json",
    value: JSON.stringify([
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    ]),
    type: "json",
    category: "images",
  },
  {
    key: "services.images.json",
    value: JSON.stringify([
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=800&q=80",
    ]),
    type: "json",
    category: "images",
  },
  {
    key: "sectors.corridor.images.json",
    value: JSON.stringify([
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570173655490-d4c94ba4b0c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    ]),
    type: "json",
    category: "images",
  },
];
for (const c of manualImageContent) addContent(c.key, { value: c.value, type: c.type, category: c.category });

// Home image lists are stored as comma-separated settings and split at runtime.
const manualImageLists = [
  {
    key: "home.project.images",
    value:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80," +
      "https://images.unsplash.com/photo-1577041677443-8bbef8a04d1f?auto=format&fit=crop&w=800&q=80",
  },
  {
    key: "home.insight.images",
    value:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80," +
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80," +
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
];
for (const s of manualImageLists) addSetting(s.key, s.value);

async function seed() {
  console.log(`Seeding CMS from ${FRONTEND_SRC}...`);
  console.log(`- ${contentRows.size} content keys`);
  console.log(`- ${settingsRows.size} settings keys`);

  for (const row of contentRows.values()) {
    await db
      .insert(siteContentTable)
      .values(row)
      .onConflictDoUpdate({
        target: siteContentTable.key,
        set: {
          valueFr: row.valueFr,
          valueEn: row.valueEn,
          value: row.value,
          type: row.type,
          category: row.category,
          updatedAt: sql`now()`,
        },
      });
  }

  for (const row of settingsRows.values()) {
    await db
      .insert(siteSettingsTable)
      .values(row)
      .onConflictDoUpdate({
        target: siteSettingsTable.key,
        set: {
          value: row.value,
          updatedAt: sql`now()`,
        },
      });
  }

  console.log("CMS seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("CMS seed failed:", err);
  process.exit(1);
});
