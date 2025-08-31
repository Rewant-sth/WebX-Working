import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play } from 'lucide-react';
import React, { useLayoutEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const rightTextRef = React.useRef<HTMLDivElement>(null);
  const rightSectionRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [AutoScroll({ stopOnInteraction: false, stopOnFocusIn: false, stopOnMouseEnter: false, speed: 0.5 })]
  );


  // Carousel images
  const carouselImages = [
    '/1.jpeg',
    '/2.jpeg',
    '/3.jpeg',
    '/4.jpeg',
    '/5.jpeg',
    '/basecamp.webp',
    '/climb.webp',
    '/hiking.avif',
    '/mountain.jpg'
  ];


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
    <div ref={mainRef} className=" relative w-full h-[150vh] overflow-hidden ">

      {/* hero first */}
      <div ref={sectionRef} className="h-screen max-w-7xl mx-auto sticky top-50 flex ">
        <div className="w-full grid md:grid-cols-2 ">
          <div className="flex gap-8 lg:gap-16 font-semibold items-start justify-evenly">
            <Link href={"/package-list/trekking"}>
              <button className='flex w-fit h-fit gap-2 items-center'>
                <span className='bg-amber-600 flex justify-center items-center text-white size-16 rounded-full'>
                  <Play className='fill-white' />
                </span>
                <span className='text-left leading-4 uppercase'>view <br /> more</span>
              </button>
            </Link>
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
          <img src="logo/white.svg" alt="" className="w-80" />
          <h2 className="relative z-50 text-4xl mt-6 text-center">
            Embark on <span className='text-orange-500'>extraordinary journeys</span> through the <br />
            <span className='text-orange-500'>world's highest peaks</span> and create <u>unforgettable memories.</u>
          </h2>

          <div className="absolute bottom-1 left-0 ">
            <img src="/cloud_1.webp" alt="cloud" className='-translate-x-20' />
          </div>
          <div className="absolute bottom-1 right-0 ">
            <img src="/cloud_2.webp" alt="cloud" className='translate-x-16' />
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
      <div className="absolute -bottom-20 left-0 pointer-events-none w-full z-[70]">
        <div className="relative  mx-auto  ">

          {/* Carousel */}
          <div className="" ref={emblaRef}>
            <div className="flex">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_30%] min-w-0 pointer-events-none "
                >
                  <div className="relative  rounded-lg  group cursor-pointer">
                    <img
                      src={"/cloud_1.webp"}
                      alt={`Adventure ${index + 1}`}
                      className="w-full h-full object-cover scale-150  aspect-video"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
