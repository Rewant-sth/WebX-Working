"use client";

import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSubpackagesBySlug } from "@/service/packages";
import Link from "next/link";

const RelatedTrips = ({
  subCategory,
  category,
  packageId
}: {
  subCategory: string;
  category: string;
  packageId: string
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getrelated"],
    queryFn: () => getSubpackagesBySlug(subCategory),
  });

  return (
    <div className="border-b border-gray-200 mb-8 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-semibold" style={{ color: '#3A3A3A' }}>
          Related Trips
        </h2>
        <Link
          href={`/package-list/${category}`}
          className="inline-flex items-center font-medium transition-colors duration-200 hover:underline"
          style={{ color: '#f05e25' }}
        >
          View all related trips <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.data?.map((trip, index) => {
          if (trip.id !== packageId) {
            return (
              <div
                key={index}
                className="bg-white rounded-sm overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 group"
              >
                <div className="h-64 relative bg-gray-100 overflow-hidden">
                  <Image
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    src={trip.coverImage || "/placeholder.jpg"}
                    alt={trip.name}
                    fill
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight flex-1 mr-3" style={{ color: '#3A3A3A' }}>
                      {trip.name}
                    </h3>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#f05e25' }}>
                      {trip.duration} Days
                    </span>
                  </div>

                  <p
                    dangerouslySetInnerHTML={{ __html: trip.overview }}
                    className="text-gray-600 mb-4 line-clamp-2 leading-relaxed"
                  />

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-sm text-gray-500 block">Starting From</span>
                      <span className="text-2xl font-bold" style={{ color: '#f05e25' }}>
                        ${trip.fixedDates[0]?.pricePerPerson || "-"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/booking/${trip.id}`} className="flex-1">
                      <button
                        className="w-full flex gap-2 items-center justify-center text-white py-3 px-4 rounded-sm font-semibold transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: '#f05e25' }}
                      >
                        <Calendar size={18} /> Book Now
                      </button>
                    </Link>

                    <Link href={`/itinerary/${trip.slug}`} className="flex-1">
                      <button
                        className="w-full flex gap-2 items-center justify-center py-3 px-4 rounded-sm font-semibold border-2 transition-all duration-300 hover:text-white"
                        style={{
                          borderColor: '#3A3A3A',
                          color: '#3A3A3A'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3A3A3A';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#3A3A3A';
                        }}
                      >
                        View Details <ArrowRight size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default RelatedTrips;
