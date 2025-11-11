import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const rightSectionRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
        duration: 0.3,
        ease: "none"
      }, 0);



      timeline.fromTo(rightSectionRef.current,
        {
          y: "100%",
          duration: 0.3,
          ease: "none"
        },
        {
          y: "50%",
          duration: 0.3,
          ease: "none"
        }, 0);




      // timeline.fromTo(leftRef.current,
      //   {
      //     left: "0%"
      //   },
      //   {
      //     left: "30%",
      //     duration: 0.3,
      //     ease: "none"

      //   }, 0);

      // timeline.fromTo(rightRef.current,
      //   {
      //     left: "0%"
      //   },
      //   {
      //     left: "30%",
      //     duration: 0.3,
      //     ease: "none"

      //   }, 0);

    });

    return () => ctx.revert();
  });



  return (
    <div ref={mainRef} className=" relative w-full h-[150vh] overflow-hidden ">

      <div ref={leftRef} className="absolute left-cloud2 top-[25%] lg:top-[15%] left-0 -translate-x-1/2  z-[50]">
        <img src="/cloud_1.webp" alt="cloud" className='-translate-x-20  z-[70]' />
      </div>
      <div ref={rightRef} className="absolute right-cloud2 top-[25%] lg:top-[15%]    right-0 translate-x-1/2  z-[50]">
        <img src="/cloud_2.webp" alt="cloud" className='translate-x-16  z-[70]' />
      </div>

      <div className="absolute inset-0">
        <img src="/hero-back.jpeg" alt="Real Himalaya" className='w-full h-full brightness-50 opacity-40' />
      </div>
      {/* hero first */}
      <div ref={sectionRef} className="h-screen   sticky top-30 lg:flex gap-6 lg:gap-16 p-6 ">
        <h2 className='text-[10dvw] sm:text-[6dvw] font-bold uppercase text-center mx-auto   leading-12 lg:leading-24'><span className="text-[#01283F]">Explore  The</span> <span className="text-[#F05E25]">Real Himalaya</span></h2>
      </div>

      {/* hero second */}
      <section ref={rightSectionRef} className="h-screen md:text-justify overflow-hidden  absolute top-0 left-0  w-full translate-y-full text-white  gap-14 z-[99] flex flex-col justify-center items-center">
        <div className="h-full relative w-full space-y-4 flex flex-col justify-center items-center">
          <img src="logo/white.svg" alt="Real Himalaya" className="w-28 lg:w-80" />
          <h2
            style={{
              textShadow: "1px 1px 20px black"
            }}
            className="relative z-50 text-xl md:text-3xl my-6 lg:translate-y-6 max-w-6xl mx-auto px-4 ">
            “Step into the realm of the world’s highest peaks, where every path whispers adventure and every journey becomes a memory etched forever.”
          </h2>

          <h3
            style={{
              textShadow: "1px 1px 20px black"
            }}
            className='max-w-6xl mx-auto  text-xl md:text-3xl  px-4 !mt-5 text-' >
            At <strong className='text-orange-500  '>Real Himalaya</strong>, we invite you to embrace the spirit of the mountains, where snow-capped giants rise above ancient valleys and cultures thrive in timeless harmony. Each trek is more than a trail, it is a passage into breathtaking landscapes, heartfelt encounters, and unforgettable experiences waiting to be discovered.
          </h3>
        </div>
      </section>

      <div
        ref={imageRef}
        className="absolute top-[0%] max-w-screen h-[150dvh] w-full z-[50] pointer-events-none"
      >
        <div className="relative h-full max-w-screen  ">
          <Image height={1200} width={1400} src="/himal.png" quality={80} alt="hero" className="w-full h-full object-cover object-top" />
        </div>
      </div>


      <div ref={leftRef} className="absolute left-cloud bottom-10 left-0 -translate-x-1/2  z-[70]">
        <Image height={1200} width={1400} src="/cloud_1.webp" alt="cloud" className='-translate-x-20 z-[70] w-auto h-auto' />
      </div>
      <div ref={rightRef} className="absolute right-cloud bottom-10   right-0 translate-x-1/2  z-[70]">
        <img src="/cloud_2.webp" alt="cloud" className='translate-x-16' />
      </div>


      {/* carousel here */}
      <div className="absolute  -bottom-20 left-0 pointer-events-none w-full z-[70]">
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
