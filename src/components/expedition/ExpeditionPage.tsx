"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ITravelPackage, ITravelPackageResponse } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

function TrekPage() {
  const [expeditionPackages, setExpeditionPackages] = useState<ITravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Direct fetch API implementation
  const fetchExpeditionPackages = async () => {
    try {
      setLoading(true);
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!baseURL) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(`${baseURL}/package/category/expedition`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ITravelPackageResponse = await response.json();
      setExpeditionPackages(data.data || []);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch expedition packages';
      setError(errorMessage);
      console.error('Error fetching expedition packages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpeditionPackages();
  }, []);

  if (loading) {
    return (
      <section className="h-full space-y-3 py-24 max-w-7xl mx-auto snap-start relative">
        <h2 className="text-4xl text-center font-semibold">
          <span className="bg-orange-500 px-2 text-white">Beyond</span> The Summit
        </h2>
        <p className="text-lg max-w-xl text-center mx-auto">
          Loading expedition packages...
        </p>
        <div className="mt-10 grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-sm overflow-hidden bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="h-full space-y-3 py-24 max-w-7xl mx-auto snap-start relative">
        <h2 className="text-4xl text-center font-semibold">
          <span className="bg-orange-500 px-2 text-white">Beyond</span> The Summit
        </h2>
        <p className="text-lg max-w-xl text-center mx-auto text-red-600">
          Error: {error}
        </p>
      </section>
    );
  }

  return (
    <section
      className=" h-full space-y-3 py-24 p-4 sm:p-6 mx-auto snap-start relative"
    >
      <h2 className="text-4xl text-center font-semibold">
        <span className="bg-orange-500 px-2 text-white">Beyond</span>  The Summit
      </h2>
      <p className="text-lg max-w-xl text-center mx-auto">
        Journeys that transcend time — crafted to create memories that last forever.
      </p>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-3">
        {expeditionPackages.length > 0 ? (
          expeditionPackages.map((pkg, index) => (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              viewport={{ once: true }}
              key={pkg._id || index}
              className="relative group cursor-pointer rounded-sm overflow-hidden aspect-square"
            >
              <Image
                src={pkg.coverImage || "/placeholder.webp"}
                alt={pkg.name}
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
                  <h2 className="text-2xl font-semibold">{pkg.name}</h2>
                  <div className="mt-2 flex gap-4 text-sm opacity-90">
                    <span className="flex gap-2 items-center"><Icon icon={"material-symbols-light:distance-rounded"} className="text-lg" /> {pkg.distance} KM</span>
                    <span className="flex gap-2 items-center"><Icon icon={"famicons:timer"} className="text-lg" /> {pkg.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-lg text-gray-600">No expedition packages available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TrekPage;
