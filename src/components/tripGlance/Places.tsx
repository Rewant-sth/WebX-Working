"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react"; // Importing Lucide icons

const Places = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const images = [
    { src: "/TrekImages/manaslu.png", alt: "Manaslu" },
    { src: "/TrekImages/manaslu.png", alt: "Manaslu" },
    { src: "/TrekImages/manaslu.png", alt: "Manaslu" },
    { src: "/TrekImages/manaslu.png", alt: "Manaslu" },
    { src: "/TrekImages/manaslu.png", alt: "Manaslu" },
    { src: "/TrekImages/manaslu.png", alt: "Manaslu" },
  ];

  const clonedImages = [...images.slice(-3), ...images, ...images.slice(0, 3)];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const offset = -currentIndex * (100 / 3);

  const openModal = (src: string) => {
    setSelectedImg(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImg("");
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-semibold my-6">Places you will see</h2>

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${offset}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {clonedImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-1/3 p-2">
              <img
                className="w-full h-[150px] object-cover rounded-md cursor-pointer"
                src={image.src}
                alt={image.alt}
                onClick={() => openModal(image.src)}
                height={10}
                width={10}
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows with blue-50 by default, blue-100 on hover */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-50 text-white p-3 rounded-full hover:bg-blue-100"
        >
          <ChevronLeft className="h-6 w-6 text-blue-800" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-50 text-white p-3 rounded-full hover:bg-blue-100"
        >
          <ChevronRight className="h-6 w-6 text-blue-800" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-[#025FE0] scale-105" : "bg-gray-300"
              }`}
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] rounded-sm overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg}
              alt="Preview"
              className="w-full h-auto object-contain"
              height={10}
              width={10}
            />
            <button
              onClick={closeModal}
              className="p-2 absolute bg-white rounded-full top-2 right-2 text-black shadow-md hover:bg-gray-200 transition cursor-pointer"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Places;
