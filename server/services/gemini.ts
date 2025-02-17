import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeCarImage(imageBase64: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const prompt = `Analyze this car image and provide the following details in JSON format:
    - make: the car manufacturer
    - model: the specific model name
    - year: the approximate year (if identifiable)
    - color: the main color of the car
    - type: the type of vehicle (sedan, SUV, truck, etc.)
    - licensePlate: the license plate number if visible (or null if not visible or should be private)

    Provide high confidence information only. If any field cannot be determined with confidence, omit it from the JSON.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    try {
      const parsedResult = JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
      return {
        results: {
          make: parsedResult.make || "Unknown",
          model: parsedResult.model || "Unknown",
          year: parsedResult.year,
          color: parsedResult.color || "Unknown",
          type: parsedResult.type || "Unknown",
          licensePlate: parsedResult.licensePlate
        }
      };
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error("Failed to parse car analysis results");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to analyze car image");
  }
}
