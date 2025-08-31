import React, { useCallback } from "react"
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel"
import {
    PrevButton,
    NextButton,
    usePrevNextButtons,
} from "./buttons"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image";
import { motion } from "framer-motion"

type PropType = {
    slides: {
        _id: string
        packageId: string
        fullName: string
        image: string
        isActive: boolean
        rating: number
        sortOrder: number
        comment: string
        createdAt: string
        updatedAt: string
        __v: number
    }[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides } = props
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
    }, [Autoplay({
        delay: 4000,
    })])

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        resetOrStop()
    }, [])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi, onNavButtonClick)

    return (
        <section className=" mx-auto">
            {/* Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y touch-pinch-zoom ">
                    {slides.map((data) => (
                        <div
                            key={data._id}
                            className="transform translate-x-0 py-6 flex-[0_0_45%] min-w-0 mx-2"
                        >
                            <div


                                className="w-full aspect-video  bg-black text-white">
                                <div className="absolute inset-0">
                                    <div className="h-full w-full relative">
                                        <Image src={data.image} alt="image" fill />
                                    </div>
                                </div>
                                <div
                                    className="relative p-4">
                                    <h2>{data.comment}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-[auto_1fr] justify-between gap-5 mt-7">
                <div className="grid grid-cols-2 gap-2 items-center">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                        className="w-14 h-14 rounded-full border-2 border-gray-400 flex items-center justify-center disabled:text-gray-500"
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                        className="w-14 h-14 rounded-full border-2 border-gray-400 flex items-center justify-center disabled:text-gray-500"
                    />
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
