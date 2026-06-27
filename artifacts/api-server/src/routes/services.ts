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

export default router;
