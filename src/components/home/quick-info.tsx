import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function QuickInfo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 w-full">
      <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-12 items-center">
        {/* Left Side Content */}
        <div className="space-y-6">
          <h2 className="text-6xl pb-12 text-left font-semibold max-w-xl leading-snug text-gray-900">
            <span className="bg-orange-500 text-white px-4">Understand</span>{" "}
            Tales of Real Himalaya{" "}
             <span className="bg-orange-500 text-white px-4">platforms</span>
          </h2>

          {/* Play button + text */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 rounded-full border flex items-center justify-center border-gray-900">
              <Play size={22} className="text-gray-900" />
            </div>
            <p className="uppercase tracking-wide text-sm font-semibold text-gray-900">
              Watch the video
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed max-w-md">
            Discover insider secrets, survival stories, and expert tips from
            seasoned mountaineers. Our curated collection of adventure guides
            will transform your next expedition into an unforgettable journey.
          </p>
        </div>

        {/* Right Side Custom Layout */}
        <div className="flex col-span-2 gap-4 w-full">
          {/* Column 1 → 1 card */}
          <div className="flex flex-col gap-4 flex-1 justify-end">
            <div className="relative w-full h-48 overflow-hidden rounded-lg group">
              <Image
                src="/three.jpg"
                alt="Thumbnail"
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Play size={28} className="text-white" />
              </div>
            </div>
          </div>

          {/* Column 2 → 2 cards */}
          <div className="flex flex-col gap-4 flex-1 justify-end">
            {[...Array(2)].map((_, idx) => (
              <div
                key={idx}
                className="relative w-full h-48 overflow-hidden rounded-lg group"
              >
                <Image
                  src="/three.jpg"
                  alt="Thumbnail"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play size={28} className="text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 → 3 cards */}
          <div className="flex flex-col gap-4 flex-1">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="relative w-full h-32 md:h-40 lg:h-48 overflow-hidden rounded-lg group"
              >
                <Image
                  src="/three.jpg"
                  alt="Thumbnail"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play size={28} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
