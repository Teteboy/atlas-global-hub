import { Router } from "express";
import { db, servicesTable, insertServiceSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

const router = Router();

const updateServiceSchema = insertServiceSchema.partial();

router.get("/services", async (req, res) => {
  try {
    const services = await db
      .select()
      .from(servicesTable)
      .orderBy(servicesTable.order);
    return res.json(services);
  } catch (err) {
    req.log.error({ err }, "Failed to list services");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [service] = await db
      .select()
      .from(servicesTable)
      .where(eq(servicesTable.id, id))
      .limit(1);

    if (!service) return res.status(404).json({ error: "Not found" });
    return res.json(service);
  } catch (err) {
    req.log.error({ err }, "Failed to get service");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Create service
router.post("/services", requireAuth, async (req, res) => {
  try {
    const parsed = insertServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const service = await db
      .insert(servicesTable)
      .values(parsed.data)
      .returning();
    return res.status(201).json(service[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create service");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Update service
router.put("/services/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const parsed = updateServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const service = await db
      .update(servicesTable)
      .set(parsed.data)
      .where(eq(servicesTable.id, id))
      .returning();

    if (!service.length) return res.status(404).json({ error: "Not found" });
    return res.json(service[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update service");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Delete service
router.delete("/services/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const service = await db
      .delete(servicesTable)
      .where(eq(servicesTable.id, id))
      .returning();

    if (!service.length) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete service");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
