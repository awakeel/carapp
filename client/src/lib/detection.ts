import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

let model: cocoSsd.ObjectDetection | null = null;

export async function loadModel() {
  if (!model) {
    model = await cocoSsd.load();
  }
  return model;
}

export async function detectVehicle(imageElement: HTMLImageElement) {
  const model = await loadModel();
  const predictions = await model.detect(imageElement);
  
  // Filter for vehicle-related predictions
  const vehiclePredictions = predictions.filter(pred => 
    ['car', 'truck', 'bus', 'motorcycle'].includes(pred.class.toLowerCase())
  );

  if (vehiclePredictions.length === 0) {
    throw new Error("No vehicle detected in the image");
  }

  // Get the most confident vehicle prediction
  const mainVehicle = vehiclePredictions.reduce((prev, current) => 
    prev.score > current.score ? prev : current
  );

  // Create a basic analysis result
  return {
    make: "Unknown", // Would need additional ML model for make/model
    model: "Unknown",
    year: undefined,
    color: "Unknown", // Would need color analysis
    licensePlate: undefined,
    type: mainVehicle.class,
    confidence: mainVehicle.score
  };
}
