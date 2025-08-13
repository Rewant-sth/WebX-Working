"use client"
import gsap from 'gsap'
import { Camera, } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { motion } from "motion/react";

export default function Intro() {
    const num1 = useRef<HTMLParagraphElement>(null);
    const num2 = useRef<HTMLParagraphElement>(null);
    const num3 = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            // Set initial values to 0 with + sign
            if (num1.current) num1.current.textContent = "0+";
            if (num2.current) num2.current.textContent = "0+";
            if (num3.current) num3.current.textContent = "0+";

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom center",
                    markers: false,
                    toggleActions: "play none none reverse"
                }
            });

            // Counter animation for num1 (10+)
            tl.to({}, {
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                    const progress = this.progress();
                    const currentValue = Math.floor(progress * 10);
                    if (num1.current) {
                        num1.current.textContent = currentValue + "+";
                    }
                }
            });

            // Counter animation for num2 (100+)
            tl.to({}, {
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                    const progress = this.progress();
                    const currentValue = Math.floor(progress * 100);
                    if (num2.current) {
                        num2.current.textContent = currentValue + "+";
                    }
                }
            }, 0);

            // Counter animation for num3 (500+)
            tl.to({}, {
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                    const progress = this.progress();
                    const currentValue = Math.floor(progress * 500);
                    if (num3.current) {
                        num3.current.textContent = currentValue + "+";
                    }
                }
            }, 0);
        });

        return () => context.revert();

    }, [])
    return (
        <section ref={containerRef} className="min-h-screen flex justify-center items-center h-full relative  snap-start">

            <div className="absolute -top-1/2 z-[80] left-0 flex justify-between w-full">
                <img src="/cloud_1.webp" alt="" />
                {/* <img src="/cloud_3.webp" alt="" /> */}
                <img src="/cloud_2.webp" alt="" />
            </div>

            <div
                className='grid grid-cols-2 max-w-7xl mx-auto py-20 '
            >
                <div className="w-full max-w-2xl flex flex-col  gap-12 items-start ">
                    <div className="max-w-2xl w-full space-y-1.5 text-5xl font-semibold">
                        <h2 className='bg-white w-fit px-2 rounded-sm py-1 ' >Who we are </h2>
                        <h2 className='bg-white w-fit px-2 rounded-sm py-1 ' >and <span className='bg-orange-500 px-2 text-white'>what we do</span></h2>
                    </div>
                    <button className='flex w-fit h-fit font-semibold gap-2 items-center'>
                        <span className='bg-amber-600 flex justify-center items-center text-white size-16 rounded-full'>
                            <Camera className='fill-white' />
                        </span>
                        <span className='text-left  leading-4 uppercase'>view <br /> gallery</span>
                    </button>
                </div>
                <div className="pt-2 space-y-5">
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='text-2xl'>
                        We have developed interesting routes across <b>different continents</b>, countries, and places on the planet that will allow us to get to know the world closer.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='text-2xl'>
                        Team of professional guides and a support team with years of <u> experience</u> in traveling and climbing. Our guides will ensure the safety of the tour, will give you useful <u>knowledge and skills</u> for independent travel in the future.
                    </motion.p>


                    <div className="grid grid-cols-3 mt-16  text-center gap-4">
                        <div className="">
                            <h2>Years of Experience</h2>
                            <p className='text-5xl font-semibold' ref={num1}>0+</p>
                        </div>
                        <div className="">
                            <h2>Successful Tours</h2>
                            <p className='text-5xl font-semibold' ref={num2}>0+</p>
                        </div>

                        <div className="">
                            <h2>Happy Clients</h2>
                            <p className='text-5xl font-semibold' ref={num3}>0+</p>
                        </div>

                    </div>
                </div>
            </div>
        </section >
    )
}
