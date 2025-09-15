"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function VerticalSwiper() {
    return (
        <div className="w-full h-screen overflow-visible transform-none">
            <Swiper
                direction="vertical"
                spaceBetween={100}
                mousewheel={{
                    sensitivity: 0.5,
                }}
                modules={[Mousewheel]}
                className="w-full h-full"
            >
                <SwiperSlide className="flex items-center pt-36 h-screen justify-center bg-white text-xl">
                    <h2 className="text-[5dvw] w-fit  sticky top-20  mx-auto font-semibold uppercase">Experience the REAL HIMALAYA</h2>
                    <div className="absolute inset-0">
                        <img src="/hero-front.png" alt="Real Himalaya" className="h-[200dvh] object-top" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex relative items-center h-screen  justify-center bg-white text-xl">
                    <img src="/hero-back.png" alt="hero-back" className="object-bottom" />
                    <div className="absolute bottom-0 ">
                        <img src="/hero-front.png" alt="Real Himalaya" className="h-[200dvh] object-cover object-top" />
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
}
