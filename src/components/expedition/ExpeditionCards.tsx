"use client";

import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { ITravelPackage } from "@/types/IPackages";
import Link from "next/link";
import AnimatedSection from "../common/text-fadein";
import CardSkeleton from "../common/card-skeleton";
import { setPackage } from "@/store/booking-store";

const ExpeditionCards = ({
  data,
  isLoading,
  number,
}: {
  data: ITravelPackage[];
  isLoading: boolean;
  number: number;
}) => {
  return (
    <div className="w-full sm:mt-12 relative overflow-hidden">
      <AnimatedSection>
        <h2 className="text-4xl capitalize sm:text-6xl text-[#1F2937] font-bold text-left mb-4">
          Popular Expedition places in Nepal
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <p className="text-zinc-600 text-xl max-w-2xl ">
          Discover our most popular treks and adventures that await you around
          the world
        </p>
      </AnimatedSection>

      <div className="py-8"></div>

      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <CardSkeleton idx={idx + 99} key={idx} />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
          {data?.slice(0, number).map((data, idx) => (
            <div className="relative z-0" key={idx}>
              <div className="w-full rounded-2xl box overflow-hidden aspect-video relative">
                {data?.fixedDates.length !== 0 && (
                  <div className="absolute scale-115 right-0 top-0 h-16 w-20">
                    <div className="absolute transform rotate-45 bg-blue-500 text-center text-white font-semibold py-1.5 right-[-35px] top-[36px] w-[190px]">
                      Booking Open
                    </div>
                  </div>
                )}

                <div className="absolute top-2 left-2 z-[60]">
                  {data?.fixedDates.length !== 0 && (
                    <div className="px-3 py-1 bg-white text-lg rounded-full text-full overflow-hidden  w-fit text-blue-600 ">
                      <span className="text-2xl font-semibold">
                        ${data?.fixedDates[0]?.pricePerPerson}
                      </span>
                      /Person
                    </div>
                  )}
                </div>
                <img
                  alt="trek image"
                  src={data.coverImage}
                  className="-z-20 object-cover object-center h-full w-full"
                />
              </div>
              <div className="">
                <h2 className="text-xl font-semibold py-2 pt-4">{data.name}</h2>
                <p
                  id="editor" dangerouslySetInnerHTML={{ __html: data.overview }}
                  className="line-clamp-2"
                ></p>
                <div className="flex mt-4 gap-4 lg:gap-6 items-center">
                  <Link
                    onClick={() => setPackage(data)}
                    href={`/booking/${data._id}`}
                  >
                    <button className="bg-blue-500 px-4 lg:px-6 py-1.5 sm:py-2.5 rounded-xl text-white sm:text-xl flex items-center gap-2">
                      <Calendar size={18} /> Book Now
                    </button>
                  </Link>
                  <Link href={`/itinerary/${data.slug}`}>
                    <button className="flex gap-2 items-center sm:text-xl hover:text-blue-600">
                      View Details <ArrowRight size={18} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ExpeditionCards;