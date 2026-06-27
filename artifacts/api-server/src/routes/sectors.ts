import { Router } from "express";
import { db, sectorsTable } from "@workspace/db";

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

export default router;
