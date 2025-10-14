"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      data: 16,
      title: "Years of Experiences",
      plus: <Plus className="w-6 h-6" />,
    },
    { data: 10000, title: "Happy Clients", plus: <Plus className="w-6 h-6" /> },
    { data: 7, title: "Countries", plus: <Plus className="w-6 h-6" /> },
    {
      data: 200,
      title: "Experienced Guides",
      plus: <Plus className="w-6 h-6" />,
    },
  ];

  const formatNumber = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M+";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K+";
    return n.toFixed(0) + "+";
  };

  const Counter = ({
    target,
    plus,
  }: {
    target: number;
    plus: React.ReactNode;
  }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    useEffect(() => {
      if (!inView) return;

      const duration = 2000;
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
      <div ref={ref} className="flex flex-col items-center relative z-10">
        <motion.h4
          className="text-4xl lg:text-5xl font-bold text-white will-change-transform"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {formatNumber(count)}
        </motion.h4>
      </div>
    );
  };

  return (
    <section className="pt-24 pb-4 lg:py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold capitalize mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Trusted by Thousands,
            </span>{" "}
            Guided by Experience
          </motion.h2>

          <motion.p
            className="text-xl text-zinc-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            With over a decade of excellence, happy clients from around the world, and expert guides on every journey — we turn adventures into lifelong memories.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
            hidden: {},
          }}
        >
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative p-8 lg:p-10 flex flex-col items-center justify-center text-center transition-all duration-300 will-change-transform bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl shadow-xl hover:shadow-2xl border border-blue-500/20 overflow-hidden group"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                <Counter target={item.data} plus={item.plus} />

                <motion.p
                  className="mt-4 lg:mt-6 text-lg lg:text-xl font-medium text-white/90 tracking-wide leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {item.title}
                </motion.p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-sm" />

            </motion.div>
          ))}
        </motion.div>

        {/* Floating dots */}
        <motion.div
          className="absolute top-1/3 left-10 w-6 h-6 rounded-full bg-blue-500 opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-20 w-4 h-4 rounded-full bg-cyan-500 opacity-30"
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </section>
  );
}