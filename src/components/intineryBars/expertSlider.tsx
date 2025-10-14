'use client';

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
            <div className="hidden md:block bg-orange-100 rounded-2xl shadow-md p-6 w-full max-w-2xl mx-auto text-center">
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
                                className={`relative cursor-pointer  ${i == currentIndex ? "z-[999]" : "z-10"}`}
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
                <div className="text-center mb-5">
                    <p className="text-orange-500 font-semibold flex text-lg items-center justify-center gap-1">
                        {currentExpert.name}
                    </p>

                    <Link href={`https://wa.me/${currentExpert.phone.replace(/\D/g, '')}`} className='flex mt-2 gap-2 items-center justify-center' target='_blank'>
                        <span><svg xmlns="http://www.w3.org/2000/svg" className='size-7' viewBox="0 0 256 258"><defs><linearGradient id="SVGBRLHCcSy" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#1faf38"></stop><stop offset="100%" stopColor="#60d669"></stop></linearGradient><linearGradient id="SVGHW6lecxh" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#f9f9f9"></stop><stop offset="100%" stopColor="#fff"></stop></linearGradient></defs><path fill="url(#SVGBRLHCcSy)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"></path><path fill="url(#SVGHW6lecxh)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"></path><path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"></path></svg></span> {currentExpert.phone}
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
