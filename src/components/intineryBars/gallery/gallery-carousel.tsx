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

const GalleryCarousel: React.FC<PropType> = ({ slides, options = { loop: true } }) => {
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
    const [slidesPerView, setSlidesPerView] = useState(1)


    const updateCarouselState = useCallback(() => {
        if (!emblaApi) return;

        // Get visible slides
        const visibleSlides = emblaApi.slidesInView();
        if (visibleSlides.length === 0) return;

        // Determine slides per view
        const newSlidesPerView = visibleSlides.length;
        setSlidesPerView(newSlidesPerView);

        // Calculate center index based on slides per view
        if (newSlidesPerView === 5) {
            setCenterIndex(visibleSlides[2]); // 3rd slide (index 2) for 5 slides
        } else if (newSlidesPerView === 3) {
            setCenterIndex(visibleSlides[1]); // 2nd slide (index 1) for 3 slides
        } else {
            setCenterIndex(null); // No scaling for other cases
        }
    }, [emblaApi]);

    // Initialize and listen to carousel events
    useEffect(() => {
        if (!emblaApi) return;

        // Initialize state
        updateCarouselState();

        // Listen to carousel events
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
        <section className=" mx-auto relative translate-z-20 ">
            <div className="absolute top-full -translate-y-[40%] z-[9999] left-1/2 -translate-x-1/2">
                <img src="/man.png" alt="" className='drop-shadow-2xl drop-shadow-black' />
            </div>
            <div className="overflow-hidden relative" ref={emblaRef}>

                <div
                    className={`
                        flex touch-pan-y touch-pinch-zoom backface-hidden
                        -ml-4 sm:-ml-6 xl:-ml-8
                `}
                >
                    {slides?.map((slide, index) => (
                        <div
                            key={index}
                            className={`
                                flex-[0_0_100%] pl-4
                                lg:flex-[0_0_calc(100%/3)] sm:pl-6
                                xl:flex-[0_0_calc(100%/5)] xl:pl-8
                                min-w-0
                                `}>
                            <div
                                className={`
                                     font-semibold flex items-center justify-center 
                                    h-[18rem] rounded-md shadow-2xl overflow-hidden select-none  bg-white
                                    transition-transform duration-300 ease-in-out
                                    transform origin-center
                                    ${centerIndex === index ? 'scale-110' : 'scale-100'}
                                `}
                            >
                                <Image src={slide.imageUrl} alt={JSON.stringify(slide) || ""} layout="fill" objectFit="cover" className='object-cover object-center' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] justify-between gap-4 mt-6">
                {/* Prev / Next Buttons */}
                <div className="grid grid-cols-2 gap-2 items-center">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                        className="embla__button"
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                        className="embla__button"
                    />
                </div>

                {/* Dots */}

            </div>
        </section>
    )
}

export default GalleryCarousel;
