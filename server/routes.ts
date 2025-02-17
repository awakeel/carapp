import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertCarAnalysisSchema } from "@shared/schema";
import { analyzeCarImage } from "./services/gemini";

export async function registerRoutes(app: Express) {
  // Analyze and store results
  app.post("/api/analyze", async (req, res) => {
  // Allow analysis without auth
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Image data is required" });
      }

      // Analyze the image using Gemini
      const analysis = await analyzeCarImage(imageBase64);

      // Create an image URL from the base64 data
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

      // Validate and store the results
      const validatedData = insertCarAnalysisSchema.parse({
        imageUrl,
        results: analysis.results
      });

      const savedAnalysis = await storage.createCarAnalysis(validatedData);
      res.json(savedAnalysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to analyze image" 
      });
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