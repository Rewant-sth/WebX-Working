import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

const MajorHighlight = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="major-highlights"
      className="border-b mt-12 border-gray-200 mb-12 pb-12"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Content */}
        <div className="flex-1">
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-left flex items-center gap-2">
         
            <Icon icon="lineicons:bulb-4" className="w-6 h-6" />
            <span>Major Highlights</span>
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed mb-10 text-center sm:text-left">
            Discover the key attractions and memorable experiences that make this
            journey extraordinary.
          </p>

          {/* Highlights Grid */}
          <div className="space-y-6">
            {data?.attraction.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-xl border border-gray-200 bg-white 
                           hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 
                           transition-all duration-300"
              >
                {/* Icon */}
                <div className="shrink-0 mt-1 flex items-start justify-center text-orange-500">
                  <Icon icon="lineicons:bulb-4" className="size-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 hidden lg:block">
          <div className="sticky top-24">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt="Travel destination highlight"
              className="w-full h-auto rounded-xl object-cover shadow-lg"
            />
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
              <h3 className="font-semibold text-orange-800 mb-2">Pro Tip</h3>
              <p className="text-sm text-orange-700">
                Visit these locations during sunrise or sunset for the most
                breathtaking views and optimal photography conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorHighlight;