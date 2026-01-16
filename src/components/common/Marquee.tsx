"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";

export default function ScrollingBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  
  // Function to animate
  const startAnimation = () => {
    const scrollWidth = containerRef.current?.scrollWidth || 0;
    const viewportWidth = window.innerWidth;

    controls.start({
      x: [-viewportWidth / 4, -scrollWidth / 2],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    });
  };

  // Setup on mount & resize
  useEffect(() => {
    if (!containerRef.current) return;
    startAnimation();

    const handleResize = () => {
      controls.stop(); // Stop before restarting on resize
      startAnimation();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [controls]);

  // Pause/resume handlers
  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    startAnimation();
  };

  return (
    <div
      title="view event"
      aria-label="view event"
      className="w-full overflow-hidden bg-black relative py-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={"/event"}>
        <motion.div
          ref={containerRef}
          className="flex whitespace-nowrap"
          animate={controls}
        >
          {[1, 2, 3, 4].map((_, index) => (
            <p
              key={index}
              className="font-bold uppercase text-white text-xl md:text-3xl lg:text-5xl xl:text-7xl tracking-wider mr-4 md:mr-8"
            >
              Initiative for global solidarity on climate justice
            </p>
          ))}
        </motion.div>
      </Link>
    </div>
  );
}
