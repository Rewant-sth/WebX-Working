"use client";
import { ITravelPackage } from "@/types/IPackages";
import Image from "next/image";
import { useRef } from "react";

const RouteMap = ({ data, onShow }: { data: ITravelPackage | undefined, onShow: () => void }) => {
  const routeMapRef = useRef<HTMLDivElement>(null);
  if (!data?.routeMap) return null;

  return (
    <div ref={routeMapRef} className="">
      <div className=" transition-opacity duration-300 mb-10"
      >
        <div

          onClick={onShow}
          className="w-full aspect-video  bg-white  rounded-sm overflow-hidden cursor-pointer hover:shadow-none transition-all border border-orange-100  relative"
        >
          <Image
            src={data.routeMap}
            alt="Route Map Thumbnail"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
