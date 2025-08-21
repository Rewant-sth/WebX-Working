"use client";

import { MapPinned, X, Download } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ITravelPackage } from "@/types/IPackages";
import Image from "next/image";

const RouteMap = ({ data }: { data: ITravelPackage | undefined }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const routeMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (routeMapRef.current) {
        const heroHeight = window.innerHeight * 0.8;
        const scrollPosition = window.scrollY + window.innerHeight;
        setIsVisible(scrollPosition > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleDownload = () => {
    if (!data?.routeMap) return;
    
    const link = document.createElement('a');
    link.href = data.routeMap;
    link.download = `route-map-${data.name?.toLowerCase().replace(/\s+/g, '-') || 'download'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data?.routeMap) return null;

  return (
    <div ref={routeMapRef} className="sticky top-36 self-start">
      {/* Sticky Map Button - Positioned below hero */}
      <div className="fixed right-4 z-40 transition-opacity duration-300"
        style={{
          top: 'calc(100vh - 200px)', // Adjust this value to position it below the hero
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
      >
        <div 
        
          onClick={openModal}
          className="w-24 h-24 bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-none transition-all border border-gray-200 relative"
        >

          <Image
            src={data.routeMap}
            alt="Route Map Thumbnail"
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-6xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPinned className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-800">Route Map</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="p-2 text-gray-500 hover:text-orange-500 hover:bg-gray-100 rounded-full transition-colors"
                  title="Download Route Map"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={closeModal}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="relative w-full h-[70vh] bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={data.routeMap}
                  alt="Route Map"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteMap;
