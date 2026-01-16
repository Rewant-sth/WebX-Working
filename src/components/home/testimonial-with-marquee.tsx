"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { EmblaOptionsType } from "embla-carousel";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import "./embla.css";

// Legacy testimonial interface for backward compatibility
export interface LegacyTestimonial {
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
}

type PropType = {
  slides: LegacyTestimonial[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ startDelay: 1 }),
  ]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  return (
    <section className="relative py-16 overflow-hidden sm:-mx-[30px]  lg:-mx-[80px]">
      <div className="w-[100%] ">
        <h2 className="text-5xl font-extrabold text-center text-blue-900 mb-12">
          What Our Travellers Say
        </h2>

        {/* Carousel Container with higher z-index and overflow visible */}
        <div className="relative z-50">
          {/* Left gradient overlay */}
          <div className="hidden md:block absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          {/* Right gradient overlay */}
          <div className="hidden md:block absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <div className="embla overflow-visible" ref={emblaRef}>
            <div className="embla__container flex gap-6">
              {slides.map((data, idx) => (
                <div
                  key={idx}
                  className="embla__slide flex-[0_0_80%] sm:flex-[0_0_60%] lg:flex-[0_0_45%]"
                >
                  {/* Enhanced Card Design with higher z-index */}
                  <div className="relative bg-white rounded-3xl p-10 min-h-[300px] sm:min-h-[300px] lg:min-h-[300px] transition-all duration-300 
                    border border-blue-100 z-40
                    bg-gradient-to-br from-white to-blue-50
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/5 before:to-transparent before:rounded-3xl
                    overflow-hidden transform-gpu">

                    {/* Blue accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                    {/* Decorative quote corner */}
                    <div className="absolute top-4 right-4 text-blue-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M7.17 17c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94m10 0c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94"
                        />
                      </svg>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-300 shadow-md">
                          <img
                            src={data.image}
                            alt={data.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 shadow-md">
                          <div className="bg-white rounded-full p-1">
                            <div className="bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="white"
                              >
                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-blue-900">
                          {data.name}
                        </h3>
                        <p className="text-base text-blue-600 font-medium">{data.role}</p>
                        <div className="mt-2 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 ${i < data.rating
                                ? "fill-yellow-400 stroke-yellow-400"
                                : "stroke-slate-200 fill-slate-100"
                                }`}
                            />
                          ))}
                          <span className="ml-2 text-base font-semibold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                            {data.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"></div>
                      <p className="ml-5 text-zinc-700 text-lg leading-relaxed italic">
                        "{data.review}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={() => onButtonAutoplayClick(scrollPrev)}
            className="p-4 rounded-full bg-white shadow-md border border-blue-100 hover:bg-blue-50 transition-all hover:shadow-lg disabled:opacity-50 z-50 relative"
          >
            <ChevronLeft className="w-7 h-7 text-blue-700" />
          </button>
          <button
            onClick={() => onButtonAutoplayClick(scrollNext)}
            className="p-4 rounded-full bg-white shadow-md border border-blue-100 hover:bg-blue-50 transition-all hover:shadow-lg disabled:opacity-50 z-50 relative"
          >
            <ChevronRight className="w-7 h-7 text-blue-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;