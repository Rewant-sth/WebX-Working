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

  useLayoutEffect(() => {
    const context = gsap.context(() => {


      const tl = gsap.timeline();


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
        sacale: 1
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
    <section ref={sectionRef} className="h-screen overflow-hidden relative  snap-start flex justify-end items-center">
      <div className="absolute top-0 left-0 w-full h-dvh z-[99] bg-gradient-to-b from-white to-transparent"></div>
      <motion.div

        className="absolute inset-0 z-[9999]   w-full flex justify-end items-end">
        <motion.div
          ref={cloudRef}
          className="w-full h-[100vh]    relative">
          <Image src={"/cloud_3.png"} alt='bg' fill className='z-[99] translate-y-4 relative object-cover object-center' />
        </motion.div>
      </motion.div>


      <div className="absolute inset-0  z-[30] ">
        <div className="relative h-full blend  w-full">
          <Image ref={manRef} src={"/DSC00722.JPG"} alt='bg' fill className='z-[30] relative object-cover object-bottom ' />
        </div>
      </div>


      <div
        className='flex  pl-40 relative  z-[99]  items-center w-full justify-start '
      >
        <div className="w-full relative  max-w-2xl flex gap-2 items-start ">
          <div className="size-28 -translate-y-[4px] relative rounded-sm overflow-hidden ">
            <Image src={"/logo/logo.svg"} alt='bg' fill />
          </div>
          <div className="max-w-2xl w-full space-y-1.5 text-5xl font-semibold">
            <h2 className='bg-white w-fit px-2 rounded-sm py-1 ' >We are maniacs</h2>
            <h2 className='bg-white w-fit px-2 rounded-sm py-1 ' >of travelling</h2>
          </div>
        </div>
      </div>


    </section >
  )
}
