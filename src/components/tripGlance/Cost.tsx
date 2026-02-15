"use client";

import { ITravelPackage } from "@/types/IPackages";
import { useState } from "react";
import ReadMore from "@/components/ui/ReadMore";

const Cost = ({ data }: { data: ITravelPackage | undefined }) => {
  const [activeTab, setActiveTab] = useState<'inclusion' | 'exclusion'>('inclusion');

  return (
    <div className="pt-6">
      <div
        id="inclusion-&-exclusion"
        className=" "
      >
        {/* Tab Navigation */}
        <div className="mb-4  bg-white z-[99]">
          <div className="flex text-xl overflow-auto gap-2 border-b border-zinc-200">
            <button
              onClick={() => setActiveTab('inclusion')}
              className={`px-4 shrink-0 sm:px-6 py-2 font-semibold transition-all duration-200 border-b-2 ${activeTab === 'inclusion'
                ? 'border-orange-500 text-orange-500 bg-orange-50'
                : 'border-transparent text-zinc-500 hover:text-orange-500 hover:bg-orange-50'
                }`}
            >
              <span className="flex items-center gap-2">
                <span className="">What's Included ?</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('exclusion')}
              className={`px-4 shrink-0 sm:px-6 py-2 font-semibold transition-all duration-200 border-b-2 ${activeTab === 'exclusion'
                ? 'border-orange-500 text-orange-500 bg-orange-500/20'
                : 'border-transparent text-zinc-500 hover:bg-orange-500/20 hover:text-orange-500 '
                }`}
            >
              <span className="flex items-center gap-2">
                <span>What's Excludes ?</span>
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-10">
          {activeTab === 'inclusion' && (
            <div>
              {/* <p className="text-[17px] text-zinc-800 mb-6 leading-snug font-montserrat max-w-2xl">
                Everything that's included in your trip package to ensure a seamless travel experience.
              </p> */}
              <ReadMore maxHeight="max-h-96" characterLimit={500}>
                <div className="grid divide-y divide-zinc-200 gap-4">
                  {data?.inclusion.map((item, index) => (
                    <div
                      key={index}
                      className="flex pb-4  items-start gap-4 rounded-sm  transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex gap-4 ">
                          <h3 className="text-[17px] capitalize font-semibold mb-1 font-montserrat" style={{ color: '#3A3A3A' }}>
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[17px] leading-snug font-montserrat text-zinc-800" mb-6 id="editor" dangerouslySetInnerHTML={{ __html: item?.description?.replace("<br>", "") }}></p>
                      </div>
                    </div>
                  ))}
                </div>
              </ReadMore>
            </div>
          )}

          {activeTab === 'exclusion' && (
            <div>
              {/* <p className="text-[17px] text-zinc-800 mb-6 leading-snug font-montserrat max-w-2xl">
                Items and services not included in the package that you'll need to arrange separately.
              </p> */}
              <ReadMore maxHeight="max-h-96" characterLimit={500}>
                <div className="grid divide-y divide-zinc-200  gap-4">
                  {data?.exclusion.map((item, index) => (
                    <div
                      key={index}
                      className="flex pb-4  items-start gap-4  transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex gap-4 ">
                          <h3 className="text-[17px] capitalize font-semibold mb-1 font-montserrat" style={{ color: '#3A3A3A' }}>
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[17px] leading-snug font-montserrat text-zinc-800" id="editor" dangerouslySetInnerHTML={{ __html: item?.description?.replace("<br>", "") }}></p>
                      </div>
                    </div>
                  ))}
                </div>
              </ReadMore>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cost;
