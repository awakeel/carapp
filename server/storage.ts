import { carAnalysis, type CarAnalysis, type InsertCarAnalysis, users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  createCarAnalysis(data: InsertCarAnalysis): Promise<CarAnalysis>;
  getCarAnalysis(id: number): Promise<CarAnalysis | undefined>;
  createUser(data: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async createCarAnalysis(data: InsertCarAnalysis): Promise<CarAnalysis> {
    const [analysis] = await db.insert(carAnalysis)
      .values([data])
      .returning();
    return analysis;
  }

  async getCarAnalysis(id: number): Promise<CarAnalysis | undefined> {
    const [analysis] = await db.select()
      .from(carAnalysis)
      .where(eq(carAnalysis.id, id));
    return analysis;
  }

  async createUser(data: InsertUser): Promise<User> {
    const [user] = await db.insert(users)
      .values([data])
      .returning();
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }
}

export const storage = new DatabaseStorage();