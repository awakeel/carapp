
import { CarAnalyzer } from "@/components/car-analyzer";
import { Car } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Image Upload and Camera Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Car className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Analyze Your Car</h2>
            </div>
            <p className="text-gray-200">Upload a photo or take a picture to get instant AI analysis</p>
          </div>
          <div className="p-8">
            <CarAnalyzer />
          </div>
        </div>

        {/* App Features */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6">App Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Instant Analysis</h4>
                <p className="text-gray-600">Get detailed information about any car in seconds using advanced AI technology</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Multiple Input Methods</h4>
                <p className="text-gray-600">Upload an existing photo or take a new picture directly through your device camera</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
