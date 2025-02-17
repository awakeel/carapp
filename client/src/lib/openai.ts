import { apiRequest } from "./queryClient";

export async function analyzeCarImage(imageBase64: string) {
  const response = await apiRequest("POST", "/api/analyze", { imageBase64 });
  return response.json();
}
