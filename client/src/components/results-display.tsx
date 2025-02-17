import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Car, Palette, Calendar, Tag, FileType } from "lucide-react";

interface ResultsDisplayProps {
  imageUrl: string;
  results?: {
    make: string;
    model: string;
    year?: string;
    color: string;
    licensePlate?: string;
    type: string;
  };
  isLoading: boolean;
}

export function ResultsDisplay({ imageUrl, results, isLoading }: ResultsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt="Analyzed car"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          ) : results ? (
            <>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <span className="font-semibold">
                  {results.make} {results.model}
                </span>
              </div>
              
              {results.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Year: {results.year}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <span>Color: {results.color}</span>
              </div>
              
              {results.licensePlate && (
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <span>License: {results.licensePlate}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <FileType className="h-5 w-5 text-primary" />
                <span>Type: {results.type}</span>
              </div>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
