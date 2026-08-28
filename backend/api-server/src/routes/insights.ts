import { Router } from "express";
import { db, insightsTable, insertInsightSchema } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

const router = Router();

const updateInsightSchema = insertInsightSchema.partial();

router.get("/insights", async (req, res) => {
  try {
    const insights = await db
      .select()
      .from(insightsTable)
      .orderBy(desc(insightsTable.publishedAt));
    return res.json(insights);
  } catch (err) {
    req.log.error({ err }, "Failed to list insights");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/insights", requireAuth, async (req, res) => {
  try {
    const parsed = insertInsightSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const [insight] = await db
      .insert(insightsTable)
      .values(parsed.data)
      .returning();

    return res.status(201).json(insight);
  } catch (err) {
    req.log.error({ err }, "Failed to create insight");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/insights/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [insight] = await db
      .select()
      .from(insightsTable)
      .where(eq(insightsTable.id, id))
      .limit(1);

    if (!insight) return res.status(404).json({ error: "Not found" });
    return res.json(insight);
  } catch (err) {
    req.log.error({ err }, "Failed to get insight");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Update insight
router.put("/insights/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const parsed = updateInsightSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const insight = await db
      .update(insightsTable)
      .set(parsed.data)
      .where(eq(insightsTable.id, id))
      .returning();

    if (!insight.length) return res.status(404).json({ error: "Not found" });
    return res.json(insight[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update insight");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Delete insight
router.delete("/insights/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const insight = await db
      .delete(insightsTable)
      .where(eq(insightsTable.id, id))
      .returning();

    if (!insight.length) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete insight");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
