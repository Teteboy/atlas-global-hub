import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const insightsTable = pgTable("insights", {
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

export const insertInsightSchema = createInsertSchema(insightsTable).omit({ id: true, createdAt: true });
export type InsertInsight = z.infer<typeof insertInsightSchema>;
export type Insight = typeof insightsTable.$inferSelect;
