import React from "react";

const ExpertSkeleton = () => {
  return (
    <>
      <section className="py-8 mx-auto max-w-6xl">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 text-center">
            Talk to Our Experts
          </h2>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-2 lg:gap-4 items-center p-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-sm animate-pulse"
              >
                <div>
                  <div className="size-32 shrink-0 lg:size-32 rounded-full bg-white/30" />
                </div>
                <div className="flex flex-col flex-1 space-y-2">
                  <div className="h-4 w-32 bg-white/30 rounded" />
                  <div className="h-4 w-24 bg-white/30 rounded" />
                  <div className="flex gap-6 mt-4">
                    <div className="h-6 w-6 bg-white/30 rounded-full" />
                    <div className="h-6 w-6 bg-white/30 rounded-full" />
                    <div className="h-6 w-6 bg-white/30 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpertSkeleton;
