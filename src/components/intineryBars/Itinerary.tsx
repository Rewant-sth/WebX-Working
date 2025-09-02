import { useState } from "react";
import {
  ChevronRight,
  PhoneCall,
  Info,
  Timer,
  Mountain,
  Bed,
  Utensils,
  CalendarDays,
} from "lucide-react";
import { IItinerary } from "@/types/IPackages";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

// Types
type ItineraryDetails = {
  altitude?: string;
  activity?: string;
  distance?: string;
  duration?: string;
  accommodation?: string;
  meals?: string;
};

type ItineraryDayProps = {
  day: string;
  title: string;
  description: string;
  expanded?: boolean;
  data: IItinerary;
  isFirst?: boolean;
};

// Itinerary Day Component
const ItineraryDay = ({
  day,
  title,
  description,
  expanded: initialExpanded = true,
  data,
  isFirst = false,
}: ItineraryDayProps) => {
  const [expanded, setExpanded] = useState(isFirst);

  return (
    <div className=" hover:border-gray-300 transition-all duration-300 rounded-sm bg-gray-50/80 border border-gray-100 mb-4 overflow-hidden">
      <div
        className="flex items-center justify-between py-5 px-6 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-t-lg"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <span className="rounded-sm px-4 bg-[#F05E25] py-2 text-sm font-semibold text-white">
            Day {day?.toString()?.padStart(2, "0")}
          </span>
          <h3 className="font-semibold text-lg" style={{ color: "#3A3A3A" }}>
            {title}
          </h3>
        </div>
        <div
          className="transition-transform duration-300 ease-in-out"
          style={{
            color: "#f05e25",
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <ChevronRight size={20} />
        </div>
      </div>

      <div
        className={`bg-white border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 pb-6">
          <div id="editor" dangerouslySetInnerHTML={{ __html: description }} className="text-gray-600 text-base leading-relaxed pt-4 mb-6">

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.duration && (
              <div className="flex  gap-4">
                <div className="rounded-sm  flex items-center justify-center w-10 h-10 shrink-0">
                  <img src="/icons/time.png" alt="time" className="grayscale" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold leading-4 text-lg mb-1">
                    Duration
                  </h3>
                  <p className=" text-gray-600">{data.duration}</p>
                </div>
              </div>
            )}

            {data?.maxAltitude && (
              <div className="flex items-start gap-4">
                <div className="rounded-sm  flex items-center justify-center w-10 h-10 shrink-0">
                  <img src="/icons/mountain.png" alt="mountain" className="grayscale" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold leading-4  mb-1">
                    Max Altitude
                  </h3>
                  <p className="t text-gray-600">{data.maxAltitude} m</p>
                </div>
              </div>
            )}

            {data?.accommodation && (
              <div className="flex items-start gap-3">
                <div className="rounded-sm  flex items-center justify-center w-10 h-10 shrink-0">
                  <img src="/icons/mansion.png" alt="time" className="grayscale" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold leading-4 mb-1">
                    Accommodation
                  </h3>
                  <p className=" text-gray-600">{data.accommodation}</p>
                </div>
              </div>
            )}

            {data?.meals && (
              <div className="flex items-start gap-3">
                <div className="rounded-sm  flex items-center justify-center w-10 h-10 shrink-0">
                  <img src="/icons/bibimbap.png" alt="meal" className="grayscale" />
                </div>
                <div className="flex flex-col">
                  <p
                    className="font-semibold text-sm mb-1"
                    style={{ color: "#3A3A3A" }}
                  >
                    Meals
                  </p>
                  <p className="text-sm text-gray-600">{data.meals}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Itinerary Preview Component
const ItineraryPreview = ({ data }: { data: IItinerary[] | undefined }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedData = showAll ? data : data?.slice(0, 5);
  const hasMoreItems = data && data.length > 5;

  return (
    <div
      id="itinerary"
      className="border-b  border-gray-200 mb-8 pb-10"
    >
      <h2 className="text-3xl font-semibold text-gray-800 text-center sm:text-left">
        <span className="flex items-center gap-2">
          <span>Itinerary</span>
        </span>
      </h2>
      <p className="text-zinc-600 mt-1 leading-relaxed  mb-8">
        Follow our detailed day-by-day itinerary to understand what each day of
        your adventure will bring.
      </p>

      <div className="space-y-4">
        {displayedData?.map((day, index) => (
          <ItineraryDay
            key={day._id || index}
            day={day.days}
            title={day.title}
            description={day.description}
            expanded={true}
            data={day}
            isFirst={index === 0}
          />
        ))}
      </div>

      {hasMoreItems && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-sm hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: "#f05e25" }}
          >
            {showAll ? (
              <>
                Show Less
                <ChevronRight
                  size={16}
                  className="transform rotate-[-90deg] transition-transform duration-200"
                />
              </>
            ) : (
              <>
                Read More ({data!.length - 5} more days)
                <ChevronRight
                  size={16}
                  className="transform rotate-90 transition-transform duration-200"
                />
              </>
            )}
          </button>
        </div>
      )}

      <div
        className="p-6 mt-8 rounded-sm border transition-all duration-200"
        style={{
          backgroundColor: "#fff5f0",
          borderColor: "#f05e25",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ color: "#f05e25" }}>
            <Info size={20} className="mr-3" />
            <p className="text-lg font-semibold">Need Help Planning?</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              <Image
                src="/Avtar/avtar2.png"
                alt="High5 Avtar"
                className="w-10 h-10 rounded-full border-2 border-white"
                height={100}
                width={100}
              />
              <Image
                src="/Avtar/avtar.png"
                alt="High5 Avtar"
                className="w-10 h-10 rounded-full border-2 border-white"
                height={100}
                width={100}
              />
              <Image
                src="/Avtar/avtar3.png"
                alt="High5 Avtar"
                className="w-10 h-10 rounded-full border-2 border-white"
                height={100}
                width={100}
              />
            </div>

            <Link
              href="/contact-us"
              className="ml-2 rounded-full w-10 h-10 flex items-center justify-center text-white hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: "#3A3A3A" }}
            >
              <PhoneCall size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPreview;
