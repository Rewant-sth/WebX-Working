"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { ITravelPackage, ITravelPackageResponse } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";
import useEmblaCarousel from 'embla-carousel-react';
import Link from "next/link";

function BestSeller() {
    const [bestSellingPackage, setBestSellingPackage] = useState<ITravelPackage[]>([]);
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
    const fetchbestSellingPackage = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://rhapi.webxnepal.com/api/v1/get-best-seller', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Failed to fetch best-selling packages');
            }
            const data: ITravelPackageResponse = await response.json();
            setBestSellingPackage(data.data || []);
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
        fetchbestSellingPackage();
    }, []);

    if (loading) {
        return (
            <section className="h-full space-y-3 py-12 md:py-24  mx-auto snap-start relative">
                <h2 className="text-2xl md:text-4xl text-center font-semibold uppercase">
                    Our <span className="bg-orange-500  px-2 text-white">Best </span> Selling Packages
                    {/* The  <span className="bg-orange-500  px-2 text-white">Ultimate</span> Himalayan Challenge */}
                </h2>
                <p className="text-lg max-w-xl text-center mx-auto">
                    Loading best-selling packages...
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
            <section className="h-full space-y-3 py-12 md:py-24 max-w-7xl mx-auto snap-start relative">
                <h2 className="text-2xl md:text-4xl text-center font-semibold uppercase">
                    Our <span className="bg-orange-500  px-2 text-white">Best </span> Selling Packages
                    {/* The  <span className="bg-orange-500  px-2 text-white">Ultimate</span> Himalayan Challenge */}
                </h2>
                <p className="text-lg max-w-xl text-center mx-auto text-red-600">
                    Error: {error}
                </p>
            </section>
        );
    }

    return (
        <section
            className="  space-y-3 py-16 md:pt-12 lg:pt-20 p-4 sm:p-6 mx-auto  relative"
        >
            <div className="md:flex justify-between  items-center mb-6">
                <div className="text-center flex-1">
                    <h2 className="text-2xl md:text-4xl text-center font-semibold uppercase">
                        Our <span className="bg-orange-500  px-2 text-white">Best Selling</span> Packages
                        {/* The  <span className="bg-orange-500  px-2 text-white">Ultimate</span> Himalayan Challenge */}
                    </h2>
                    <p className="text-lg max-w-4xl mx-auto mt-2">
                        Explore our most popular and highly rated travel packages, curated for unforgettable adventures.
                    </p>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-end mt-4 md:mt-0 gap-2 md:ml-4">
                    <button
                        onClick={scrollPrev}
                        className="p-2 rounded-sm border border-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="p-2 rounded-sm border border-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Embla carousel */}
            <div className="embla" ref={emblaRef}>
                <div className="embla__container flex">
                    {bestSellingPackage.length > 0 ? (
                        bestSellingPackage.map((pkg, index) => (
                            <div
                                key={pkg._id}
                                className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4 pr-[0.5rem]"
                            // style={{ paddingRight: '0.5rem' }}
                            >
                                <Link key={pkg.slug || pkg._id} href={`/itinerary/${pkg.slug}`}>

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

export default BestSeller;
