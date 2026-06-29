import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const sectorsTable = pgTable("sectors", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titleFr: text("title_fr").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").notNull(),
  icon: text("icon").notNull(),
  corridor: text("corridor").notNull(),
  countries: text("countries").array().notNull().default([]),
  highlights: text("highlights").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSectorSchema = createInsertSchema(sectorsTable).omit({ id: true, createdAt: true });
export type InsertSector = z.infer<typeof insertSectorSchema>;
export type Sector = typeof sectorsTable.$inferSelect;
