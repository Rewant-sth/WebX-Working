import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
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

    });

    return () => ctx.revert();
  });



  return (
    <div ref={mainRef} className=" relative w-full h-[150vh] overflow-hidden ">

      <div className="absolute inset-0">
        <img src="/hero-back.png" alt="" className='w-full h-full brightness-50 opacity-40' />
      </div>
      {/* hero first */}
      <div ref={sectionRef} className="h-screen   sticky top-50 lg:flex gap-6 lg:gap-16 p-6 ">
        <h2 className='text-[5dvw] font-bold uppercase'>Explore the Real Himalaya</h2>
      </div>

      {/* hero second */}
      <section ref={rightSectionRef} className="h-screen overflow-hidden  absolute top-0 left-0 w-full translate-y-full text-white  gap-14 z-[60] flex flex-col justify-center items-center">
        <div className="h-full relative w-full space-y-4 flex flex-col justify-center items-center">
          <img src="logo/white.svg" alt="" className="w-80" />
          <h2 className="relative z-50 text-xl md:text-4xl mt-6 text-center">
            Embark on <span className='text-orange-500'>extraordinary journeys</span> through the <br />
            <span className='text-orange-500'>world's highest peaks</span> and create <u>unforgettable memories.</u>
          </h2>


        </div>


      </section>

      <div
        ref={imageRef}
        className="absolute top-[20%] max-w-screen h-[150dvh] w-full z-[50] pointer-events-none"
      >
        <div className="relative h-full max-w-screen  ">
          <img src="/hero-front2.png" alt="hero" className="w-full h-full object-cover object-top" />
        </div>
      </div>


      <div className="absolute bottom-10 left-0 -translate-x-1/2  z-[70]">
        <img src="/cloud_1.webp" alt="cloud" className='-translate-x-20 z-[70]' />
      </div>
      <div className="absolute bottom-10   right-0 translate-x-1/2  z-[70]">
        <img src="/cloud_2.webp" alt="cloud" className='translate-x-16' />
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
