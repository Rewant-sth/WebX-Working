"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Snowflake {
  left: number;
  top: number;
  fontSize: number;
  xOffset: number;
  duration: number;
  delay: number;
}

const OurStory = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Generate snowflakes only on client side
    setSnowflakes(
      Array.from({ length: 60 }).map((_, index) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        fontSize: Math.random() * 10 + 10,
        xOffset: Math.random() * 20 - 10,
        duration: Math.random() * 5 + 5,
        delay: index * 0.2, // staggered snowflakes
      }))
    );
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 200], [0, -30]);
  const y2 = useTransform(scrollY, [0, 200], [0, -60]);



  return (
    <section className="relative w-full md:h-screen mt-[20vh] overflow-hidden">
      <div className="absolute bottom-0 h-96 left-0 right-0 bg-gradient-to-t from-blue-100 to-transparent z-10"></div>
      {/* Background with zoom-in effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/ourstory.jpg')" }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-white via-white/70 to-transparent z-10" />

      {/* Snowflakes - Only render on client side */}
      {isMounted && (
        <div className="pointer-events-none">
          {snowflakes.map((flake, index) => (
            <motion.span
              key={index}
              initial={{ y: -flake.top, opacity: 0 }}
              animate={{
                y: "100vh",
                x: [0, flake.xOffset, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: flake.duration,
                repeat: Infinity,
                delay: flake.delay,
                ease: "easeInOut",
              }}
              className="absolute text-white select-none"
              style={{
                left: `${flake.left}%`,
                fontSize: `${flake.fontSize}px`,
                top: 0,
              }}
            >
              ❄
            </motion.span>
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        style={{ y: y1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="px-4 sm:px-8  pt-25 text-center relative z-30"
      >
        <motion.div style={{ y: y2 }} className="max-w-4xl mx-auto mb-96">
          <motion.h3
            className="text-4xl sm:text-4xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-lg mb-6 relative"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="inline-block text-blue-600">Our Story</span>
            <motion.svg
              className="absolute bottom-[-10px] left-0 w-full h-2"
              viewBox="0 0 100 10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <path
                d="M0,5 Q25,0 50,5 T100,5"
                fill="none"
                stroke="#d4f4ff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.h3>

          <motion.p
            className="text-lg sm:text-2xl text-black text-center leading-relaxed mb-8 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            For over 15 years, we've been guiding adventurers through the
            world's most breathtaking mountain landscapes. But we're more than
            just a trek agency – we're storytellers, guardians of the wild, and
            architects of transformative experiences that reconnect people with
            nature and themselves.
          </motion.p>

          <motion.div
            className="flex -mt-10 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-lg italic  bg-blue-50 px-4 text-blue-500  ">
              "The mountains are calling and I must go."
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurStory;
