"use client";

import { ITravelPackage } from "@/types/IPackages";
import { CheckCircle, XCircle, ClipboardList, ListChecks } from "lucide-react";
import { useState } from "react";

const Cost = ({ data }: { data: ITravelPackage | undefined }) => {
  const [activeTab, setActiveTab] = useState<'inclusion' | 'exclusion'>('inclusion');

  return (
    <div className="md:py-10">
      <div
        id="inclusion-&-exclusion"
        className="md:border-b border-gray-200 mb-8 md:pb-10 "
      >
        {/* Tab Navigation */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('inclusion')}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${activeTab === 'inclusion'
                ? 'border-green-600 text-green-600 bg-green-50'
                : 'border-transparent text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
            >
              <span className="flex items-center gap-2">
                <span>What's Included ?</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('exclusion')}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${activeTab === 'exclusion'
                ? 'border-[#0F40B0] text-[#0F40B0] bg-[#0F40B0]/20'
                : 'border-transparent text-gray-600 hover:bg-[#0F40B0]/20 hover:text-[#0F40B0] '
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
              <p className="text-zinc-600 mb-6 leading-relaxed max-w-2xl">
                Everything that's included in your trip package to ensure a seamless travel experience.
              </p>
              <div className="grid lg:grid-cols-2 gap-4">
                {data?.inclusion.map((item, index) => (
                  <div
                    key={index}
                    className="flex border border-gray-200 p-6 items-start gap-4 rounded-sm hover:border-gray-300 transition-all duration-200"
                  >
                    <div className="shrink-0 size-7 mt-1 rounded-md" >
                      <img src="/icons/check-green.png" alt="check" className="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                        {item.title}
                      </h3>
                      <p className=" leading-relaxed text-gray-600" id="editor" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'exclusion' && (
            <div>
              <p className="text-zinc-600 mb-6 leading-relaxed max-w-2xl">
                Items and services not included in the package that you'll need to arrange separately.
              </p>
              <div className="grid lg:grid-cols-2 gap-4">
                {data?.exclusion.map((item, index) => (
                  <div
                    key={index}
                    className="flex border border-gray-200 items-start gap-4 p-6 rounded-sm hover:border-gray-300 transition-all duration-200"
                  >
                    <div className="shrink-0 size-7 mt-1 rounded-md" >
                      <img src="/icons/delete.png" alt="exclusion" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                        {item.title}
                      </h3>
                      <p className=" leading-relaxed text-gray-600" id="editor" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Requirements */}
        {/* <h2 className="text-2xl font-semibold text-gray-800 mt-12 text-center sm:text-left">
          <span className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            <span>Requirements</span>
          </span>
        </h2>
        <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl mb-6">
          Essential items and documents you'll need to bring for your trip.
        </p>
        <div className="space-y-4">
          {data?.requirements?.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-sm hover:border-gray-300 transition-all duration-200"
              style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}
            >
              <div className="shrink-0 mt-1 p-2 rounded-md" style={{ backgroundColor: '#eff6ff', border: '1px solid #3b82f6' }}>
                <ListChecks size={20} style={{ color: '#3b82f6' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            </div>
          )) || (
              <div className="text-gray-500 italic">No specific requirements listed.</div>
            )}
        </div> */}
      </div>
    </div>
  );
};

export default Cost;
