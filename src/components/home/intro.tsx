"use client"
import { Camera } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function Intro() {

    // Counter component for animated numbers
    const Counter = ({ target, suffix = "+" }: { target: number; suffix?: string }) => {
        const [count, setCount] = useState(0);
        const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

        useEffect(() => {
            if (!inView) return;

            const duration = 2000; // 2 seconds animation
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentCount = Math.floor(progress * target);

                setCount(prev => (prev !== currentCount ? currentCount : prev));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [inView, target]);

        return (
            <motion.p
                ref={ref}
                className='text-2xl md:text-5xl font-semibold'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {count}{suffix}
            </motion.p>
        );
    };

    return (
        <section className="min-h-screen flex justify-center items-center h-full relative  snap-start px-6 ">



            <div
                className='grid lg:grid-cols-5 max-w- mx-auto py-20 '
            >
                <div className="w-full md:max-w-2xl  flex flex-col gap-6 md:gap-12 items-start col-span-2 h-fit lg:sticky top-28">
                    <div className="max-w-2xl w-full md:space-y-1.5 text-2xl md:text-4xl xl:text-5xl uppercase font-semibold">
                        <h2 className='bg-white w-fit  rounded-sm py-1 ' >Who we are </h2>
                        <h2 className='bg-white w-fit rounded-sm py-1 ' >and <span className='bg-orange-500 px-2 text-white'>what we do</span></h2>
                    </div>
                    <Link href="/about-us" className='mt-4'>
                        <button className='flex w-fit h-fit font-semibold gap-2 items-center'>
                            <span className='bg-amber-600 flex justify-center items-center text-white size-14 rounded-full'>
                                <Icon icon={"humbleicons:info"} className='text-4xl' />
                            </span>
                            <span className='text-left  leading-4 uppercase'>Learn <br /> More</span>
                        </button>
                    </Link>
                </div>
                <div className="pt-6 col-span-3 md:pt-2 lg:pt-0 space-y-5">
                    <p
                        className='md:text-2xl'>
                        <span className="text-orange-400 font-semibold">Real Himalaya</span> is a trusted Nepal trekking company founded by veteran mountaineers and local travel experts. With years of experience in guiding expeditions across the Himalayas, we are committed to offering authentic, safe, and life-changing journeys. Our roots in Nepalese culture give us a unique perspective, allowing us to share not only the breathtaking landscapes but also the traditions, spirituality, and hospitality of the mountain communities.                    </p>
                    <p className='md:text-2xl pt-5'>
                        We specialize in <strong className='text-orange-400'>Himalayan treks, climbing expeditions, and cultural tours</strong> tailored to every type of traveler. From world-famous adventures like the <b className='text-orange-400'>Everest Base Camp trek, Annapurna Circuit, and Gokyo Lakes</b> trek to hidden gems such as Manaslu and Nar Phu Valley, we design journeys that balance challenge, discovery, and comfort. <strong>Our strength lies in crafting personalized itineraries and flexible trip plans that fit each traveler’s needs and aspirations.</strong> We provide complete trekking support including permits, logistics, guides, porters, and safety protocols, ensuring a seamless and unforgettable Himalayan experience. Whether you’re seeking your first trek in Nepal or aiming for high-altitude expeditions, Real Himalaya is here to turn your Himalayan dream into reality.
                    </p>



                    <div
                        className="grid grid-cols-3 mt-16  gap-4"
                    >
                        <div className="w-fit text-center">
                            <h2 className='lg:text-lg'>Our Experience</h2>
                            <Counter target={16} />
                        </div>
                        <div className="w-fit text-center">
                            <h2 className='lg:text-lg'>Successful Tours</h2>
                            <Counter target={200} />
                        </div>
                        <div className="w-fit text-center">
                            <h2 className='lg:text-lg'>Happy Clients</h2>
                            <Counter target={1500} />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
