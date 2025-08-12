"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

function TrekPage() {




  return (
    <section
      className="min-h-screen h-full space-y-3 py-24 max-w-7xl mx-auto snap-start relative"
    >
      <h2 className="text-5xl font-semibold">
        <span className="bg-orange-500 px-2 text-white">Beyond</span>  The Summit
      </h2>
      <p className="text-xl max-w-xl">
        Journeys that transcend time — crafted to create memories that last forever.
      </p>

      <div className="mt-10 grid grid-cols-3 gap-3">
        {["/one.jpg", "/two.jpg", "/three.jpg"].map((src, index) => (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index}
            className="relative group cursor-pointer rounded-sm overflow-hidden aspect-square"
          >
            <Image
              src={src}
              alt={`Placeholder ${index}`}
              fill
              className="object-cover group-hover:blur-xs transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-between">
              <div className="flex justify-end items-center">
                <span className="flex size-10 transition-all duration-300 text-white group-hover:rotate-45 justify-center items-center rounded-full">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="text-white">
                <h2 className="text-4xl font-semibold">Mount Everest</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus, quia!
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TrekPage;
