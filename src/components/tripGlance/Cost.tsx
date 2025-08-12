"use client";

import { ITravelPackage } from "@/types/IPackages";
import { CheckCircle, XCircle } from "lucide-react";

const Cost = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="inclusion-&-exclusion"
      className="border-b border-gray-200 mb-8 pb-10"
    >
      {/* Cost Includes */}
      <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center sm:text-left" style={{ color: '#3A3A3A' }}>
        Cost Includes
      </h2>
      <div className="space-y-4 mb-12">
        {data?.inclusion.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 rounded-sm  hover:border-gray-300 transition-all duration-200"
            style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}
          >
            <div className="shrink-0 mt-1 p-2 rounded-md" style={{ backgroundColor: '#f0fdf4', border: '1px solid #22c55e' }}>
              <CheckCircle size={20} style={{ color: '#22c55e' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cost Excludes */}
      <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center sm:text-left" style={{ color: '#3A3A3A' }}>
        Cost Excludes
      </h2>
      <div className="space-y-4">
        {data?.exclusion.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 rounded-sm  hover:border-gray-300 transition-all duration-200"
            style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}
          >
            <div className="shrink-0 mt-1 p-2 rounded-md" style={{ backgroundColor: '#fef2f2', border: '1px solid #ef4444' }}>
              <XCircle size={20} style={{ color: '#ef4444' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cost;
