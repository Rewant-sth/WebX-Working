"use client";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const rightSectionRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // Set loaded state after a brief delay to prevent flash
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Carousel setup - disable auto-scroll on mobile for better performance
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'center' },
    isMobile
      ? [] // No auto-scroll on mobile
      : [AutoScroll({ stopOnInteraction: false, stopOnFocusIn: false, stopOnMouseEnter: false, speed: 0.3 })]
  );

  // Carousel images - reduced set for better performance
  const carouselImages = [
    '/1.jpeg',
    '/2.jpeg',
    '/3.jpeg',
    '/mountain.jpg'
  ];

  useLayoutEffect(() => {
    if (!isLoaded) return;

    ScrollTrigger.refresh()
    const ctx = gsap.context(() => {
      // Disable heavy animations on mobile devices
      if (isMobile) {
        // Simple mobile animations
        gsap.set(imageRef.current, { top: "10%" });
        gsap.set(rightSectionRef.current, { y: "60%" });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1, // Reduced scrub for smoother performance
          // pin: true,
        },
      });

      timeline.to(imageRef.current, {
        top: "0%",
        duration: 0.3,
        ease: "power2.out" // Better easing for performance
      }, 0);

      timeline.fromTo(rightSectionRef.current,
        {
          y: "100%",
          duration: 0.3,
          ease: "power2.out"
        },
        {
          y: "50%",
          duration: 0.3,
          ease: "power2.out"
        }, 0);

    });

    return () => ctx.revert();
  }, [isMobile, isLoaded]);

  return (
    <div ref={mainRef} className="relative w-full h-[150vh] overflow-hidden">

      <div className="absolute inset-0">
        <img
          src="/HeroSection-back.png"
          alt="Real Himalaya"
          className='w-full h-full brightness-50 opacity-40'
          loading="eager"
          decoding="async"
        />
      </div>

      {/* HeroSection first */}
      <div ref={sectionRef} className="h-screen sticky top-20 lg:flex gap-6 lg:gap-16 p-6">
        <h2 className='text-[8dvw] font-bold uppercase text-center mx-auto max-w-5xl leading-12 lg:leading-28 flex flex-col'>
          <span className="text-[#01283F]">Explore the </span>
          <span className="text-[#F05E25]">Real Himalaya</span>
        </h2>
      </div>

      {/* HeroSection second */}
      <section ref={rightSectionRef} className="h-screen md:text-justify overflow-hidden absolute top-0 left-0 w-full translate-y-full text-white gap-14 z-[60] flex flex-col justify-center items-center">
        <div className="h-full relative w-full space-y-4 flex flex-col justify-center items-center">
          <img
            src="logo/white.svg"
            alt="Real Himalaya Logo"
            className="w-28 lg:w-80"
            loading="lazy"
            decoding="async"
          />
          <h2 className="relative z-50 text-xl md:text-3xl mt-6 max-w-6xl mx-auto px-4">
            "Step into the realm of the world's highest peaks, where every path whispers adventure and every journey becomes a memory etched forever."
          </h2>

          <h3 className='max-w-6xl mx-auto text-xl md:text-3xl px-4'>
            At <strong className='text-orange-500'>Real Himalaya</strong>, we invite you to embrace the spirit of the mountains, where snow-capped giants rise above ancient valleys and cultures thrive in timeless harmony. Each trek is more than a trail, it is a passage into breathtaking landscapes, heartfelt encounters, and unforgettable experiences waiting to be discovered.
          </h3>
        </div>
      </section>

      <div
        ref={imageRef}
        className={`absolute top-[20%] max-w-screen h-[150dvh] w-full z-[50] pointer-events-none transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="relative h-full max-w-screen">
          <img
            src="/HeroSection-front2.png"
            alt="Himalayan Mountains"
            className="w-full h-full object-cover object-top"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Cloud decorations - hidden on mobile for performance */}
      {!isMobile && (
        <>
          <div className="absolute bottom-10 left-0 -translate-x-1/2 z-[70]">
            <img
              src="/cloud_1.webp"
              alt="cloud decoration"
              className='-translate-x-20 z-[70]'
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute bottom-10 right-0 translate-x-1/2 z-[70]">
            <img
              src="/cloud_2.webp"
              alt="cloud decoration"
              className='translate-x-16'
              loading="lazy"
              decoding="async"
            />
          </div>
        </>
      )}

      {/* Simplified carousel for mobile */}
      <div className="absolute -bottom-20 left-0 pointer-events-none w-full z-[70]">
        <div className="relative mx-auto">
          {/* Carousel */}
          <div className="" ref={emblaRef}>
            <div className="flex">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_30%] min-w-0 pointer-events-none"
                >
                  <div className="relative rounded-lg group cursor-pointer">
                    <img
                      src="/cloud_1.webp"
                      alt={`Adventure ${index + 1}`}
                      className="w-full h-full object-cover scale-150 aspect-video"
                      loading="lazy"
                      decoding="async"
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
