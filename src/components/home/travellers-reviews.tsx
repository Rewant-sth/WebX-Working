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
        <div id='reviews' className={`relative w-full flex flex-col py-24 justify-center items-center   ${className}`}>

            <h2 className='text-xl md:text-4xl pb-10 text-center font-semibold max-w-xl leading-6 mx-4 md:leading-12'>
                <span className='bg-orange-500 text-white px-4 '>
                    Thousands</span> of reviews on various <span className='bg-orange-500 text-white px-4'>
                    platforms</span>
            </h2>

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
                            <div className="min-h-96  border py-10  relative rounded-sm overflow-hidden    flex flex-col items-center justify-center">
                                {/* Signature */}
                                <p className="absolute text-4xl  max-w-[150px] text-center -rotate-[20deg] top-10 left-20 z-[99] font-semibold" style={{ fontFamily: "var(--font-dancing-script), 'Brush Script MT', cursive" }}>
                                    {slide.fullName}
                                </p>
                                <img
                                    src={slide.image || `/placeholder.webp`}
                                    alt={slide.fullName || `Testimonial ${idx + 1}`}
                                    className='w-50 h-64 overflow-hidden object-cover grayscale-100 relative z-[50]'
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `/placeholder.webp`;
                                    }}
                                />
                                <h2 className='text-2xl font-semibold mt-6'>{slide.fullName}</h2>
                                <div className="flex gap-1 items-center justify-center">
                                    {[...Array(5)].map((_, i) => {
                                        return <Star
                                            key={i}
                                            className={`${i < (slide.rating || 5) ? 'fill-yellow-500' : 'fill-gray-300'} stroke-0 text-yellow-500`}
                                        />;
                                    })}
                                </div>
                                <p className='mt-4 px-4 text-lg line-clamp-3 text-center'>{slide.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}
