import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  titleFr: text("title_fr").notNull(),
  titleEn: text("title_en").notNull(),
  taglineFr: text("tagline_fr").notNull(),
  taglineEn: text("tagline_en").notNull(),
  challengeFr: text("challenge_fr").notNull(),
  challengeEn: text("challenge_en").notNull(),
  approachFr: text("approach_fr").notNull(),
  approachEn: text("approach_en").notNull(),
  scopeFr: text("scope_fr").notNull(),
  scopeEn: text("scope_en").notNull(),
  resultFr: text("result_fr").notNull(),
  resultEn: text("result_en").notNull(),
  countries: text("countries").array().notNull().default([]),
  duration: text("duration").notNull(),
  budget: text("budget").notNull(),
  funder: text("funder").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  imageUrl: text("image_url"),
  ctaLabelFr: text("cta_label_fr"),
  ctaLabelEn: text("cta_label_en"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;
