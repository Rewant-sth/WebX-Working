"use client";
import { ITravelPackage } from "@/types/IPackages";
import Image from "next/image";
import { useRef } from "react";

const RouteMap = ({ data, onShow }: { data: ITravelPackage | undefined, onShow: () => void }) => {
  const routeMapRef = useRef<HTMLDivElement>(null);
  if (!data?.routeMap) return null;

  return (
    <div ref={routeMapRef} className="sticky top-36 self-start">
      <div className="fixed right-4 z-40 transition-opacity duration-300"
        style={{
          top: 'calc(100vh - 200px)', // Adjust this value to position it below the hero
        }}
      >
        <div

          onClick={onShow}
          className="w-24 h-24  bg-white  rounded-sm overflow-hidden cursor-pointer hover:shadow-none transition-all border border-orange-200 hover:border-orange-500 relative"
        >
          <Image
            src={data.routeMap}
            alt="Route Map Thumbnail"
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
