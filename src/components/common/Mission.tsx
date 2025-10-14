
import { Mountain, Globe, Users } from 'lucide-react';


const Mission = () => {


  return (
    <div>
      <div
        className={`py-24 bg-white`}
      >
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-6xl font-bold mb-12 text-zinc-800">Our Mission</h3>

          <div className="relative mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="h-1 w-full bg-zinc-200"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full">
                <Mountain className="w-6 h-6" />
              </div>
            </div>
          </div>

          <p className="text-3xl font-light italic text-zinc-700 mb-12 leading-relaxed">
            "To inspire a deeper human connection with mountains through transformative experiences that challenge,
            nurture, and awaken, while preserving the wild landscapes we traverse for generations to come."
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 mt-16">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-zinc-700">5 Continents</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mountain className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-zinc-700">50+ Mountain Ranges</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-zinc-700">10,000+ Trekkers Guided</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mission
