import { pgTable, text, serial, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const carAnalysis = pgTable("car_analysis", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  results: json("results").$type<{
    make: string;
    model: string;
    year?: string;
    color: string;
    licensePlate?: string;
    type: string;
  }>().notNull(),
});

export const insertCarAnalysisSchema = createInsertSchema(carAnalysis).pick({
  imageUrl: true,
  results: true,
});

export type InsertCarAnalysis = z.infer<typeof insertCarAnalysisSchema>;
export type CarAnalysis = typeof carAnalysis.$inferSelect;
