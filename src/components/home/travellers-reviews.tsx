"use client"
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';


const reviews = [
    {
        name: "Anisha Thapa",
        role: "Trekking Enthusiast",
        review: "The Real Himalaya team made my Everest Base Camp trek unforgettable. Every detail was planned perfectly, and I felt safe the entire time."
    },
    {
        name: "Bikash Shrestha",
        role: "Adventure Photographer",
        review: "Spectacular routes, friendly guides, and breathtaking landscapes! I captured some of my best shots during this journey and enjoyed every moment."
    },
    {
        name: "Maya Gurung",
        role: "Travel Blogger",
        review: "The cultural immersion on this trip was beyond my expectations. From traditional dances to local cuisine, every experience felt truly authentic and memorable."
    },
    {
        name: "Kiran Adhikari",
        role: "Mountaineer",
        review: "Excellent logistics for high-altitude climbs. The team ensured we had the right equipment, acclimatization, and guidance for a safe and successful summit."
    },
    {
        name: "Suman Koirala",
        role: "Nature Lover",
        review: "Breathtaking scenery combined with well-paced itineraries made this journey unforgettable. Every day brought a new landscape that left me inspired and humbled."
    }
];



// EmblaCarousel-2_5Slides.jsx
// Tailwind + Embla carousel component that shows 2.5 slides per view by default.
// - Install: npm i embla-carousel-react
// - TailwindCSS must be configured in your project
// - Usage: <EmblaCarousel slides={arrayOfJSXOrImageUrls} />

export default function EmblaCarousel({ slides = [1, 2, 3, 4], className = '' }) {
    // Embla hook
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
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

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <div id='reviews' className={`relative w-full flex flex-col py-24 justify-center items-center   ${className}`}>

            <h2 className='text-4xl pb-10 text-center font-semibold max-w-xl leading-12'><span className='bg-orange-500 text-white px-4 '>Thousands</span> of reviews on various <span className='bg-orange-500 text-white px-4'>platforms</span></h2>

            {/* Embla viewport */}
            <div className="overflow-hidden relative w-full" ref={emblaRef}>
                <div className="absolute h-full top-0 left-0 w-80 lg:w-96 bg-gradient-to-r z-[99] from-white to-transparent"></div>
                <div className="absolute h-full top-0 right-0 w-80 lg:w-96 bg-gradient-to-l z-[99] from-white to-transparent"></div>


                {/* Controls */}
                <div className="absolute inset-y-1/2 left-2 transform -translate-y-1/2 z-[999]">
                    <button
                        onClick={scrollPrev}
                        className="size-16 text-4xl flex justify-center items-center rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
                        aria-label="Previous"
                    >
                        <ChevronRight className='rotate-180' />
                    </button>
                </div>

                <div className="absolute inset-y-1/2 right-2 transform -translate-y-1/2 z-[999]">
                    <button
                        onClick={scrollNext}
                        className="size-16 text-4xl flex justify-center items-center rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
                        aria-label="Next"
                    >
                        <ChevronRight className='' />

                    </button>
                </div>

                {/* Embla container */}
                <div className="flex -ml-4">
                    {reviews.map((slide, idx) => (
                        <div
                            key={idx}
                            className="embla__slide flex-none p-4"
                            style={{

                                // 2.5 slides per view => each slide is 40% of the viewport width (100 / 2.5)
                                // Adjust this value if you want different slides-per-view.
                                minWidth: '38%',
                                maxWidth: '38%',
                            }}
                        >
                            <div className="min-h-96  border py-10  relative rounded-sm overflow-hidden    flex flex-col items-center justify-center">
                                <div className="absolute  text-lg max-w-[150px] text-center -rotate-[20deg] font-cursive top-10 left-20 z-[99]">
                                    {slide.name}
                                </div>
                                <img src={`/${idx + 1}.jpeg`} alt="" className='w-50 h-64 overflow-hidden object-cover grayscale-100 relative z-[50]' />
                                <h2 className='text-2xl font-semibold mt-6'>{slide.name}</h2>
                                <div className="flex gap-1 items-center justify-center">
                                    {[...Array(5)].map((_, i) => {
                                        return <Star key={i} className='fill-yellow-500 stroke-0 text-yellow-500' />;
                                    })}
                                </div>
                                <p className='mt-4 px-4 text-lg line-clamp-3 text-center'>{slide.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Pagination (optional small dots) */}
            <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: Math.max(1, slides.length) }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => emblaApi && emblaApi.scrollTo(i)}
                        className={`w-2 h-2 rounded-full ${i === selectedIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>


        </div>
    );
}
