import { Router } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { SubmitContactBody } from "@workspace/api-zod";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const parsed = SubmitContactBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const data = parsed.data;
    const [submission] = await db
      .insert(contactSubmissionsTable)
      .values({
        name: data.name,
        organization: data.organization,
        email: data.email,
        country: data.country,
        subject: data.subject,
        needType: data.needType,
        message: data.message,
        lang: data.lang ?? null,
      })
      .returning();

    return res.status(201).json(submission);
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/contact/submissions", requireAuth, async (req, res) => {
  try {
    const submissions = await db
      .select()
      .from(contactSubmissionsTable)
      .orderBy(desc(contactSubmissionsTable.createdAt));
    return res.json(submissions);
  } catch (err) {
    req.log.error({ err }, "Failed to list contact submissions");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
