"use client";

import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getPackagesByCategory, getSubpackagesBySlug } from "@/service/packages";
import Link from "next/link";
import { useBookingStore } from "@/store/booking-store";
import { ITravelPackage } from "@/types/IPackages";

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
    queryFn: () => getSubpackagesBySlug(category),
  });

  const { setPackage } = useBookingStore()

  return (
    <div className="">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl text-orange-500 text-left ">
            <span className="w-fit  font-semibold">
              Related Trips
            </span>
          </h2>
          <p className="text-zinc-600 mt-1 leading-relaxed max-w-2xl">
            Adventures that might interest you on your next journey.
          </p>
        </div>
        <Link
          href={`/package-list/${category}`}
          className="inline-flex items-center font-medium transition-colors duration-200 hover:underline"
          style={{ color: '#01283F' }}
        >
          View all  <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-6">
        {data?.data?.slice(0, 4).map((trip, index) => {
          if (trip._id !== packageId) {
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
                <div className="p-3">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl truncate font-bold text-gray-800 leading-tight flex-1 mr-3" style={{ color: '#3A3A3A' }}>
                      {trip.name}
                    </h3>
                  </div>

                  <p
                    id="editor" dangerouslySetInnerHTML={{ __html: trip.overview }}
                    className="text-gray-600 mb-4 line-clamp-2 leading-relaxed"
                  />

                  {(
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-sm text-gray-500 block">Starting From</span>
                        {
                          trip.fixedDates.length > 0 ?
                            (<span className="text-2xl font-bold" style={{ color: '#01283F' }}>
                              ${trip.fixedDates[0]?.pricePerPerson || "-"}
                            </span>) :
                            (
                              <h2>Pricing coming soon</h2>
                            )}
                      </div>
                    </div>
                  )
                  }

                  <div className="flex gap-3">
                    <Link onClick={() => setPackage(trip as ITravelPackage)} href={`/booking/${trip._id}`} className="flex-1">
                      <button
                        className="w-full flex gap-2 items-center text-sm justify-center text-white py-2.5 px-4 rounded-sm font-semibold transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: '#01283F' }}
                      >
                        <Calendar size={18} /> Book Now
                      </button>
                    </Link>

                    <Link href={`/itinerary/${trip.slug}`} className="flex-1">
                      <button
                        className="w-full flex gap-2 text-sm items-center justify-center py-2 px-4 rounded-sm font-semibold border-2 transition-all duration-300 hover:text-white"
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
                        Itienary <ArrowRight size={18} className="translate-y-0.5" />
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
