import { Router } from "express";
import { db, servicesTable, projectsTable, insightsTable, sectorsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const [
      services,
      projects,
      insights,
      sectors,
      featuredProjects,
      recentInsights,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(servicesTable),
      db.select({ count: sql<number>`count(*)::int` }).from(projectsTable),
      db.select({ count: sql<number>`count(*)::int` }).from(insightsTable),
      db.select({ count: sql<number>`count(*)::int` }).from(sectorsTable),
      db
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.featured, true))
        .orderBy(desc(projectsTable.createdAt))
        .limit(3),
      db
        .select()
        .from(insightsTable)
        .where(eq(insightsTable.featured, true))
        .orderBy(desc(insightsTable.publishedAt))
        .limit(3),
    ]);

    const allProjects = await db.select({ countries: projectsTable.countries }).from(projectsTable);
    const uniqueCountries = new Set(allProjects.flatMap((p) => p.countries));

    res.json({
      totalProjects: projects[0]?.count ?? 0,
      totalServices: services[0]?.count ?? 0,
      totalInsights: insights[0]?.count ?? 0,
      totalCountries: uniqueCountries.size,
      featuredProjects,
      recentInsights,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
