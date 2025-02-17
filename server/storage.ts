import { carAnalysis, type CarAnalysis, type InsertCarAnalysis } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createCarAnalysis(data: InsertCarAnalysis): Promise<CarAnalysis>;
  getCarAnalysis(id: number): Promise<CarAnalysis | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createCarAnalysis(data: InsertCarAnalysis): Promise<CarAnalysis> {
    const [analysis] = await db.insert(carAnalysis)
      .values(data)
      .returning();
    return analysis;
  }

  async getCarAnalysis(id: number): Promise<CarAnalysis | undefined> {
    const [analysis] = await db.select()
      .from(carAnalysis)
      .where(eq(carAnalysis.id, id));
    return analysis;
  }
}

export const storage = new DatabaseStorage();