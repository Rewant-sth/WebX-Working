"use client"
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import React, { useCallback, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types/ITestimonial';
import { useTestimonials } from '@/hooks/useTestimonials';


export default function EmblaCarousel({ className = '' }: { className?: string }) {
    // Fetch testimonials using custom hook
    const { data: testimonialsData, isLoading, error } = useTestimonials();

    // Filter active testimonials and sort by sortOrder
    const activeTestimonials = testimonialsData?.data
        ?.filter((testimonial: Testimonial) => testimonial.isActive)
        ?.sort((a: Testimonial, b: Testimonial) => a.sortOrder - b.sortOrder) || [];

    console.log('Active testimonials:', activeTestimonials);
    console.log('Testimonials data:', testimonialsData);

    // Fallback reviews for loading or error states
    const fallbackReviews: Partial<Testimonial>[] = [
        {
            fullName: "Anisha Thapa",
            rating: 5,
            comment: "The Real Himalaya team made my Everest Base Camp trek unforgettable. Every detail was planned perfectly, and I felt safe the entire time.",
            image: "/1.jpeg"
        },
        {
            fullName: "Bikash Shrestha",
            rating: 5,
            comment: "Spectacular routes, friendly guides, and breathtaking landscapes! I captured some of my best shots during this journey and enjoyed every moment.",
            image: "/2.jpeg"
        },
        {
            fullName: "Maya Gurung",
            rating: 5,
            comment: "The cultural immersion on this trip was beyond my expectations. From traditional dances to local cuisine, every experience felt truly authentic and memorable.",
            image: "/3.jpeg"
        }
    ];

    // Use API data if available, otherwise fallback
    const reviews = activeTestimonials.length > 0 ? activeTestimonials : fallbackReviews;
    // Embla hook
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi, onSelect]);


    return (
        <div id='testimonial' className={`relative w-full flex flex-col py-12 md:py-24 justify-center items-center   ${className}`}>

            <h2 className='text-2xl md:text-4xl text-center font-semibold max-w-4xl  mx-4 md:leading-12 uppercase'>
                Global <span className=''> Trust</span> - Thousands of Reviews
            </h2>
            <p className='pb-10  max-w-4xl text-lg text-center mx-auto'>With thousands of genuine reviews across multiple platforms, we’ve earned the trust of  adventurers and climbers worldwide who share their real experiences and journeys with us.</p>

            <div className="mb-4 flex gap-4 items-center flex-wrap">
                <img src="/logo/wordmark.svg" alt="trip advisor logo" className='h-8' />
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center min-h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="text-center py-8">
                    <p className="text-red-500 mb-4">Failed to load testimonials</p>
                    <p className="text-gray-600">Showing sample reviews instead</p>
                </div>
            )}

            {/* Embla viewport */}
            <div className="overflow-hidden  py-2 relative md:px-4 mx-auto w-full" ref={emblaRef}>

                {/* Embla container */}
                <div className="flex ">
                    {reviews.map((slide: Testimonial | Partial<Testimonial>, idx: number) => (
                        <div
                            key={slide._id || idx}
                            className="embla__slide flex-none px-3 w-full md:w-1/2 lg:w-1/3"
                        >
                            <div className="min-h-96  border border-green-500 bg-green-50 py-10  relative rounded-sm overflow-hidden    flex flex-col items-center justify-center">
                                {/* Signature */}
                                <p className="absolute   text-4xl  max-w-[150px] text-center -rotate-[20deg] top-10 left-20 z-[99] font-semibold" style={{ fontFamily: "var(--font-dancing-script), 'Brush Script MT', cursive" }}>
                                    {slide.fullName}
                                </p>
                                <img
                                    src={slide.image || `/placeholder.webp`}
                                    alt={slide.fullName || `Testimonial ${idx + 1}`}
                                    className='h-64 overflow-hidden object-cover -100 relative z-[50]'
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `/placeholder.webp`;
                                    }}
                                />
                                <h2 className='text-2xl font-semibold mt-6 '>{slide.fullName}</h2>
                                <div className="flex gap-1 mt-2 items-center justify-center">
                                    {[...Array(5)].map((_, i) => {
                                        return <div className=" size-3 lg:size-4 bg-[#199143] rounded-full"></div>
                                    })}
                                </div>
                                <p className='mt-8 px-4 text-lg line-clamp-3 text-justify' dangerouslySetInnerHTML={{ __html: slide.comment || "" }}></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}
