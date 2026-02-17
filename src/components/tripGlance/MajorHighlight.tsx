"use client";

import { ITravelPackage } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";

const MajorHighlight = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="major-attractions"
      className="pt-6 pb-14 "
    >
      <style jsx>{`
        #major-attractions #editor p,
        #major-attractions #editor span,
        #major-attractions #editor div,
        #major-attractions #editor li,
        #major-attractions #editor h1,
        #major-attractions #editor h2,
        #major-attractions #editor h3,
        #major-attractions #editor h4,
        #major-attractions #editor ul,
        #major-attractions #editor ol {
          font-size: 16px !important;
        }
      `}</style>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Content */}
        <div className="flex-1">
          {/* Section Title */}
          <h2 className="text-2xl mb-4 font-semibold text-orange-500 text-left">
            <span>Major Attractions</span>
          </h2>

          {/* Highlights Grid with ReadMore */}
          <ReadMore maxHeight="max-h-96" characterLimit={500}>
            <div className="space-y-6">
              {data?.attraction.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-zinc-200 bg-white transition-all duration-300"
                >
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base  text-zinc-900 mb-1">
                      {item.title}
                    </h3>
                    <div 
                      id="editor" 
                      dangerouslySetInnerHTML={{ __html: item.description }} 
                      className="leading-relaxed text-base text-zinc-800"
                    >
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ReadMore>
        </div>
      </div>
    </div>
  );
};

export default MajorHighlight;
