"use client"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react'
import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {

  const cloudRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const manRef = useRef<HTMLImageElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {

      const tl = gsap.timeline();

      // Parallax effect for background (mimics background-attachment: fixed)
      tl.fromTo(bgRef.current, {
        y: "0%"
      }, {
        ease: "none",
        y: "-20%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }, 0)

      tl.fromTo(cloudRef.current, {
        y: "50%"
      }, {
        ease: "none",
        y: "0%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=100%",
          scrub: 2,
        }
      }, 0)

      tl.fromTo(manRef.current, {
        scale: 1
      }, {
        ease: "none",
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=100%",
          scrub: 2,
        }
      }, 0)

    })
    return () => context.revert()
  }, [])

  return (
    <section ref={sectionRef}
      style={{
        backgroundImage: "url('/DSC00722.JPG')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundAttachment: "fixed"
      }}
      className="h-screen overflow-hidden relative snap-start flex justify-end items-center bg-fixed-fallback">
      <motion.div

        className="absolute inset-0 z-[9999]   w-full flex justify-end items-end">
        <motion.div
          ref={cloudRef}
          className="w-full h-[100vh]    relative">
          <Image src={"/cloud_3.png"} alt='bg' fill className='z-[99] translate-y-4 relative object-cover object-center' />
        </motion.div>
      </motion.div>

      <div
        className='flex  pl-40 relative  z-[99]  items-center w-full justify-start '
      >
        <div className="w-full relative  max-w-2xl flex gap-2 items-start ">
          <div className="size-[8rem]  relative rounded-sm overflow-hidden ">
            <Image src={"/logo/logo.svg"} alt='bg' fill />
          </div>
          <div className="max-w-2xl w-full space-y-1.5 text-4xl uppercase font-semibold">
            <h2 className='bg-white w-fit px-2 rounded-sm py-1 ' >We are maniacs</h2>
            <h2 className='bg-white w-fit px-2 rounded-sm py-1 ' >of travelling</h2>
          </div>
        </div>
      </div>
    </section >
  )
}
