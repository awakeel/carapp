import { CarAnalyzer } from "@/components/car-analyzer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Car Recognition App</h1>
          <p className="text-muted-foreground mt-2">
            Upload or capture a photo of any car for instant AI analysis
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <CarAnalyzer />
      </main>
    </div>
  );
}
