"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IGallery } from "@/types/IGallery";

export default function Gallery({ slides }: { slides: IGallery[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(4);

  // Show 5 images initially on all screen sizes
  useEffect(() => {
    setDisplayCount(4);
  }, []);

  const displayedImages = slides?.slice(0, displayCount);
  const remainingCount = slides?.length - displayCount;

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, goToPrevious, goToNext]);

  if (!slides?.length) return null;

  return (
    <section className="pb-4">
      {/* Minimal Bento Grid Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[160px] lg:auto-rows-[180px]">
        {displayedImages?.map((image, index) => {
          // Minimal geometric patterns
          let gridClass = "";

          // Clean, minimal patterns based on index
          switch (index) {
            case 0:
              gridClass = "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2"; // Wide hero, then square on desktop
              break;
            case 1:
              gridClass = "col-span-1 row-span-1"; // Square
              break;
            case 2:
              gridClass = "col-span-1 row-span-1"; // Square
              break;
            case 3:
              gridClass = "col-span-2 row-span-1 lg:col-span-2 lg:row-span-1"; // Wide rectangle
              break;
            case 4:
              gridClass = "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1"; // Square
              break;
            default:
              gridClass = "col-span-1 row-span-1"; // Default squares
          }

          return (
            <div
              key={image._id}
              className={`relative rounded-md overflow-hidden cursor-pointer group transition-transform duration-300  ${gridClass}`}
              onClick={() => openModal(slides.findIndex(img => img._id === image._id))}
            >
              <Image
                alt={image.caption || "RealHimalaya trip attractions"}
                src={image.imageUrl}
                height={1000}
                width={1000}
                className="h-full w-full object-cover transition-all duration-300  group-hover:scale-105"
              />

              {/* Minimal overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Show remaining count on last visible image */}
              {index === displayCount - 1 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-xl lg:text-2xl font-semibold">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>



      {/* Image Modal with Carousel */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image */}
            <div className="relative">
              <Image
                src={slides[currentImageIndex]?.imageUrl}
                alt={slides[currentImageIndex]?.caption || "Gallery image"}
                height={1000}
                width={1000}
                className="w-full h-auto max-h-[70vh] object-contain rounded-sm"
              />

              {/* Navigation Arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-sm text-sm">
              {currentImageIndex + 1} / {slides.length}
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Caption */}
            {slides[currentImageIndex]?.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-3 rounded-sm">
                <p className="text-sm lg:text-base">
                  {slides[currentImageIndex].caption}
                </p>
              </div>
            )}

            {/* Pagination Dots */}
            {slides.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`transition-all duration-200 rounded-sm ${index === currentImageIndex
                      ? 'bg-white w-5 h-5'
                      : 'bg-white/50 hover:bg-white/70 w-5 h-5'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
