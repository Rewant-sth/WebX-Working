"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Brain, BrainCog } from "lucide-react";
import AnimatedSection from "./text-fadein";

const features = [
  {
    id: 1,
    icon: BrainCog,
    title: "Unmatched Safety and Local Expertise",
    description:
      "Our experienced guides ensure your safety while sharing authentic local knowledge throughout the journey.",
    image:
      "https://static.vecteezy.com/system/resources/previews/022/347/551/non_2x/technology-security-shield-logo-3d-icon-of-checkmark-vpn-symbol-digital-authentication-and-proxy-server-connection-illustration-virtual-private-network-password-protection-free-vector.jpg",
  },
  {
    id: 2,
    icon: BrainCog,
    title: "Transparent Pricing, No Hidden Costs",
    description:
      "Get instant, accurate help from experts—whether it's for coding or understanding tough concepts. They are trained on their expertise.",
    image: "/iceberg.png"
  },
  {
    id: 3,
    icon: Brain,
    title: "Quality Service, Personalized Journeys",
    description:
      "Every trip is tailored to your interests with top-tier support from planning to your safe return.",
    image:
      "https://cdn3d.iconscout.com/3d/premium/thumb/international-journey-3d-icon-download-in-png-blend-fbx-gltf-file-formats--world-logo-trip-tour-flight-travel-agency-pack-holidays-icons-5967349.png",
  },
];

const DemoOne = () => {
  return (
    <Features
      primaryColor="blue-500"
      progressGradientLight="bg-gradient-to-r from-blue-400 to-blue-500"
      progressGradientDark="bg-gradient-to-r from-blue-300 to-blue-400"
      features={features}
    />
  );
};

export default DemoOne;

interface FeaturesProps {
  features: {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    image: string;
  }[];
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
}

export function Features({
  features,
  primaryColor,
  progressGradientLight,
  progressGradientDark,
}: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left:
          activeFeatureElement.offsetLeft -
          (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div className="min-h-screen py-16 px-4 lg:px-20">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-6xl text-[#1F2937] font-bold text-center mb-4">
              Why Choose RealHimalaya?
            </h2>
          </AnimatedSection>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Features (1/3 on large screens) */}
          <div
            ref={containerRef}
            className="w-full lg:w-1/3 flex flex-col gap-6 order-2 lg:order-1 no-scrollbar scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer"
                  onClick={() => handleFeatureClick(index)}
                >
                  <div
                    className={`flex flex-row justify-start items-center border border-black/5 rounded-sm p-4 md:p-6 transition-all duration-300 ${isActive
                      ? "bg-white dark:bg-black/5 dark:drop-shadow-lg rounded-xl md:border dark:border-none border-zinc-200"
                      : ""
                      }`}
                  >
                    {/* Icon */}
                    <div
                      className={`p-3 hidden md:block mr-4 flex-shrink-0  rounded-full transition-all duration-300 ${isActive
                        ? `bg-blue-500 text-white`
                        : `bg-blue-500/10 dark:bg-zinc-200/80 text-blue-500`
                        }`}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 text-zinc-900">
                        {feature.title}
                      </h3>
                      <p
                        className={`transition-colors duration-300 text-sm ${isActive
                          ? "text-zinc-600"
                          : "text-zinc-500 dark:text-zinc-400"
                          }`}
                      >
                        {feature.description}
                      </p>
                      <div className="mt-4 bg-white dark:bg-black/20 rounded-sm h-1 overflow-hidden">
                        {isActive && (
                          <motion.div
                            className={`h-full ${progressGradientLight} dark:${progressGradientDark}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Image (hidden on small, 1/2 width on large) */}
          <div className="hidden lg:flex w-1/2 justify-end items-center order-1 lg:order-2">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <img
                className="rounded-2xl max-h-[40rem] object-contain border dark:border-none border-zinc-50"
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
                width={600}
                height={400}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
