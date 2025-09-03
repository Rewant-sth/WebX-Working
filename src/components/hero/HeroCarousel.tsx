"use client";

import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function VerticalSwiper() {
    const [allowScroll, setAllowScroll] = useState(false);

    const handleSlideChange = (swiper: SwiperType) => {
        // Enable scroll only when we reach the last slide
        if (swiper.isEnd) {
            setAllowScroll(true);
        } else {
            setAllowScroll(false);
        }
    };

    return (
        <div className="w-full h-screen overflow-visible transform-none">
            <Swiper
                direction="vertical"
                spaceBetween={100}
                mousewheel={{
                    sensitivity: 0.5,
                    // Prevent scrolling to next section unless all slides are viewed
                    releaseOnEdges: allowScroll
                }}
                modules={[Mousewheel]}
                onSlideChange={handleSlideChange}
                className="w-full h-full"
            >
                <SwiperSlide className="flex items-center pt-36 h-screen justify-center bg-white text-xl">
                    <h2 className="text-[5dvw] w-fit  sticky top-20  mx-auto font-semibold uppercase">Experience the REAL HIMALAYA</h2>
                    <div className="absolute inset-0">
                        <img src="/hero-front.png" alt="" className="h-[200dvh] object-top" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex relative items-center h-screen  justify-center bg-white text-xl">
                    <img src="/hero-back.png" alt="hero-back" className="object-bottom" />
                    <div className="absolute bottom-0 ">
                        <img src="/hero-front.png" alt="" className="h-[200dvh] object-cover object-top" />
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
}
