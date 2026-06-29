import { Router } from "express";
import { db, sectorsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/sectors", async (req, res) => {
  try {
    const sectors = await db.select().from(sectorsTable);
    res.json(sectors);
  } catch (err) {
    req.log.error({ err }, "Failed to list sectors");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/sectors/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [sector] = await db
      .select()
      .from(sectorsTable)
      .where(eq(sectorsTable.id, id))
      .limit(1);

    if (!sector) return res.status(404).json({ error: "Not found" });
    res.json(sector);
  } catch (err) {
    req.log.error({ err }, "Failed to get sector");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Create sector
router.post("/sectors", async (req, res) => {
  try {
    const sector = await db
      .insert(sectorsTable)
      .values(req.body)
      .returning();
    res.status(201).json(sector[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create sector");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Update sector
router.put("/sectors/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const sector = await db
      .update(sectorsTable)
      .set(req.body)
      .where(eq(sectorsTable.id, id))
      .returning();

    if (!sector.length) return res.status(404).json({ error: "Not found" });
    res.json(sector[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update sector");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Delete sector
router.delete("/sectors/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const sector = await db
      .delete(sectorsTable)
      .where(eq(sectorsTable.id, id))
      .returning();

    if (!sector.length) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete sector");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
