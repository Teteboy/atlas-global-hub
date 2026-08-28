import { Router } from "express";
import { eq, asc } from "drizzle-orm";
import { db, siteSettingsTable, insertSiteSettingsSchema, updateSiteSettingsSchema } from "@workspace/db";
import { requireAuth } from "../middleware/auth";
import type { Request, Response } from "express";

const router = Router();

// Public: list all site settings
router.get("/site-settings", async (req: Request, res: Response) => {
  try {
    const rows = await db.select().from(siteSettingsTable).orderBy(asc(siteSettingsTable.key));
    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return res.json({ rows, byKey });
  } catch (err) {
    req.log.error({ err }, "Failed to list site settings");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Public: single setting
router.get("/site-settings/:key", async (req: Request, res: Response) => {
  try {
    const [row] = await db
      .select()
      .from(siteSettingsTable)
      .where(eq(siteSettingsTable.key, req.params.key as string))
      .limit(1);

    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to get site setting");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: create or replace a setting
router.put("/site-settings/:key", requireAuth, async (req: Request, res: Response) => {
  try {
    const parsed = updateSiteSettingsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const existing = await db
      .select({ id: siteSettingsTable.id })
      .from(siteSettingsTable)
      .where(eq(siteSettingsTable.key, req.params.key as string))
      .limit(1);

    if (existing.length > 0) {
      const [row] = await db
        .update(siteSettingsTable)
        .set({ value: parsed.data.value ?? "", updatedAt: new Date() })
        .where(eq(siteSettingsTable.key, req.params.key as string))
        .returning();
      return res.json(row);
    }

    const [row] = await db
      .insert(siteSettingsTable)
      .values({ key: req.params.key as string, value: parsed.data.value ?? "" })
      .returning();
    return res.status(201).json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to upsert site setting");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: batch update settings
router.put("/site-settings", requireAuth, async (req: Request, res: Response) => {
  try {
    const values = req.body;
    if (typeof values !== "object" || values === null) {
      return res.status(400).json({ error: "Expected object of key-value pairs" });
    }

    const results: any[] = [];
    for (const [key, raw] of Object.entries(values)) {
      const value = typeof raw === "string" ? raw : JSON.stringify(raw);
      const existing = await db
        .select({ id: siteSettingsTable.id })
        .from(siteSettingsTable)
        .where(eq(siteSettingsTable.key, key))
        .limit(1);

      if (existing.length > 0) {
        const [row] = await db
          .update(siteSettingsTable)
          .set({ value, updatedAt: new Date() })
          .where(eq(siteSettingsTable.key, key))
          .returning();
        results.push(row);
      } else {
        const [row] = await db.insert(siteSettingsTable).values({ key, value }).returning();
        results.push(row);
      }
    }

    return res.json(results);
  } catch (err) {
    req.log.error({ err }, "Failed to batch update site settings");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete setting
router.delete("/site-settings/:key", requireAuth, async (req: Request, res: Response) => {
  try {
    const [row] = await db
      .delete(siteSettingsTable)
      .where(eq(siteSettingsTable.key, req.params.key as string))
      .returning();

    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete site setting");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
