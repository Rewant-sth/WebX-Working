"use client";

import { MapPinned, X } from "lucide-react";
import { useState } from "react";
import { ITravelPackage } from "@/types/IPackages";
import Image from "next/image";

const RouteMap = ({ data }: { data: ITravelPackage | undefined }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoverTextPosition, setHoverTextPosition] = useState({ x: 0, y: 0 });
  const [showHoverText, setShowHoverText] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setHoverTextPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      id="route-map"
      className="border-b border-gray-200 mb-8 pb-10"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
        <span className="flex items-center gap-2">
          <MapPinned className="w-5 h-5 text-orange-500" />
          <span>Route Map</span>
        </span>
      </h2>

      <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl mb-8">
        Explore the detailed route map to understand your journey path and key landmarks along the way.
      </p>

      {/* Image with hover-follow text */}
      <div
        className="relative overflow-hidden rounded-sm border border-gray-200 group"
        style={{ borderColor: '#e5e7eb' }}
      // onMouseMove={handleMouseMove}
      // onMouseEnter={() => setShowHoverText(true)}
      // onMouseLeave={() => setShowHoverText(false)}
      >
        <Image
          onClick={openModal}
          className="w-full h-[60vh] object-cover cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          src={data?.routeMap || "/placeholder.png"}
          alt="Route Map"
          height={1000}
          width={1000}
        />
        {showHoverText && (
          <div
            className="absolute pointer-events-none px-4 py-2 text-sm font-medium bg-white rounded-sm border transition-all duration-200"
            style={{
              left: `${hoverTextPosition.x}px`,
              top: `${hoverTextPosition.y}px`,
              transform: "translate(-50%, -50%)",
              color: '#f05e25',
              borderColor: '#f05e25',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            Click to View Full Map
          </div>
        )}
      </div>

      {/* Professional Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] rounded-sm overflow-hidden border border-gray-300"
            style={{
              backgroundColor: '#fff',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={data?.routeMap || "/placeholder.png"}
              alt="Route Map"
              className="w-full h-auto object-contain"
              height={1000}
              width={1000}
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white rounded-full p-3 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
              style={{
                color: '#3A3A3A',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteMap;
