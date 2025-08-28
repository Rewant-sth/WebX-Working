"use client";

import Image from "next/image";
import { Quote, Mountain, Heart, Users, Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function MessageFromCEO() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/EVEREST REGION/NIKON D50001577.JPG"
                        alt="Himalayan landscape"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
                </div>

                {/* Content */}
                <div className={`relative z-10 max-w-6xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center">
                        <p className="text-orange-400 uppercase tracking-wider text-sm font-medium mb-4">Leadership Message</p>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                            A Message From
                            <span className="block font-medium text-orange-400 mt-2">
                                Our CEO
                            </span>
                        </h1>
                        <div className="w-16 h-0.5 bg-orange-500 mx-auto mt-8"></div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center">
                        <div className="w-0.5 h-3 bg-white/60 rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* CEO Message Section */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* CEO Image */}
                        <div className="">
                            <div className="relative">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src="/ceo.jpg"
                                        alt="CEO of Real Himalaya"
                                        width={500}
                                        height={600}
                                        className="object-cover w-full h-[600px] transition-transform duration-700 hover:scale-[1.02]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                </div>

                                {/* CEO Info Card */}
                                <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">Narbin Magar</h3>
                                    <p className="text-orange-600 font-medium mb-2">Founder & CEO</p>
                                    <p className="text-gray-600 text-sm">Leading Himalayan adventures since 2008</p>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Experience</p>
                                        <p className="text-sm text-gray-700 mt-1">15+ years in adventure tourism</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message Content */}
                        <div className=" space-y-8">
                            {/* Quote Section */}
                            <div className="relative">
                                <div className="absolute -left-4 -top-2 text-6xl text-orange-200 leading-none">"</div>
                                <blockquote className="text-2xl font-light text-gray-800 leading-relaxed italic ml-8 mb-8">
                                    The mountains have always been my greatest teacher, and sharing their lessons with travelers from around the world has become my life's purpose.
                                </blockquote>
                            </div>

                            {/* Main Message */}
                            <div className="prose prose-lg prose-gray max-w-none">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Welcome to Real Himalaya, where every journey is crafted with passion, authenticity, and deep respect for the magnificent landscapes we call home.
                                </p>

                                <p className="text-gray-700 leading-relaxed">
                                    For over 15 years, I've had the privilege of guiding adventurers through the most breathtaking trails in Nepal. From the towering peaks of Everest to the hidden valleys of Mustang, each expedition has reinforced my belief that travel has the power to transform lives.
                                </p>

                                <p className="text-gray-700 leading-relaxed">
                                    Our mission goes beyond just organizing treks. We're committed to sustainable tourism that benefits local communities, preserves our pristine environment, and creates meaningful connections between cultures. Every step you take with us contributes to the livelihood of local families and the conservation of our natural heritage.
                                </p>

                                <p className="text-gray-700 leading-relaxed">
                                    When you choose Real Himalaya, you're not just selecting a travel company – you're joining a family that values authenticity, safety, and unforgettable experiences. Our team of experienced guides, porters, and support staff are not just professionals; they're storytellers, guardians of tradition, and your companions on the journey of a lifetime.
                                </p>
                            </div>

                            {/* Signature */}
                            <div className="border-t border-gray-200 pt-8 mt-12">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-medium text-gray-900 mb-1">Narbin Magar</p>
                                        <p className="text-orange-600 font-medium">Founder & CEO, Real Himalaya</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <p>Kathmandu, Nepal</p>
                                        <p>August 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>            {/* Values Section */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-orange-600 uppercase tracking-wider text-sm font-medium mb-4">Our Foundation</p>
                        <h2 className="text-4xl font-light text-gray-900 mb-6">Core Values</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">The principles that guide every adventure and shape our commitment to excellence</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-orange-100">
                                <Heart className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-4">Authenticity</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every experience is genuine, showcasing the true spirit of Himalayan culture and hospitality through meaningful local connections.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-orange-100">
                                <Users className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-4">Community</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We believe in empowering local communities and creating sustainable tourism opportunities that benefit everyone.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-orange-100">
                                <Mountain className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-4">Excellence</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Safety, quality, and exceptional service are at the heart of everything we do, ensuring memorable experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-light text-gray-900 mb-6">
                        Ready for Your Himalayan Adventure?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Let us create an unforgettable journey tailored to your dreams and aspirations in the majestic Himalayas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors duration-200">
                            Plan Your Trek
                        </button>
                        <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-md font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
