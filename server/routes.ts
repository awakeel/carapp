import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertCarAnalysisSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Store analysis results
  app.post("/api/analyze", async (req, res) => {
    try {
      const { imageUrl, results } = req.body;
      if (!imageUrl || !results) {
        return res.status(400).json({ error: "Image URL and results are required" });
      }

      // Validate the data against our schema
      const validatedData = insertCarAnalysisSchema.parse({
        imageUrl,
        results
      });

      const analysis = await storage.createCarAnalysis(validatedData);
      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to store analysis" });
    }
  });

  // Get analysis by ID
  app.get("/api/analysis/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const analysis = await storage.getCarAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      console.error("Fetch error:", error);
      res.status(500).json({ error: "Failed to fetch analysis" });
    }
  });

  // Add a health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  const httpServer = createServer(app);
  return httpServer;
}