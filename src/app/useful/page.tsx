"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { getUsefulInfo } from "@/service/useful-info";
import { useQuery } from "@tanstack/react-query";
import EssentialInfoSkeleton from "./_components/Skeleton";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TrekkingGear() {
  const { data: usefulInfo, isLoading } = useQuery({
    queryKey: ["usefulInfo"],
    queryFn: getUsefulInfo,
  });
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollLockRef = useRef(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const observerOptions = useMemo(
    () => ({
      root: null,
      threshold: 0.5,
      rootMargin: "-20% 0px -40% 0px",
    }),
    []
  );

  const unlockScrollLock = () => {
    let start = performance.now();
    const unlock = () => {
      if (performance.now() - start > 600) {
        scrollLockRef.current = false;
      } else {
        requestAnimationFrame(unlock);
      }
    };
    requestAnimationFrame(unlock);
  };

  // Set initial active tab and scroll to it
  useEffect(() => {
    if (usefulInfo?.length) {
      const firstId = usefulInfo[0]._id;
      setActiveItem(firstId);
      setTimeout(() => {
        const el = contentRefs.current[firstId];
        if (el) {
          scrollLockRef.current = true;
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          unlockScrollLock();
        }
      }, 300);
    }
  }, [usefulInfo]);

  useEffect(() => {
    if (!usefulInfo?.length) return;
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;

      const centerY = window.innerHeight / 2;
      const closest = visible.reduce((a, b) =>
        Math.abs(a.boundingClientRect.top - centerY) <
          Math.abs(b.boundingClientRect.top - centerY)
          ? a
          : b
      );

      if (!scrollLockRef.current && closest?.target?.id !== activeItem) {
        setActiveItem(closest.target.id);
      }
    }, observerOptions);

    Object.values(contentRefs.current).forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [usefulInfo, observerOptions, activeItem]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToItem = (id: string) => {
    const el = contentRefs.current[id];
    if (el) {
      scrollLockRef.current = true;
      setActiveItem(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      unlockScrollLock();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <EssentialInfoSkeleton />;

  return (
    <section className="bg-gradient-to-b from-blue-50 to-transparent min-h-screen py-12 px-4 sm:px-6 lg:px-20 mt-[55px] relative">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-500">
            Essential Travel Information
          </h1>
          <p className="mt-4 text-blue-800 max-w-3xl mx-auto text-lg md:text-xl">
            Get important insights before your next adventure.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/3 w-full">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28">
              <h2 className="text-xl font-bold text-blue-400 mb-4 border-b pb-2">
                Information Topics
              </h2>
              <ul className="space-y-2">
                {usefulInfo?.map((item) => (
                  <motion.li
                    key={item._id}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <button
                      onClick={() => scrollToItem(item._id)}
                      className={`w-full text-left px-4 py-3 rounded-sm flex items-start group transition-all ${activeItem === item._id
                        ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                        : "hover:bg-blue-100 text-blue-900"
                        }`}
                    >
                      <span className="flex-1 font-medium">{item.name}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${activeItem === item._id
                          ? "rotate-90 text-blue-100"
                          : "text-blue-400 group-hover:text-blue-600"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:w-2/3 w-full bg-white rounded-xl p-6 md:p-8">
            {usefulInfo?.map((item) => (
              <article
                key={item._id}
                id={item._id}
                ref={(el) => {
                  contentRefs.current[item._id] = el as HTMLDivElement;
                }}
                className={`mb-12 pb-12 min-h-[300px] scroll-mt-28 transition-opacity duration-300 ${activeItem === item._id
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-90"
                  }`}
              >
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  {item.name}
                </h2>
                <div className="prose prose-blue max-w-none text-blue-800">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        item.description || "<p>No information available.</p>",
                    }}
                  />
                  <div className="mt-4 w-full rounded-sm">
                    <Image
                      src={item.image || "/placeholder.webp"}
                      alt={item.name || "useful"}
                      width={500}
                      height={500}
                      className="w-full object-contain rounded-sm"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Back to top"
        >
          <div className="bg-red-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-xl transition-all group-hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z"
              />
            </svg>
          </div>
        </button>
      )}
    </section>
  );
}
