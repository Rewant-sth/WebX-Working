'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const expertData = [
    {
        id: 1,
        name: 'Gokul Thapa',
        country: 'Nepal',
        flag: '🇨🇭',
        whatsapp: "https://wa.me/+977-9851026840",
        image: '/Avtar/gokulthapa.jpeg',
        phone: '+977-9851026840'
    },
    {
        id: 2,
        name: 'Dyaula Sherpa',
        country: 'Nepal',
        flag: '🇳🇵',
        whatsapp: "https://wa.me/+977-9841240412",
        image: '/Avtar/dyaula.jpg',
        phone: '+977-9841240412'
    }
];

export default function ExpertCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Auto-advance carousel
    // useEffect(() => {
    //     if (isPaused) return;
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prevIndex) => (prevIndex + 1) % expertData.length);
    //     }, 3000);
    //     return () => clearInterval(interval);
    // }, [isPaused]);

    // Touch handling for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            setCurrentIndex((prev) => (prev + 1) % expertData.length);
        }
        if (touchStart - touchEnd < -50) {
            setCurrentIndex((prev) => (prev - 1 + expertData.length) % expertData.length);
        }
    };

    // Determine which experts are visible (previous, current, next)
    const getVisibleExperts = () => {
        const prevIndex = (currentIndex - 1 + expertData.length) % expertData.length;
        const nextIndex = (currentIndex + 1) % expertData.length;
        return [
            { ...expertData[prevIndex], position: 'left' },
            { ...expertData[currentIndex], position: 'center' },
            { ...expertData[nextIndex], position: 'right' }
        ];
    };

    const visibleExperts = getVisibleExperts();
    const currentExpert = expertData[currentIndex];

    if (!(expertData.length > 2)) {
        return (
            <div className=" bg-orange-100 rounded-2xl shadow-sm p-4 w-full max-w-2xl mx-auto text-center">
                <h3 className="text-xl font-bold text-zinc-900 mb-4">Speak to an Expert</h3>

                {/* Carousel */}
                <div
                    className="relative py-2 w-full mb-6 overflow-visible"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="flex justify-center items-center -space-x-4">
                        {expertData.map((expert, i) => (
                            <div
                                key={`${expert.id}`}
                                onClick={() => setCurrentIndex(i)}
                                className={`relative cursor-pointer  ${i == currentIndex ? "z-[999] scale-125" : "z-10"}`}
                            >
                                <img
                                    src={expert.image}
                                    alt={expert.country}
                                    className={`rounded-full border-3  transition-all duration-300 ${i == currentIndex ? "border-orange-500" : "border-white hover:opacity-80"} object-cover object-center size-14 lg:size-20`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expert Location */}
                <div className="text-center mb-2">
                    <p className="text-orange-500 font-semibold flex text-lg items-center justify-center gap-1">
                        {currentExpert.name}
                    </p>
                    <Link href={`https://wa.me/${currentExpert.phone.replace(/\D/g, '')}`} className='flex mt-2 gap-2 items-center justify-center' target='_blank'>
                        <span><Image src="/icons/whatsapp.png" height={20} width={20} alt="WhatsApp" className="size-8" /></span> {currentExpert.phone}
                    </Link>
                </div>

            </div>
        );
    }

    return (
        <div className="hidden md:block bg-orange-100 rounded-2xl shadow-md p-6 w-full max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Speak to an Expert</h3>

            {/* Carousel */}
            <div
                className="relative py-2 w-full mb-6 overflow-visible"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="flex justify-center items-center -space-x-4">
                    {visibleExperts.map((expert) => (
                        <div
                            key={`${expert.id}-${expert.position}`}
                            className={`relative transition-all duration-500 ${expert.position === 'center'
                                ? 'z-20 scale-110'
                                : 'z-10 opacity-80 scale-90'
                                }`}
                        >
                            <img
                                src={expert.image}
                                alt={expert.country}
                                className={`rounded-full border object-cover object-center ${expert.position === 'center'
                                    ? 'w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-lg'
                                    : 'w-14 h-14 md:w-16 md:h-16 border-2 border-white'
                                    }`}
                            />

                        </div>
                    ))}
                </div>
            </div>

            {/* Expert Location */}
            <div className="text-center mb-5">
                <p className="text-orange-500 font-semibold flex items-center justify-center gap-1">
                    {currentExpert.name}
                </p>

                <Link href={`https://wa.me/${currentExpert.phone.replace(/\D/g, '')}`}>
                    WhatsApp: {currentExpert.phone}
                </Link>
            </div>

        </div>
    );
}
