"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { ITravelPackage } from "@/types/IPackages";
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from "framer-motion";

export default function TravellerReview({
  data,
}: {
  data: ITravelPackage | undefined;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(max-width: 768px)': { slidesToScroll: 1 },
      '(max-width: 1024px)': { slidesToScroll: 2 }
    }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);


  // Render stars component
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={30}
            className={`${star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
              }`}
          />
        ))}
      </div>
    );
  };

  // If no testimonials, show empty state
  if (!data?.testimonial || data.testimonial.length === 0) {
    return (
      <div className="border-b border-gray-200 mb-8 pb-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
            <span className="w-fit text-2xl font-semibold">
              Traveller Reviews
            </span>
          </h2>
          <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl">
            Hear what our travellers have to say. We're proud to maintain a 5-star
            rating across all platforms.
          </p>
        </div>
        <div className="text-center py-12 text-gray-500">
          <Quote className="mx-auto mb-4" size={48} />
          <p>No reviews available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="traveller-review"
      className="border-b border-gray-200 mb-8 pb-10"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
          <span className="w-fit text-2xl font-semibold">
            Traveller Reviews
          </span>
        </h2>
        <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl">
          Hear what our travellers have to say. We're proud to maintain a 5-star
          rating across all platforms.
        </p>
      </div>

      {/* Reviews Carousel */}
      <div className="relative">
        {/* Navigation Buttons */}
        {
          data.testimonial.length > 2 && (
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>

            </div>
          )
        }

        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {data.testimonial.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                className="flex-[0_0_100%] md:flex-[0_0_50%]  pl-4 first:pl-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-sm border border-gray-200 p-6 h-full hover:shadow-lg transition-shadow duration-300">

                  {/* Rating */}
                  <div className="mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                    "{testimonial.comment}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-3 mt-auto">
                    {(testimonial as any).image ? (
                      <img
                        src={(testimonial as any).image}
                        alt={testimonial.fullName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        {testimonial.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {testimonial.fullName}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
