import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

const MajorHighlight = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="major-highlights"
      className="pb-14 "
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Content */}
        <div className="flex-1">
          {/* Section Title */}
          <h2 className="text-2xl mb-4 font-bold text-orange-500 text-left">
            <span>Major Highlights</span>
          </h2>



          {/* Highlights Grid */}
          <div className="space-y-6">
            {data?.attraction.map((item, index) => (
              <div
                key={index}
                className="flex gap-4  border-zinc-200 bg-white  
                           transition-all duration-300"
              >
                {/* Icon */}
                {/* <div className="shrink-0 mt-1  size-10 flex items-start justify-center text-orange-500">
                  <img src="/icons/idea-bulb.png" alt="Real Himalaya" />
                </div> */}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {item.title}
                  </h3>
                  <div id="editor" dangerouslySetInnerHTML={{ __html: item.description }} className=" leading-relaxed text-zinc-600 md:text-justify">

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