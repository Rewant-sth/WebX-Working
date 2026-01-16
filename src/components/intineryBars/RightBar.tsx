"use client";

import { useState, useRef } from "react";
import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ExpertCard from "./expertSlider";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/booking-store";
import { GeneratePdf } from "./generate-pdf";

const RightBar = ({ data, onShowContact }: { data: ITravelPackage | undefined, onShowContact: () => void }) => {
  const [showPaxDropdown, setShowPaxDropdown] = useState(true);
  const [, setHovered] = useState<"date" | "enquiry" | "download" | "booking" | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setPackage, setSelectedFixedDateId, setArrivalDate, setDepartureDate } = useBookingStore();

  const scrollToDateSection = () => {
    const element = document.getElementById("date-&-prices");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookNow = () => {
    if (!data) return;

    // If there are fixed dates, use the first available one
    if (data.fixedDates && data.fixedDates.length > 0) {
      const firstAvailableDate = data.fixedDates.find(
        (date) => date.status?.toLowerCase() === 'open' && (date.availableSeats || 0) > 0
      ) || data.fixedDates[0]; // Fallback to first date if none are available

      // Set booking store data
      setPackage(data);
      setSelectedFixedDateId(firstAvailableDate._id);

      // Set arrival and departure dates
      const arrival = new Date(firstAvailableDate.startDate);
      const departure = new Date(firstAvailableDate.endDate);
      setArrivalDate(new Date(arrival.getFullYear(), arrival.getMonth(), arrival.getDate()));
      setDepartureDate(new Date(departure.getFullYear(), departure.getMonth(), departure.getDate()));



      // Navigate to booking page
      router.push(`/booking/${data._id}`);
    }
  };

  return (
    <>
      <div className="  rounded-sm md:grid sm:grid-cols-2 gap-4 lg:gap-0 lg:mt-4 lg:grid-cols-1  space-y-4    h-fit">

        <div className="md:bg-orange-100 md:rounded-2xl md:shadow">
          {/* Header */}
          <div className="sm:px-6 py-5 border-b border-zinc-300" >
            {data?.name && (
              <p className="text-center text-2xl lg:text-lg font-semibold  leading-tight">
                {data.name}
              </p>
            )}
          </div>

          {/* Price Section */}
          <div className="sm:px-4 mt-4 md:mt-0 py-2 ">
            {
              data?.fixedDates.length !== undefined && data?.fixedDates.length > 0 && (
                <div className="text-center  mb-4">
                  <div className="flex lg:flex-col justify-center items-center gap-2 2xl:flex-row  mb-3">
                    <span className="text-  font-semibold" >Starting Price   </span>
                    <span className="text-2xl font-medium text-[#f05e25]"> US$ {data?.fixedDates[0]?.pricePerPerson || "N/A"}/<span className="text-xl">person</span></span>
                  </div>
                </div>
              )
            }

            {/* Pax Details Dropdown */}
            {data?.pax && data.pax.length > 0 && (
              <div className="mb-4 ">
                <button
                  onClick={() => setShowPaxDropdown(!showPaxDropdown)}
                  className="w-full  flex items-center justify-between rounded-sm   transition-colors duration-200"
                >
                  <span className="font-medium text-zinc-700">Group Booking Price</span>
                  <Icon
                    icon={showPaxDropdown ? "mdi:chevron-up" : "mdi:chevron-down"}
                    width="20"
                    height="20"
                    className=""
                  />
                </button>

                {(
                  <div className={` transition-transform  overflow-hidden ${showPaxDropdown ? 'h-full' : 'h-0'} `}>

                    <div className="mt-4 bg-orange-200 p-4">
                      <div className="flex justify-between items-center border-b pb-2 border-orange-500">
                        <h2 className="font-semibold text-orange-500">Group Size</h2>
                        <h2 className="font-semibold text-orange-500">Price/Per Person</h2>
                      </div>
                      {data.pax
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((paxItem, index) => (
                          <div
                            key={paxItem._id}
                            className={`py-2 ${index !== data.pax.length - 1 ? 'border-b border-zinc-100' : ''}  transition-colors duration-150`}
                          >
                            <div className="flex gap-2  items-center">
                              <div className="flex shrink-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm text-zinc-800">
                                    {paxItem.min === paxItem.max
                                      ? `${paxItem.min} Person${paxItem.min > 1 ? 's' : ''}`
                                      : `${paxItem.min}-${paxItem.max} Persons`
                                    }
                                  </span>
                                </div>
                              </div>
                              <div className="w-full border border-orange-500 border-dashed"></div>
                              <div className="text-right shrink-0">
                                <div className="font-semibold ">
                                  US$ {paxItem.discount}
                                </div>
                                {/* <div className="text-xs text-zinc-500">per person</div> */}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 transition-all duration-300">
              {/* Choose Your Date Button */}
              {data?.fixedDates.length ? (
                <button
                  onClick={handleBookNow}
                  onMouseEnter={() => setHovered("date")}
                  onMouseLeave={() => setHovered(null)}
                  className="w-full px-6 py-1.5 rounded-sm font-semibold capitalize  transition-all duration-300 text-white border-2"
                  style={{
                    backgroundColor: '#f05e25',
                    borderColor: '#f05e25',
                  }}
                >
                  Book this trip Now
                </button>
              ) : null}

              {/* View Itinerary Button */}
              <div className=" shrink-0 ">
                <button
                  onClick={scrollToDateSection}
                  className={`w-full hover:bg-[#3A3A3A] text-[#3a3a3ac7] hover:text-white hover:border-[#3A3A3A] px-6 text-sm py-1.5 rounded-sm font-bold  shrink-0 border-2 border-[#3a3a3a87] flex items-center justify-center gap-2 transition-all duration-300 ${isGeneratingPdf || !data
                    ? 'opacity-50 cursor-not-allowed'
                    : ' cursor-pointer'
                    }`}

                >
                  Check Availability
                </button>
              </div>


              <button
                onClick={onShowContact}
                onMouseEnter={() => setHovered("enquiry")}
                onMouseLeave={() => setHovered(null)}
                className="w-full px-6 py-2 text-sm rounded-sm font-semibold  border- bg-[#01283fbf] border-[#01283fbf] hover:bg-[#01283F] hover:border-[#01283F] text-white transition-all duration-300"
              >
                Trip Enquiry
              </button>



              {/* Hidden content for PDF generation */}
              <div className="hidden">
                <div ref={pdfRef} className="p-8">
                  {data && (
                    <>
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-orange-500 mb-2">{data.name}</h1>
                        <p className="text-lg text-zinc-600">{data.location} • {data.duration} Days</p>
                      </div>

                      {data.coverImage && (
                        <img
                          src={data.coverImage}
                          alt={data.name}
                          className="w-full h-64 object-cover mb-8 rounded"
                        />
                      )}

                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-zinc-800 mb-4 border-b pb-2">Trip Overview</h2>
                        <p className="text-zinc-700">{data.overview || 'No overview available.'}</p>
                      </div>

                      {data.itinerary?.length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-zinc-800 mb-4 border-b pb-2">Detailed Itinerary</h2>
                          <div className="space-y-6">
                            {data.itinerary.map((day, index) => (
                              <div key={index} className="border-b border-zinc-200 pb-4">
                                <h3 className="text-xl font-semibold text-orange-500 mb-2">Day {day.day}: {day.title}</h3>
                                <div
                                  className="text-zinc-700"
                                  dangerouslySetInnerHTML={{ __html: day.description || 'No description available.' }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-center text-sm text-zinc-500 mt-12 pt-4 border-t border-zinc-200">
                        <p>Thank you for choosing Real Himalaya. For any queries, contact us at +977 985-1026840</p>
                        <p className="mt-2">www.realhimalaya.com</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Talk to Expert Section - Slider */}
        <div className="sm:px-4 !mb-4  md:mb-0 md:px-0">
          <ExpertCard />
        </div>
        {/* View Itinerary Button */}
        <div className=" shrink-0 px-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              GeneratePdf({ data, setIsGeneratingPdf });
            }}
            disabled={isGeneratingPdf || !data}
            className={`w-full hover:bg-[#3A3A3A] text-[#3a3a3ac7] hover:text-white hover:border-[#3A3A3A] px-6 text-sm py-1.5 rounded-sm font-bold  shrink-0 border-2 border-[#3a3a3a87] flex items-center justify-center gap-2 transition-all duration-300 ${isGeneratingPdf || !data
              ? 'opacity-50 cursor-not-allowed'
              : ' cursor-pointer'
              }`}

          >
            {isGeneratingPdf ? 'Generating...' : 'View Dossier Online'}
          </button>
        </div>
      </div>


    </>
  );
};

export default RightBar;
