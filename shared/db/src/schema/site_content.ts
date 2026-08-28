import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const siteContentTable = pgTable("site_content", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  valueFr: text("value_fr"),
  valueEn: text("value_en"),
  value: text("value"),
  type: text("type").notNull().default("text"),
  category: text("category").notNull().default("general"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSiteContentSchema = createInsertSchema(siteContentTable).omit({ id: true, createdAt: true, updatedAt: true });
export const updateSiteContentSchema = insertSiteContentSchema.partial().omit({ key: true });
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type UpdateSiteContent = z.infer<typeof updateSiteContentSchema>;
export type SiteContent = typeof siteContentTable.$inferSelect;
