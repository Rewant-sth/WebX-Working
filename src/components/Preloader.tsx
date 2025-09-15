"use client"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

interface PreloaderProps {
    onSkip?: () => void;
}

gsap.registerPlugin(ScrollTrigger)
export default function Preloader({ onSkip }: PreloaderProps) {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(titleRef.current, { clipPath: "inset(0% 100% 0% 0%)" }, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1,
                ease: "power2.out",
                delay: 8
            });

            tl.fromTo(sectionRef.current, {
                clipPath: "inset(0% 0% 0% 0%)"
            }, {
                clipPath: "inset(100% 0% 100% 0%)",
                duration: 1,
                ease: "none",
                delay: 2
            })
        });

        return () => ctx.revert();
    }, [])

    return (
        <section ref={sectionRef} className='h-screen w-full fixed top-0 left-0 z-[999999] overflow-hidden'>
            <video src="/preloader.mp4" autoPlay muted className='h-full w-full object-cover'></video>
            <div className="absolute inset-0 flex justify-center items-center">
                <h1 ref={titleRef} className='text-4xl md:text-5xl uppercase font-bold text-white text-center'>Welcome To Real Himalaya</h1>
            </div>
            {onSkip && (
                <button
                    onClick={onSkip}
                    className="absolute bottom-8 right-8 text-white text-lg font-medium underline hover:text-gray-200 transition-colors duration-300 z-10"
                >
                    Skip
                </button>
            )}
        </section>
    )
}
