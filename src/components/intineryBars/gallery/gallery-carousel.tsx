import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './arrow-buttons'
import useEmblaCarousel from 'embla-carousel-react'
import AutoPlay from 'embla-carousel-autoplay'
import { IGallery } from '@/types/IGallery'
import Image from 'next/image'

type PropType = {
    slides: IGallery[] | undefined
    options?: EmblaOptionsType
}

const GalleryCarousel: React.FC<PropType> = ({ slides, options = { loop: true, align: 'center' } }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        AutoPlay({ delay: 3000, stopOnInteraction: false })
    ])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    const [centerIndex, setCenterIndex] = useState<number | null>(null)

    const updateCarouselState = useCallback(() => {
        if (!emblaApi) return;

        const scrollSnapIndex = emblaApi.selectedScrollSnap();
        setCenterIndex(scrollSnapIndex);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        updateCarouselState();

        emblaApi.on('select', updateCarouselState);
        emblaApi.on('reInit', updateCarouselState);
        emblaApi.on('resize', updateCarouselState);

        return () => {
            emblaApi.off('select', updateCarouselState);
            emblaApi.off('reInit', updateCarouselState);
            emblaApi.off('resize', updateCarouselState);
        };
    }, [emblaApi, updateCarouselState]);

    return (
        <section className="absolute inset-0 w-dvw h-dvh">
            {/* Carousel */}
            <div className="overflow-hidden relative w-full h-full" ref={emblaRef}>
                <div className="flex touch-pan-y touch-pinch-zoom backface-hidden w-full h-full">
                    {slides?.map((slide, index) => (
                        <div
                            key={index}
                            className="min-w-0 flex-[0_0_100%] w-dvw h-dvh relative"
                        >
                            <div className="w-full h-full relative">
                                <Image
                                    src={slide.imageUrl || "/EVEREST REGION/NIKOND50001920.JPG"}
                                    alt={slide.caption || `Gallery image ${index + 1}`}
                                    fill
                                    className="object-cover object-top"
                                    priority={index === 0}
                                    sizes="100vw"
                                />
                                {/* Optional overlay for better text readability */}
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        </div>
                    ))}
                    {slides?.length === 0 && (
                        <div className="h-dvh w-dvh relative">
                            <Image
                                src={"/EVEREST REGION/NIKOND50001920.JPG"}
                                alt={`No images available`}
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Buttons */}
            {
                slides && slides.length > 1 && (
                    <div className="absolute top-1/2 w-full -translate-y-1/2 left-1/2 -translate-x-1/2 z-[999]">
                        <div className="flex w-full justify-between items-center gap-4   rounded-full px-6 py-3">
                            <PrevButton
                                onClick={onPrevButtonClick}
                                disabled={prevBtnDisabled}
                                className="embla__button text-white hover:text-orange-400 transition-colors"
                            />



                            <NextButton
                                onClick={onNextButtonClick}
                                disabled={nextBtnDisabled}
                                className="embla__button text-white hover:text-orange-400 transition-colors"
                            />
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default GalleryCarousel