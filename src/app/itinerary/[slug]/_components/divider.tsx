import { IGallery } from '@/types/IGallery'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'
import React, { useLayoutEffect } from 'react'

gsap.registerPlugin(ScrollTrigger);

export default function Divider({ images }: { images: IGallery[] }) {
    const imagesref = React.useRef<HTMLImageElement[] | []>([]);
    const mainRef = React.useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        ScrollTrigger.refresh();
        const ctx = gsap.context(() => {

            imagesref.current.forEach((image, index) => {
                if (index != 0) {
                    gsap.set(image, {
                        opacity: 0
                    });
                }
            })

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top 50%",
                    end: "top 0%",
                    scrub: true,
                }
            });

            imagesref.current.forEach((image, index) => {
                timeline.to(image, {
                    opacity: 1
                }, 0.5);
            })


        });
        return () => ctx.revert();
    }, [images]);
    return (
        <div ref={mainRef} className='h-[85dvh] w-full relative'>
            {images.slice(0, 2).map((image, index) => (
                <div key={index} className="w-full h-full ">
                    <Image ref={el => { if (el) imagesref.current[index] = el; }} fill src={image?.imageUrl} alt={image?.caption || "gallery"} className="object-cover" />
                </div>
            ))}
        </div>
    )
}
