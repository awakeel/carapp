
import { CarAnalyzer } from "@/components/car-analyzer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="relative">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-center mb-2">Car Recognition App</h1>
            <p className="text-muted-foreground text-center mb-8">
              Upload or capture a photo of any car for instant AI analysis
            </p>
            <CarAnalyzer />
          </div>
        </main>
      </div>
    </div>
  );
}
