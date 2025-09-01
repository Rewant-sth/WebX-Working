import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

const MajorHighlight = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="major-highlights"
      className=" mt-10 border-gray-200 mb-12 pb-12"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Content */}
        <div className="flex-1">
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-left flex items-center gap-2">

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
                className="flex gap-4  border-gray-200 bg-white  
                           transition-all duration-300"
              >
                {/* Icon */}
                {/* <div className="shrink-0 mt-1  size-10 flex items-start justify-center text-orange-500">
                  <img src="/icons/idea-bulb.png" alt="" />
                </div> */}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <div id="editor" dangerouslySetInnerHTML={{ __html: item.description }} className=" leading-relaxed text-gray-600 text-justify">

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 hidden lg:block">
          <div className="sticky top-20">
            <img
              src="/EXPEDITION/DSC00695.jpg"
              alt="Travel destination highlight"
              className="w-full h-auto rounded-sm backdrop-brightness- object-cover shadow-sm"
            />
            <div className="mt-6 p-4 bg-[#01283F]/10 rounded-sm border border-[#01283F]/20">
              <h3 className="font-semibold text-[#01283F] mb-2">Pro Tip</h3>
              <p className="text-sm text-[#01283F">
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