import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

const MajorHighlight = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="major-highlights"
      className=" mt-10 border-gray-200 mb-12 "
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Content */}
        <div className="flex-1">
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-orange-500 text-left">
            <span>Major Highlights</span>
          </h2>

          <p className="text-gray-600 mt-1 leading-relaxed mb-10 text-center sm:text-left">
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


      </div>
    </div>
  );
};

export default MajorHighlight;