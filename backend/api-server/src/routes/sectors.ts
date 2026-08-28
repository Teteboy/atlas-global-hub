import { Router } from "express";
import { db, sectorsTable, insertSectorSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

const router = Router();

const updateSectorSchema = insertSectorSchema.partial();

router.get("/sectors", async (req, res) => {
  try {
    const sectors = await db.select().from(sectorsTable);
    return res.json(sectors);
  } catch (err) {
    req.log.error({ err }, "Failed to list sectors");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/sectors/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [sector] = await db
      .select()
      .from(sectorsTable)
      .where(eq(sectorsTable.id, id))
      .limit(1);

    if (!sector) return res.status(404).json({ error: "Not found" });
    return res.json(sector);
  } catch (err) {
    req.log.error({ err }, "Failed to get sector");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Create sector
router.post("/sectors", requireAuth, async (req, res) => {
  try {
    const parsed = insertSectorSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const sector = await db
      .insert(sectorsTable)
      .values(parsed.data)
      .returning();
    return res.status(201).json(sector[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create sector");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Update sector
router.put("/sectors/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const parsed = updateSectorSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const sector = await db
      .update(sectorsTable)
      .set(parsed.data)
      .where(eq(sectorsTable.id, id))
      .returning();

    if (!sector.length) return res.status(404).json({ error: "Not found" });
    return res.json(sector[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update sector");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Delete sector
router.delete("/sectors/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const sector = await db
      .delete(sectorsTable)
      .where(eq(sectorsTable.id, id))
      .returning();

    if (!sector.length) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete sector");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
