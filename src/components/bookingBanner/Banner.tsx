"use client";

import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative w-full h-[44vh] ">
      {/* Background Image */}
      <Image
        src="/TrekImages/manaslu.png"
        alt="himal"
        className="absolute top-0 left-0 w-full h-full object-cover"
        priority
        width={1920}
        height={1080}
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-sky-400/40 opacity-50" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-6xl bg-blue-500 backdrop-blur-md text-white rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/TrekImages/logo.png"
              alt="treak logo images"
              className="h-6 sm:h-7 md:h-8"
              height={200}
              width={150}
            />
          </div>

          {/* Center: Booking Info */}
          <div className="text-center">
            <p className="text-lg sm:text-xl md:text-2xl font-bold">
              Book your trip
            </p>
            <p className="text-xs sm:text-sm">Experience the magic of Nepal</p>
          </div>

          {/* Right: CTA */}
          <div className="flex items-center space-x-2">
            <p className="text-xs sm:text-sm">Secure your booking now</p>
            <ShieldCheck className="text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
