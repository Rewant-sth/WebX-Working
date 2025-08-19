"use client";

import React from "react";

const ExpeditionCardsSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="relative">
        <div className="relative w-full h-[60vh] bg-slate-200 animate-pulse">
          <div className="absolute inset-0 bg-slate-900/60">
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="w-24 h-6 bg-white/20 rounded mx-auto"></div>
                <div className="w-80 h-12 bg-white/20 rounded mx-auto"></div>
                <div className="w-60 h-5 bg-white/20 rounded mx-auto"></div>
                <div className="w-16 h-0.5 bg-white/20 mx-auto mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Skeleton */}
      <div className="relative -mt-8 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-white border border-slate-200 rounded-lg p-6 animate-pulse">
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-9 bg-slate-200 rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12 animate-pulse">
          <div className="w-60 h-8 bg-slate-200 rounded mx-auto mb-4"></div>
          <div className="w-80 h-5 bg-slate-200 rounded mx-auto"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards.map((_, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden animate-pulse"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56 bg-slate-200">
                <div className="absolute top-4 left-4 w-16 h-6 bg-white rounded-md"></div>
                <div className="absolute bottom-4 right-4 w-12 h-6 bg-white rounded-md"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <div className="w-20 h-5 bg-slate-200 rounded-md"></div>
                </div>

                <div className="w-40 h-6 bg-slate-200 mb-3 rounded"></div>

                <div className="space-y-2 mb-6">
                  <div className="w-full h-4 bg-slate-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <div className="flex-1 h-10 bg-slate-200 rounded-md"></div>
                  <div className="flex-1 h-10 bg-slate-200 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpeditionCardsSkeleton;
