"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { ITravelPackage, ITravelPackageResponse } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";
import useEmblaCarousel from 'embla-carousel-react';
import Link from "next/link";

function TrekPage() {
  const [expeditionPackages, setExpeditionPackages] = useState<ITravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
      '(min-width: 1024px)': { slidesToScroll: 1 },
      '(min-width: 1280px)': { slidesToScroll: 1 }
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Direct fetch API implementation
  const fetchExpeditionPackages = async () => {
    try {
      setLoading(true);
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!baseURL) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(`${baseURL}/package/category/trekking`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ITravelPackageResponse = await response.json();
      setExpeditionPackages(data.data || []);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch expedition packages';
      setError(errorMessage);
      console.error('Error fetching expedition packages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpeditionPackages();
  }, []);

  if (loading) {
    return (
      <section className="h-full space-y-3 py-12 md:mt-20 relative">
        <h2 className="text-xl max-w-7xl mx-auto leading-snug md:text-4xl text-center font-semibold uppercase">
          The <span className="bg-orange-500  px-2 text-white">Ultimate</span> Himalayan Trekking
        </h2>
        <p className="text-lg max-w-xl text-center mx-auto">
          Loading expedition packages...
        </p>
        <div className="mt-10 grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-sm overflow-hidden bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="h-full space-y-3 py-12 md:mt-28 max-w-7xl mx-auto  relative">
        <h2 className="text-xl max-w-7xl mx-auto leading-snug md:text-4xl text-center font-semibold uppercase">
          The <span className="bg-orange-500  px-2 text-white">Ultimate</span> Himalayan Trekking
        </h2>
        <p className="text-lg max-w-xl text-center mx-auto text-red-600">
          Error: {error}
        </p>
      </section>
    );
  }

  return (
    <section
      className=" h-full space-y-3 mt-10 md:mt-16 p-4 sm:p-6 mx-auto snap-start relative"
    >
      <div className="md:flex justify-between  items-center mb-6">
        <div className="text-center flex-1">
          <h2 className="text-xl max-w-7xl mx-auto leading-snug md:text-4xl text-center font-semibold uppercase">
            The <span className="bg-orange-500  px-2 text-white">Ultimate</span> Himalayan Trekking
          </h2>
          <p className="text-lg max-w-4xl mx-auto mt-2">
            Adventures designed to challenge your spirit and create memories that stay with you for a lifetime.
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-end mt-4 md:mt-0 gap-2 md:ml-4">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-full border border-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-full border border-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Embla carousel */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {expeditionPackages.length > 0 ? (
            expeditionPackages.map((pkg, index) => (
              <div
                key={pkg._id || index}
                className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                style={{ paddingRight: '0.5rem' }}
              >
                <Link key={pkg._id || index} href={`/itinerary/${pkg.slug}`}>

                  <div className="relative group cursor-pointer rounded-sm overflow-hidden h-[60dvh]">
                    <div className="absolute inset-0 group-hover:translate-y-0 transition-all translate-y-full bg-[#01283F]/40 z-40"></div>
                    <Image
                      src={pkg.coverImage || "/placeholder.webp"}
                      alt={pkg.name}
                      fill
                      className="object-cover group-hover:blur-xs transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-between">
                      <div className="flex justify-end items-center">
                        <span className="flex size-10 transition-all duration-300 text-white group-hover:rotate-45 justify-center items-center rounded-full">
                          <ArrowUpRight />
                        </span>
                      </div>
                      <div className="text-white relative z-50">
                        <h2 className="text-2xl font-semibold">{pkg.name}</h2>
                        <div className="mt-2 flex gap-4 text-sm opacity-90">
                          <span className="flex gap-2 items-center">
                            <Icon icon={"material-symbols-light:distance-rounded"} className="text-lg" />
                            {pkg.distance} KM
                          </span>
                          <span className="flex gap-2 items-center">
                            <Icon icon={"famicons:timer"} className="text-lg" />
                            {pkg.duration} Days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </Link>
              </div>
            ))
          ) : (
            <div className="embla__slide flex-none w-full" style={{ paddingRight: '0.5rem' }}>
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No expedition packages available at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TrekPage;
