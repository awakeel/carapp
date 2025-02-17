import { pgTable, text, serial, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

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
  userId: serial("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schema for inserting users
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCarAnalysisSchema = createInsertSchema(carAnalysis).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCarAnalysis = z.infer<typeof insertCarAnalysisSchema>;
export type CarAnalysis = typeof carAnalysis.$inferSelect;