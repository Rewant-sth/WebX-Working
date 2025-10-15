"use client";

import { ITravelPackage } from "@/types/IPackages";
import { useState } from "react";

const Cost = ({ data }: { data: ITravelPackage | undefined }) => {
  const [activeTab, setActiveTab] = useState<'inclusion' | 'exclusion'>('inclusion');

  return (
    <div className="">
      <div
        id="inclusion-&-exclusion"
        className=" "
      >
        {/* Tab Navigation */}
        <div className="mb-4  bg-white z-[99]">
          <div className="flex text-xl overflow-auto gap-2 border-b border-zinc-200">
            <button
              onClick={() => setActiveTab('inclusion')}
              className={`px-4 sm:px-6 py-2 font-semibold transition-all duration-200 border-b-2 ${activeTab === 'inclusion'
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
              className={`px-4 sm:px-6 py-2 font-semibold transition-all duration-200 border-b-2 ${activeTab === 'exclusion'
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
              <p className="text-zinc-800 mb-6 leading-relaxed max-w-2xl">
                Everything that's included in your trip package to ensure a seamless travel experience.
              </p>
              <div className="grid divide-y divide-zinc-200 gap-4">
                {data?.inclusion.map((item, index) => (
                  <div
                    key={index}
                    className="flex pb-4  items-start gap-4 rounded-sm  transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-4 ">
                        {/* <div className="shrink-0 size-7 mt-1 rounded-md" >
                          <img src="/icons/check.png" alt="check" className="" />
                        </div> */}
                        <h3 className="text-xl capitalize font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                          {item.title}
                        </h3>
                      </div>
                      <p className=" leading-relaxed text-zinc-800" id="editor" dangerouslySetInnerHTML={{ __html: item.description.replace("<br>", "") }}></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'exclusion' && (
            <div>
              <p className="text-zinc-800 mb-6 leading-relaxed max-w-2xl">
                Items and services not included in the package that you'll need to arrange separately.
              </p>
              <div className="grid divide-y divide-zinc-200  gap-4">
                {data?.exclusion.map((item, index) => (
                  <div
                    key={index}
                    className="flex pb-4  items-start gap-4  transition-all duration-200"
                  >

                    <div className="flex-1 min-w-0">
                      <div className="flex gap-4 ">

                        <h3 className="text-xl capitalize font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt- leading-relaxed text-zinc-800" id="editor" dangerouslySetInnerHTML={{ __html: item.description.replace("<br>", "") }}></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Requirements */}
        {/* <h2 className="text-2xl font-semibold text-zinc-800 mt-12 text-center sm:text-left">
          <span className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            <span>Requirements</span>
          </span>
        </h2>
        <p className="text-zinc-500 mt-3 leading-relaxed max-w-2xl mb-6">
          Essential items and documents you'll need to bring for your trip.
        </p>
        <div className="space-y-4">
          {data?.requirements?.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-sm hover:border-zinc-300 transition-all duration-200"
              style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}
            >
              <div className="shrink-0 mt-1 p-2 rounded-md" style={{ backgroundColor: '#eff6ff', border: '1px solid #3b82f6' }}>
                <ListChecks size={20} style={{ color: '#3b82f6' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">{item.description}</p>
              </div>
            </div>
          )) || (
              <div className="text-zinc-500 italic">No specific requirements listed.</div>
            )}
        </div> */}
      </div>
    </div>
  );
};

export default Cost;
