"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PropType = {
    images: string[];
    options?: EmblaOptionsType;
};

const GalleryCarousel: React.FC<PropType> = ({ images, options = { loop: true } }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
        })
    ]);

    const [, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelectHandler = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        onSelectHandler();
        emblaApi.on('select', onSelectHandler);

        return () => {
            emblaApi.off('select', onSelectHandler);
        };
    }, [emblaApi]);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                    {images.map((image, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0">
                            <div className="relative h-[50dvh] w-full">
                                <Image
                                    src={image}
                                    alt={`Gallery image ${index + 1}`}
                                    fill
                                    className="object-cover rounded-sm"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={scrollPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200 z-10"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200 z-10"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </>
            )}




        </div>
    );
};

export default GalleryCarousel;
