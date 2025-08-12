// components/skeletons/SkeletonPackageDetails.tsx
"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonPackageDetails = () => {
  return (
    <div className="py-24">
      <div className="px-16 space-y-2 border-b border-black/30 pb-4">
        <Skeleton height={40} width={800} />
        <Skeleton height={30} width={500} className="mt-2" />
      </div>
      <div className="w-full  flex flex-col lg:flex-row justify-between px-4 sm:px-6 lg:px-16 mt-8 gap-4 animate-pulse">
        {/* LeftBar Skeleton */}

        <div className="hidden lg:block w-full max-w-[250px]">
          <Skeleton height={40} count={6} className="mb-3" />
        </div>

        {/* Center Content Skeleton */}
        <div className="w-full lg:w-3/4 shadow-sm rounded-xl mx-auto lg:mx-5 px-2 sm:px-4 py-4">
          <Skeleton height={300} className="rounded-xl mb-6" />

          <Skeleton height={35} width={180} className="mb-3" />
          <Skeleton count={5} className="mb-2" />

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Skeleton height={150} className="rounded-xl" />
            <Skeleton height={150} className="rounded-xl" />
          </div>

          <div className="mt-8">
            <Skeleton height={35} width={220} className="mb-3" />
            <Skeleton count={4} className="mb-2" />
          </div>

          <div className="mt-6">
            <Skeleton height={35} width={180} className="mb-3" />
            <Skeleton count={3} />
          </div>
        </div>

        {/* RightBar Skeleton */}
        <div className="hidden lg:block w-full max-w-[250px]">
          <Skeleton height={250} className="rounded-xl" />
          <Skeleton height={120} className="rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPackageDetails;
