import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  titleFr: text("title_fr").notNull(),
  titleEn: text("title_en").notNull(),
  summaryFr: text("summary_fr").notNull(),
  summaryEn: text("summary_en").notNull(),
  bodyFr: text("body_fr").notNull(),
  bodyEn: text("body_en").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true, createdAt: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
