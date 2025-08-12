"use client";

import React from "react";

const UsefulInfoSkeleton = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-transparent min-h-screen py-12 px-4 sm:px-6 lg:px-20 mt-[55px] relative">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-12">
          <div className="h-10 w-3/4 mx-auto bg-blue-200 rounded animate-pulse mb-4" />
          <div className="h-6 w-2/3 mx-auto bg-blue-100 rounded animate-pulse" />
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <aside className="lg:w-1/3 w-full">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28">
              <div className="h-6 w-1/2 bg-blue-300 rounded mb-4 animate-pulse" />
              <ul className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={index}>
                    <div className="h-10 bg-blue-100 rounded-sm animate-pulse" />
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content Skeleton */}
          <div className="lg:w-2/3 w-full bg-white rounded-xl p-6 md:p-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="mb-12 pb-12 min-h-[300px] scroll-mt-28 opacity-80"
              >
                <div className="h-8 w-2/3 bg-blue-200 rounded mb-4 animate-pulse" />
                <div className="space-y-3 mb-4">
                  <div className="h-4 w-full bg-blue-100 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-blue-100 rounded animate-pulse" />
                  <div className="h-4 w-10/12 bg-blue-100 rounded animate-pulse" />
                </div>
                <div className="w-36 h-36 bg-blue-100 rounded-sm animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsefulInfoSkeleton;
