"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";

type CarouselImage = {
    src: string;
    alt?: string;
};

type EmblaCarouselProps = {
    images: CarouselImage[];
    options?: EmblaOptionsType;
    className?: string;
    rounded?: boolean;
};

export default function EmblaCarousel({
    images,
    options = { loop: true, align: "start" },
    className,
    rounded = false,
}: EmblaCarouselProps) {
    const [emblaRef] = useEmblaCarousel(options, [
        Autoplay({ delay: 3000, stopOnInteraction: false }),
    ]);

    const slideClassName = rounded ? "rounded-sm overflow-hidden" : "";

    const renderImage = useCallback((image: CarouselImage, index: number) => {
        return (
            <div key={index} className="min-w-0 flex-[0_0_100%] relative">
                <div className={`relative w-full h-full ${slideClassName}`}>
                    <Image
                        src={image.src}
                        alt={image.alt || `Slide ${index + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover object-top"
                        priority={index === 0}
                    />
                </div>
            </div>
        );
    }, [slideClassName]);

    if (!images || images.length === 0) return null;

    return (
        <div className={className}>
            <div className="overflow-hidden relative w-full h-full" ref={emblaRef}>
                <div className="flex touch-pan-y touch-pinch-zoom backface-hidden w-full h-full">
                    {images.map(renderImage)}
                </div>
            </div>
        </div>
    );
}


