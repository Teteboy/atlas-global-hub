import { Router } from "express";
import { db, projectsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/projects", async (req, res) => {
  try {
    const projects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.createdAt));
    res.json(projects);
  } catch (err) {
    req.log.error({ err }, "Failed to list projects");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id))
      .limit(1);

    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    req.log.error({ err }, "Failed to get project");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Create project
router.post("/projects", async (req, res) => {
  try {
    const project = await db
      .insert(projectsTable)
      .values(req.body)
      .returning();
    res.status(201).json(project[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create project");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Update project
router.put("/projects/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const project = await db
      .update(projectsTable)
      .set(req.body)
      .where(eq(projectsTable.id, id))
      .returning();

    if (!project.length) return res.status(404).json({ error: "Not found" });
    res.json(project[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update project");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: Delete project
router.delete("/projects/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const project = await db
      .delete(projectsTable)
      .where(eq(projectsTable.id, id))
      .returning();

    if (!project.length) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete project");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
