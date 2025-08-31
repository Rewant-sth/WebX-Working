"use client"
import { Camera } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
                className='text-5xl font-semibold'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {count}{suffix}
            </motion.p>
        );
    };

    return (
        <section className="min-h-screen flex justify-center items-center h-full relative  snap-start px-4 md:px-0">



            <div
                className='grid lg:grid-cols-2 max-w-7xl mx-auto py-20 '
            >
                <div className="w-full max-w-2xl flex flex-col gap-6 md:gap-12 items-start ">
                    <div className="max-w-2xl w-full md:space-y-1.5 text-2xl md:text-4xl uppercase font-semibold">
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
                <div className="pt-6 md:pt-2 lg:pt-0 space-y-5">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className='md:text-2xl'>
                        We have developed interesting routes across <b>different continents</b>, countries, and places on the planet that will allow us to get to know the world closer.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='md:text-2xl'>
                        Team of professional guides and a support team with years of <u> experience</u> in traveling and climbing. Our guides will ensure the safety of the tour, will give you useful <u>knowledge and skills</u> for independent travel in the future.
                    </motion.p>


                    <motion.div
                        className="grid grid-cols-3 mt-16 text-center gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="">
                            <h2>Years of Experience</h2>
                            <Counter target={16} />
                        </div>
                        <div className="">
                            <h2>Successful Tours</h2>
                            <Counter target={200} />
                        </div>
                        <div className="">
                            <h2>Happy Clients</h2>
                            <Counter target={1500} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    )
}
