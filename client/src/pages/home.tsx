
import { CarAnalyzer } from "@/components/car-analyzer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Image Upload Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Analyze Your Car</h2>
            <p className="text-gray-200">Upload a photo or take a picture to get instant AI analysis</p>
          </div>
          <div className="p-8">
            <CarAnalyzer />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">App Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Instant Analysis</h3>
              <p className="text-slate-600">Get detailed information about any car in seconds using advanced AI technology</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Multiple Input Methods</h3>
              <p className="text-slate-600">Upload existing photos or use your camera to capture cars in real-time</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Detailed Results</h3>
              <p className="text-slate-600">View comprehensive details including make, model, year, and distinctive features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
