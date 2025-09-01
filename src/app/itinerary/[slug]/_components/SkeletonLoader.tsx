// components/skeletons/SkeletonPackageDetails.tsx
"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonPackageDetails = () => {
  return (
    <div>
      {/* Hero Section Skeleton */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Hero Background Skeleton */}
        <div className="absolute inset-0">
          <Skeleton height="100vh" className="!rounded-none" />
        </div>

        {/* Hero Title Overlay Skeleton */}
        <div className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 text-white pt-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center w-full gap-2 sm:gap-3">
              <Skeleton height={48} width={400} baseColor="#ffffff20" highlightColor="#ffffff30" />
            </div>
          </div>
        </div>

        {/* Gallery Carousel Navigation Skeleton */}
        <div className="absolute top-1/2 w-full -translate-y-1/2 left-1/2 -translate-x-1/2 z-[999]">
          <div className="flex w-full justify-between items-center gap-4 px-6 py-3">
            <Skeleton circle height={48} width={48} baseColor="#ffffff20" highlightColor="#ffffff30" />
            <Skeleton circle height={48} width={48} baseColor="#ffffff20" highlightColor="#ffffff30" />
          </div>
        </div>

        {/* Man Image Skeleton */}
        <div className="absolute bottom-0 z-[99]">
          <Skeleton height={400} width={600} className="translate-y-16" baseColor="#ffffff20" highlightColor="#ffffff30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full relative h-auto flex flex-col xl:flex-row gap-8 pb-10 mt-8">
        <div className="mx-auto relative rounded-xl">

          {/* Trip Glance Section Skeleton */}
          <div className="border-b  border-gray-200 py-10">
            <div className="max-w-7xl mx-auto">
              <Skeleton height={36} width={300} className="mb-12" />

              {/* Trip Glance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div key={idx} className="p-4 flex gap-6 rounded-sm border border-gray-200">
                    <div className="size-24 shrink-0">
                      <Skeleton height={96} width={96} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <Skeleton height={24} width="80%" />
                      <Skeleton height={20} width="60%" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Major Highlights Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={250} className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <Skeleton circle height={24} width={24} />
                  <Skeleton height={20} width="90%" />
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section Skeleton */}
          <div className="relative min-h-[70dvh] py-16 mb-14 bg-gray-200">
            <div className="relative max-w-7xl mx-auto mb-8 pb-10">
              <Skeleton height={48} width={300} className="mb-8" />
              <div className="space-y-3">
                <Skeleton count={8} height={24} />
              </div>
            </div>
          </div>

          {/* Route Map Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={200} className="mb-6" />
            <div className="aspect-video">
              <Skeleton height="100%" className="!rounded-xl" />
            </div>
            <div className="mt-4 flex justify-center">
              <Skeleton height={40} width={150} className="!rounded-full" />
            </div>
          </div>

          {/* Itinerary Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={180} className="mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <Skeleton circle height={32} width={32} />
                    <Skeleton height={24} width={200} />
                  </div>
                  <Skeleton count={3} height={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Cost Section Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={220} className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Skeleton height={28} width={150} className="mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Skeleton circle height={16} width={16} />
                      <Skeleton height={16} width="80%" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton height={28} width={150} className="mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Skeleton circle height={16} width={16} />
                      <Skeleton height={16} width="80%" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Requirements Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={180} className="mb-6" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Skeleton circle height={20} width={20} />
                  <Skeleton height={20} width="90%" />
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={150} className="mb-6" />
            <Skeleton count={4} height={20} />
          </div>

          {/* Divider Images Skeleton */}
          <div className="w-full py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} height={200} className="!rounded-lg" />
              ))}
            </div>
          </div>

          {/* Gear Section Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={200} className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="space-y-3">
                  <Skeleton height={24} width="80%" />
                  <Skeleton count={2} height={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Why Love This Trek Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={280} className="mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Skeleton circle height={20} width={20} />
                  <Skeleton height={20} width="95%" />
                </div>
              ))}
            </div>
          </div>

          {/* Important Notice Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={220} className="mb-6" />
            <Skeleton count={6} height={20} />
          </div>

          {/* Dates and Prices Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={240} className="mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Skeleton height={20} width={150} />
                      <Skeleton height={16} width={100} className="mt-2" />
                    </div>
                    <div className="text-right">
                      <Skeleton height={24} width={100} />
                      <Skeleton height={40} width={120} className="mt-2 !rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={280} className="mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <Skeleton height={20} width="80%" />
                    <Skeleton circle height={24} width={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Skeleton */}
          <div className=" py-10 border-b border-gray-200">
            <Skeleton height={36} width={220} className="mb-6" />
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton circle height={48} width={48} />
                    <div className="flex-1">
                      <Skeleton height={20} width={150} />
                      <div className="flex gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Skeleton key={starIdx} circle height={16} width={16} />
                        ))}
                      </div>
                      <Skeleton count={3} height={16} className="mt-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Trips Skeleton */}
          <div className=" py-10">
            <Skeleton height={36} width={200} className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <Skeleton height={200} className="!rounded-none" />
                  <div className="p-4">
                    <Skeleton height={24} width="90%" />
                    <Skeleton height={16} width="70%" className="mt-2" />
                    <div className="flex justify-between items-center mt-4">
                      <Skeleton height={20} width={80} />
                      <Skeleton height={24} width={100} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SkeletonPackageDetails;
