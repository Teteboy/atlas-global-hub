import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const servicesTable = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titleFr: text("title_fr").notNull(),
  titleEn: text("title_en").notNull(),
  taglineFr: text("tagline_fr").notNull(),
  taglineEn: text("tagline_en").notNull(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  deliverablesFr: text("deliverables_fr").array().notNull().default([]),
  deliverablesEn: text("deliverables_en").array().notNull().default([]),
  mandateExamplesFr: text("mandate_examples_fr").array().notNull().default([]),
  mandateExamplesEn: text("mandate_examples_en").array().notNull().default([]),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertServiceSchema = createInsertSchema(servicesTable).omit({ id: true, createdAt: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof servicesTable.$inferSelect;
