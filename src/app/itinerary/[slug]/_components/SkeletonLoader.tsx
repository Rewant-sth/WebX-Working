import Image from 'next/image'
import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative bg-black h-[75dvh] overflow-hidden ">

        <Image src="/mountain.jpg" alt="Placeholder" layout="fill" objectFit="cover" className="object-center blur-xl" />

      </div>

      {/* Main Content Layout Skeleton */}
      <div className="w-full relative h-auto flex flex-col lg:flex-row justify-between gap-6 lg:gap-0 md:p-6 lg:px-10">

        {/* Left Sidebar Skeleton */}
        <div className="hidden lg:block w-full lg:w-[22%] xl:w-[17%] mr-4 shrink-0">
          <div className="sticky top-20 space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm " />
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded-sm " />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Scroll Tracker Skeleton */}
        <div className="lg:hidden sticky top-0 z-[99999]">
          <div className="h-12 bg-gray-200 rounded-sm" />
        </div>

        {/* Center Content Skeleton */}
        <div className="w-full lg:border-l border-gray-200 lg:w-[53%] xl:w-[60%] p-4 lg:px-8 relative min-w-0 space-y-8">

          {/* Trip Glance Skeleton */}
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded-sm" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-2">
                  <div className="h-6 bg-gray-200 rounded-sm" />
                  <div className="h-4 bg-gray-200 rounded-sm w-3/4" />
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Info Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-2">
                  <div className="h-6 bg-gray-200 rounded-sm" />
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded-sm" />
                    <div className="h-4 bg-gray-200 rounded-sm w-4/5" />
                    <div className="h-4 bg-gray-200 rounded-sm w-3/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Major Highlights Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/3" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                  <div className="h-5 bg-gray-200 rounded-sm flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Cover Image Skeleton */}
          <div className="h-[60dvh] w-full bg-gray-300 rounded-sm" />

          {/* Overview Section Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/4" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded-sm" />
              ))}
              <div className="h-4 bg-gray-200 rounded-sm w-3/4" />
            </div>
          </div>

          {/* Itinerary Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/3" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded-sm w-1/4" />
                    <div className="h-6 bg-gray-200 rounded-sm w-1/6" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded-sm" />
                    <div className="h-4 bg-gray-200 rounded-sm w-4/5" />
                    <div className="h-4 bg-gray-200 rounded-sm w-3/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Section Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded-sm w-1/2" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded-sm" />
                ))}
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded-sm w-1/2" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Route Map Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/4" />
            <div className="h-80 bg-gray-300 rounded-lg" />
          </div>

          {/* FAQ Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/5" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-6 bg-gray-200 rounded-sm w-3/4" />
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/3" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="space-y-1">
                      <div className="h-5 bg-gray-200 rounded-sm w-32" />
                      <div className="h-4 bg-gray-200 rounded-sm w-24" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded-sm" />
                    <div className="h-4 bg-gray-200 rounded-sm w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Trips Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-sm w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-300" />
                  <div className="p-4 space-y-2">
                    <div className="h-6 bg-gray-200 rounded-sm" />
                    <div className="h-4 bg-gray-200 rounded-sm w-3/4" />
                    <div className="h-4 bg-gray-200 rounded-sm w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="lg:w-[25%] xl:w-[25%] shrink-0">
          <div className="sticky top-20 space-y-6">
            {/* Booking Card Skeleton */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="h-8 bg-gray-200 rounded-sm" />
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded-sm" />
                <div className="h-6 bg-gray-200 rounded-sm" />
                <div className="h-6 bg-gray-200 rounded-sm" />
              </div>
              <div className="h-12 bg-gray-200 rounded-sm" />
              <div className="h-10 bg-gray-200 rounded-sm" />
            </div>

            {/* Package Details Skeleton */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="w-full aspect-video bg-gray-200 rounded-sm " />
              <div className="space-y-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="">
                    <div className="h-4 bg-gray-200 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
