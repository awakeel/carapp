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

      const analysis = await storage.createCarAnalysis({
        imageUrl,
        results
      });

      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to store analysis" });
    }
  });

  // Get analysis by ID
  app.get("/api/analysis/:id", async (req, res) => {
    const analysis = await storage.getCarAnalysis(parseInt(req.params.id));
    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }
    res.json(analysis);
  });

  const httpServer = createServer(app);
  return httpServer;
}