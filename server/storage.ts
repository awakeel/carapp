import { carAnalysis, type CarAnalysis, type InsertCarAnalysis } from "@shared/schema";

export interface IStorage {
  createCarAnalysis(data: InsertCarAnalysis): Promise<CarAnalysis>;
  getCarAnalysis(id: number): Promise<CarAnalysis | undefined>;
}

export class MemStorage implements IStorage {
  private analyses: Map<number, CarAnalysis>;
  private currentId: number;

  constructor() {
    this.analyses = new Map();
    this.currentId = 1;
  }

  async createCarAnalysis(data: InsertCarAnalysis): Promise<CarAnalysis> {
    const id = this.currentId++;
    const analysis: CarAnalysis = { ...data, id };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getCarAnalysis(id: number): Promise<CarAnalysis | undefined> {
    return this.analyses.get(id);
  }
}

export const storage = new MemStorage();
