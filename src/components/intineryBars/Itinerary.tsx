import { useState } from "react";
import {
  ChevronRight,
  PhoneCall,
  Info,
} from "lucide-react";
import { IItinerary } from "@/types/IPackages";
import Image from "next/image";
import Link from "next/link";


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
    <div className=" pb-4  ">
      <div
        className="flex items-start sm:items-center justify-between py-2 sm:py-3   cursor-pointer  transition-all duration-200 rounded-t-lg"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex sm:items-center gap-4">
          <span className="rounded-sm shrink-0 px-3 bg-[#F05E25] py-2 text-sm h-fit font-semibold text-white">
            Day {day?.toString()?.padStart(2, "0")}
          </span>
          <h3 className="font-semibold uppercase text-lg" >
            {title}
          </h3>
        </div>
        <div
          className="transition-transform duration-300 ease-in-out"
          style={{
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <ChevronRight size={20} />
        </div>
      </div>

      <div
        className={` transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "h-full opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className=" pb-6">
          <div id="editor" dangerouslySetInnerHTML={{ __html: description }} className="text-zinc-600 text-base leading-relaxed  mb-6">

          </div>

          <div className="flex flex-wrap gap-4 lg:gap-8">
            {data?.duration && (
              <div className="flex  gap-4">
                <div className="rounded-sm  flex items-center justify-center w-10 h-10 shrink-0">
                  <img src="/icons/time.png" alt="time" className="" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold leading-4  mb-1">
                    Duration
                  </h3>
                  <p className=" text-zinc-600">{data.duration}</p>
                </div>
              </div>
            )}

            {data?.maxAltitude && (
              <div className="flex items-start gap-4">
                <div className="rounded-sm  flex items-center justify-center w-10 h-10 shrink-0">
                  <img src="/icons/mountain.png" alt="mountain" className="" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold leading-4  mb-1">
                    Max Altitude
                  </h3>
                  <p className="t text-zinc-600">{data.maxAltitude} m</p>
                </div>
              </div>
            )}

            {data?.accommodation && (
              <div className="flex items-start gap-3">
                <div className="rounded-sm  flex items-center justify-center w-10 h-10 shrink-0">
                  <img src="/icons/mansion.png" alt="time" className="" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold leading-4  mb-1">
                    Accommodation
                  </h3>
                  <p className=" text-zinc-600">{data.accommodation}</p>
                </div>
              </div>
            )}

            {data?.meals && (
              <div className="flex items-start gap-3">
                <div className="rounded-sm  flex items-center justify-center w-10 h-10 shrink-0">
                  <img src="/icons/bibimbap.png" alt="meal" className="" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold leading-4  mb-1">
                    Meals
                  </h3>
                  <p className="text-sm text-zinc-600">{data.meals}</p>
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
const ItineraryPreview = ({ data }: { data: IItinerary[] | undefined, }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedData = showAll ? data : data?.slice(0, 5);
  const hasMoreItems = data && data.length > 5;


  return (
    <div
      id="itinerary"
      className=" pb-14"
    >
      <h2 className="text-2xl font-semibold text-orange-500 text-left mb-2">
        <span className="flex items-center gap-2">
          <span>Itinerary Details</span>
        </span>
      </h2>
      <p className="text-zinc-800 mt-1 leading-relaxed  mb-4">
        Follow our detailed day-by-day itinerary to understand what each day of
        your adventure will bring.
      </p>

      <div className="space-y-4 divide-y divide-zinc-200">
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
