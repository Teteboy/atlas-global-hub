import { Router } from "express";
import { db, servicesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/services", async (req, res) => {
  try {
    const services = await db
      .select()
      .from(servicesTable)
      .orderBy(servicesTable.order);
    res.json(services);
  } catch (err) {
    req.log.error({ err }, "Failed to list services");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [service] = await db
      .select()
      .from(servicesTable)
      .where(eq(servicesTable.id, id))
      .limit(1);

    if (!service) return res.status(404).json({ error: "Not found" });
    res.json(service);
  } catch (err) {
    req.log.error({ err }, "Failed to get service");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Create service
router.post("/services", async (req, res) => {
  try {
    const service = await db
      .insert(servicesTable)
      .values(req.body)
      .returning();
    res.status(201).json(service[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create service");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Update service
router.put("/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const service = await db
      .update(servicesTable)
      .set(req.body)
      .where(eq(servicesTable.id, id))
      .returning();

    if (!service.length) return res.status(404).json({ error: "Not found" });
    res.json(service[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update service");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Delete service
router.delete("/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const service = await db
      .delete(servicesTable)
      .where(eq(servicesTable.id, id))
      .returning();

    if (!service.length) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete service");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
