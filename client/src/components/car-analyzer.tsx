import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "./image-upload";
import { CameraCapture } from "./camera-capture";
import { ResultsDisplay } from "./results-display";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function CarAnalyzer() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (imageBase64: string) => {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze image');
      }

      return await response.json();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze image. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleImage = (imageBase64: string) => {
    setActiveImage(imageBase64);
    analyzeMutation.mutate(imageBase64);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="camera">Use Camera</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardContent className="pt-6">
              <ImageUpload onImageCapture={handleImage} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camera">
          <Card>
            <CardContent className="pt-6">
              <CameraCapture onImageCapture={handleImage} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {activeImage && (
        <ResultsDisplay 
          imageUrl={`data:image/jpeg;base64,${activeImage}`}
          results={analyzeMutation.data?.results}
          isLoading={analyzeMutation.isPending}
        />
      )}
    </div>
  );
}