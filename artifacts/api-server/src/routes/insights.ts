import { Router } from "express";
import { db, insightsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { CreateInsightBody } from "@workspace/api-zod";

const router = Router();

router.get("/insights", async (req, res) => {
  try {
    const insights = await db
      .select()
      .from(insightsTable)
      .orderBy(desc(insightsTable.publishedAt));
    res.json(insights);
  } catch (err) {
    req.log.error({ err }, "Failed to list insights");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/insights", async (req, res) => {
  try {
    const parsed = CreateInsightBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const data = parsed.data;
    const [insight] = await db
      .insert(insightsTable)
      .values({
        titleFr: data.titleFr,
        titleEn: data.titleEn,
        summaryFr: data.summaryFr,
        summaryEn: data.summaryEn,
        bodyFr: data.bodyFr,
        bodyEn: data.bodyEn,
        category: data.category,
        imageUrl: data.imageUrl ?? null,
        featured: data.featured ?? false,
      })
      .returning();

    res.status(201).json(insight);
  } catch (err) {
    req.log.error({ err }, "Failed to create insight");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/insights/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [insight] = await db
      .select()
      .from(insightsTable)
      .where(eq(insightsTable.id, id))
      .limit(1);

    if (!insight) return res.status(404).json({ error: "Not found" });
    res.json(insight);
  } catch (err) {
    req.log.error({ err }, "Failed to get insight");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
