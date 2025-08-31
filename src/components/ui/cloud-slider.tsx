import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'

import EmblaCarousel from 'embla-carousel-react'
// import 'embla-carousel/embla-carousel.css'
import AutoScroll from 'embla-carousel-auto-scroll'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const CloudSlider: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = EmblaCarousel({ ...options, loop: true }, [
        AutoScroll({
            speed: 0.4,
            stopOnMouseEnter: false,
            stopOnFocusIn: false,
            stopOnInteraction: false,

        })
    ])


    return (
        <section className="absolute top-1/2 left-0 -translate-y-1/2 z-[50] w-full">
            <div className="overflow-hidden pointer-none:" ref={emblaRef}>
                <div
                    className={`
            flex touch-pan-y touch-pinch-zoom backface-hidden
            -ml-4 sm:-ml-6 xl:-ml-8
          `}
                >
                    {slides.map((index) => (
                        <div
                            key={index}
                            className={`
                            flex-[0_0_100%] pl-4
                            sm:flex-[0_0_50%] sm:pl-6
                            xl:flex-[0_0_calc(100%/3)] xl:pl-8
                            min-w-0
                        `}
                        >
                            <div
                                className="text-4xl font-semibold flex items-center justify-center h-[19rem] rounded-[1.8rem] select-none "
                            >
                                <img src="/cloud.png" alt="cloud" className='scale-150 ' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    )
}

export default CloudSlider
