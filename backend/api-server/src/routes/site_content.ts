import { Router } from "express";
import { eq, asc, like } from "drizzle-orm";
import { db, siteContentTable, insertSiteContentSchema, updateSiteContentSchema } from "@workspace/db";
import { requireAuth } from "../middleware/auth";
import type { Request, Response } from "express";

const router = Router();

// Public: list all CMS content, optionally filter by category
router.get("/site-content", async (req: Request, res: Response) => {
  try {
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const rows = await db
      .select()
      .from(siteContentTable)
      .where(category ? like(siteContentTable.category, `%${category}%`) : undefined)
      .orderBy(asc(siteContentTable.category), asc(siteContentTable.key));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r]));
    return res.json({ rows, byKey });
  } catch (err) {
    req.log.error({ err }, "Failed to list site content");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Public: single CMS entry by key
router.get("/site-content/:key", async (req: Request, res: Response) => {
  try {
    const [row] = await db
      .select()
      .from(siteContentTable)
      .where(eq(siteContentTable.key, req.params.key as string))
      .limit(1);

    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to get site content");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: create CMS entry
router.post("/site-content", requireAuth, async (req: Request, res: Response) => {
  try {
    const parsed = insertSiteContentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const [row] = await db.insert(siteContentTable).values(parsed.data).returning();
    return res.status(201).json(row);
  } catch (err: any) {
    if (err?.code === "23505") {
      return res.status(409).json({ error: "Content key already exists" });
    }
    req.log.error({ err }, "Failed to create site content");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: update CMS entry
router.put("/site-content/:key", requireAuth, async (req: Request, res: Response) => {
  try {
    const parsed = updateSiteContentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const [row] = await db
      .update(siteContentTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(siteContentTable.key, req.params.key as string))
      .returning();

    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to update site content");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete CMS entry
router.delete("/site-content/:key", requireAuth, async (req: Request, res: Response) => {
  try {
    const [row] = await db
      .delete(siteContentTable)
      .where(eq(siteContentTable.key, req.params.key as string))
      .returning();

    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete site content");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
