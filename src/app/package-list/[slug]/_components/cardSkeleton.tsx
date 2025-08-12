"use client";

import React from "react";

const ExpeditionCardsSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section Skeleton */}
      <div className="relative">
        <div className="relative w-full h-[80vh] bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent">
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="w-32 h-8 bg-white/20 rounded-full mx-auto"></div>
                <div className="w-96 h-16 bg-white/20 rounded-sm mx-auto"></div>
                <div className="w-80 h-6 bg-white/20 rounded mx-auto"></div>
                <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Skeleton */}
      <div className="relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 animate-pulse">
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-24 h-12 bg-slate-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12 animate-pulse">
          <div className="w-80 h-10 bg-slate-200 rounded mx-auto mb-4"></div>
          <div className="w-96 h-6 bg-slate-200 rounded mx-auto"></div>
        </div>

        {/* Enhanced Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletonCards.map((_, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 animate-pulse"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64 bg-slate-200">
                <div className="absolute top-4 left-4 w-20 h-6 bg-white/90 rounded-full"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
                    <div className="w-12 h-4 bg-slate-200 rounded"></div>
                  </div>

                  <div className="w-48 h-6 bg-slate-200 mb-3 rounded"></div>

                  <div className="space-y-2 mb-4">
                    <div className="w-full h-4 bg-slate-200 rounded"></div>
                    <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                    <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
                  </div>

                  <div className="w-16 h-4 bg-slate-200 rounded"></div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <div className="flex-1 h-12 bg-slate-200 rounded-xl"></div>
                  <div className="flex-1 h-12 bg-slate-200 rounded-xl"></div>
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
