import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'
import React, { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

export default function Divider() {
    const divider1Ref = useRef<HTMLImageElement | null>(null);
    const divider2Ref = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        ScrollTrigger.refresh()
        const ctx = gsap.context(() => {
            gsap.fromTo(divider1Ref.current, {
                clipPath: 'inset(0% 100% 0% 100%)',
            }, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top", // when the top of the trigger hits the bottom of the viewport
                    end: "+=50%",
                    scrub: true,
                    pin: true,
                    markers: true,
                },
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: "none",
                duration: 0.2

            })
        });

        return () => ctx.revert();
    })
    return (
        <div ref={containerRef} className='h-screen   flex justify-start items-center  w-dvw overflow-hidden relative'>
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent z-40"></div>
            <Image src={"/EXPEDITION/intro.JPG"} ref={divider2Ref} fill className='object-cover object-bottom' alt='real himalaya ' />
            <Image src={"/divider1.JPG"} ref={divider1Ref} fill className='object-cover object-center' alt='real himalaya ' />
        </div>
    )
}
