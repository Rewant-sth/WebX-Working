import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play } from 'lucide-react';
import React, { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const rightTextRef = React.useRef<HTMLDivElement>(null);
  const rightSectionRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);


  useLayoutEffect(() => {
    ScrollTrigger.refresh()
    const ctx = gsap.context(() => {

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 2,

          // pin: true,
        },
      });

      timeline.to(imageRef.current, {
        top: "0%",
        duration: 1,
      }, 0);

      timeline.fromTo(rightSectionRef.current,
        {
          y: "100%",
          duration: 1,
        },
        {
          y: "30%",
          duration: 1,
        }, 0);

    });

    return () => ctx.revert();
  }, []);



  return (
    <div ref={mainRef} className=" relative w-full h-[150vh] ">

      {/* hero first */}
      <div ref={sectionRef} className="h-screen max-w-7xl mx-auto sticky top-50 flex ">
        <div className="w-full grid md:grid-cols-2 ">
          <div className="flex gap-8 lg:gap-16 font-semibold items-start justify-evenly">
            <button className='flex w-fit h-fit gap-2 items-center'>
              <span className='bg-amber-600 flex justify-center items-center text-white size-16 rounded-full'>
                <Play className='fill-white' />
              </span>
              <span className='text-left leading-4 uppercase'>view <br /> more</span>
            </button>
            <h2 className='text-gray-800 text-3xl md:text-7xl font-semibold'>Mountain <br /> World</h2>
          </div>
        </div>
        <div ref={rightTextRef} className="w-full max-w-xl line-clamp-3 text-lg">
          <p>Discover the <b>majestic beauty of Nepal</b> through our expertly crafted trekking adventures. From the <u>towering peaks of Everest</u> to the serene trails of Annapurna, we guide you through breathtaking landscapes and rich cultural experiences that will create memories to last a lifetime.</p>
        </div>
      </div>

      {/* hero second */}
      <section ref={rightSectionRef} className="h-screen overflow-hidden  absolute top-0 left-0 w-full translate-y-full text-white  gap-14 z-[60] flex flex-col justify-center items-center">
        <div className="h-full relative w-full space-y-4 flex flex-col justify-center items-center">
          <img src="logo/white.svg" alt="" className="w-96" />
          <h2 className="text- text-5xl text-center">
            Embark on extraordinary journeys through the <br />
            world's highest peaks and create <u>unforgettable memories.</u>
          </h2>

          <div className="absolute bottom-1 left-20">
            <img src="/cloud_1.webp" alt="cloud" />
          </div>
          <div className="absolute bottom-1 right-20">
            <img src="/cloud_2.webp" alt="cloud" />
          </div>
        </div>


      </section>

      <div
        ref={imageRef}
        className="absolute top-[30%] max-w-screen h-[150dvh] w-full z-[50] pointer-events-none"
      >
        <div className="relative h-full max-w-screen  ">
          <img src="/hero.png" alt="hero" className="w-full h-full object-cover" />
        </div>
      </div>


      {/* carousel here */}

    </div>
  )
}
