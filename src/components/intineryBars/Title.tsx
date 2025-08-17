"use client";

import { useState } from "react";
import { ITravelPackage } from "@/types/IPackages";

const Title = ({ data }: { data: ITravelPackage | null }) => {
  const [liked, setLiked] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(
    `Check out this amazing trip: ${data?.name}`
  );

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 text-white   z-[99]  sm:mt-[20px] relative">
      <div className=" pt-4 border-gray-300">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
          {/* Title + Duration */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center w-full  gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap">
              {data?.name}
            </h1>
          </div>

        </div>


      </div>
    </div>
  );
};

export default Title;
