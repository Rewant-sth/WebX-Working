"use client";
import { ITravelPackage } from "@/types/IPackages";
import Image from "next/image";
import { useRef } from "react";

const RouteMap = ({ data, onShow }: { data: ITravelPackage | undefined, onShow: () => void }) => {
  const routeMapRef = useRef<HTMLDivElement>(null);
  if (!data?.routeMap) return null;

  return (
    <div ref={routeMapRef} className="">
      <h2 className="mb-6 text-2xl font-semibold">Route Map</h2>
      <div className=" transition-opacity duration-300 mb-10"
      >
        <div

          onClick={onShow}
          className="w-full h-[500px] overflow-auto  bg-white  rounded-sm  cursor-pointer hover:shadow-none transition-all border border-orange-100  relative"
        >
          <Image
            src={data.routeMap}
            alt="Route Map Thumbnail"
            height={1200}
            width={1200}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
