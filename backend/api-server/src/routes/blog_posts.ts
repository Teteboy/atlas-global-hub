import { Router } from "express";
import { db, blogPostsTable, insertBlogPostSchema } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

const router = Router();

const updateBlogPostSchema = insertBlogPostSchema.partial();

router.get("/blog-posts", async (req, res) => {
  try {
    const posts = await db
      .select()
      .from(blogPostsTable)
      .orderBy(desc(blogPostsTable.publishedAt));
    return res.json(posts);
  } catch (err) {
    req.log.error({ err }, "Failed to list blog posts");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/blog-posts", requireAuth, async (req, res) => {
  try {
    const parsed = insertBlogPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const [post] = await db
      .insert(blogPostsTable)
      .values(parsed.data)
      .returning();

    return res.status(201).json(post);
  } catch (err) {
    req.log.error({ err }, "Failed to create blog post");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/blog-posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.id, id))
      .limit(1);

    if (!post) return res.status(404).json({ error: "Not found" });
    return res.json(post);
  } catch (err) {
    req.log.error({ err }, "Failed to get blog post");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/blog-posts/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const parsed = updateBlogPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error });
    }

    const post = await db
      .update(blogPostsTable)
      .set(parsed.data)
      .where(eq(blogPostsTable.id, id))
      .returning();

    if (!post.length) return res.status(404).json({ error: "Not found" });
    return res.json(post[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update blog post");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/blog-posts/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const post = await db
      .delete(blogPostsTable)
      .where(eq(blogPostsTable.id, id))
      .returning();

    if (!post.length) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete blog post");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
