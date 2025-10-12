"use client";

import { ITravelPackage } from "@/types/IPackages";
import {
  Eye,
  Compass,
  MapPinned,
  CalendarRange,
  DollarSign,
  CalendarDays,
  Users,
  HelpCircle,
  ClipboardCheck,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const LeftBar = ({ data }: { data: ITravelPackage | undefined }) => {
  const [activeSection, setActiveSection] = useState<string>("major-highlights");

  const handleScroll = (section: string) => {
    const id = section.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = [
        "major-highlights",
        "overview",
        "trip-glance",
        "route-overview",
        "route-map",
        "itinerary",
        "date-&-prices",
        "inclusion-&-exclusion",
        "requirements",
        "traveller-review",
        "faqs",
      ];
      let current = "major-highlights";
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 150) {
            current = section;
          }
        }
        else {
          current == "major-highlights"
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const isActive = (sectionId: string) => sectionId === activeSection;

  return (
    <div className="w-1/4 hidden lg:block mx-4 sticky rounded-xl top-[150px] h-2/6 bg-zinc-50">
      <div className="flex items-center gap-2 mb-4 bg-blue-100 py-3 px-2 rounded-t-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 512 512"><path fill="currentColor" d="m203.97 23l-18.032 4.844l11.656 43.468c-25.837 8.076-50.32 21.653-71.594 40.75L94.53 80.594l-13.218 13.22l31.376 31.374c-19.467 21.125-33.414 45.53-41.813 71.343l-42.313-11.343l-4.843 18.063l42.25 11.313c-6.057 27.3-6.157 55.656-.345 83L23.72 308.78l4.843 18.064l41.812-11.22a193.3 193.3 0 0 0 31.25 59.876l-29.97 52.688l-16.81 29.593l29.56-16.842l52.657-29.97a193.3 193.3 0 0 0 60.094 31.407l-11.22 41.844l18.033 4.81l11.218-41.905a195.7 195.7 0 0 0 83-.375l11.312 42.28l18.063-4.81l-11.344-42.376c25.812-8.4 50.217-22.315 71.342-41.78l31.375 31.373l13.22-13.218l-31.47-31.47a193.3 193.3 0 0 0 40.72-71.563l43.53 11.657l4.813-18.063l-43.625-11.686a195.7 195.7 0 0 0-.344-82.063l43.97-11.78l-4.813-18.063L440.908 197c-6.73-20.866-17.08-40.79-31.032-58.844l29.97-52.656l16.842-29.563l-29.593 16.844l-52.656 29.97c-17.998-13.875-37.874-24.198-58.657-30.906l11.783-44L309.5 23l-11.78 43.97c-27-5.925-55.02-6.05-82.064-.376zm201.56 85L297.25 298.313l-.75.437l-40.844-40.875l-148.72 148.72l-2.186 1.25l109.125-191.75l41.78 41.78L405.532 108zm-149.686 10.594c21.858 0 43.717 5.166 63.594 15.47l-116.625 66.342l-2.22 1.28l-1.28 2.22l-66.25 116.406c-26.942-52.04-18.616-117.603 25.03-161.25c26.99-26.988 62.38-40.468 97.75-40.468zm122.72 74.594c26.994 52.054 18.67 117.672-25.002 161.343c-43.66 43.662-109.263 52.005-161.312 25.033l116.438-66.282l2.25-1.25l1.25-2.25l66.375-116.592z"></path></svg>
        <h2 className="text-2xl font-semibold">Adventure Log</h2>
      </div>
      <div className="mt-2">
        <ul className="flex flex-col">
          {data?.attraction?.length ? (
            <li
              onClick={() => handleScroll("Major Highlights")}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("major-highlights")
                ? "bg-blue-50 text-blue-500 font-medium"
                : "hover:translate-x-1"
                }`}
            >
              <div className="p-1.5 bg-blue-50 rounded-md">
                <Image
                  src="/icons/high5-fav.png"
                  alt="High Five"
                  width={100}
                  height={100}
                  className="w-4 object-contain"
                />
              </div>
              Major Highlights
            </li>
          ) : null}
          <li
            onClick={() => handleScroll("Overview")}
            className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("overview")
              ? "bg-blue-50 text-blue-500 font-medium"
              : "hover:translate-x-1"
              }`}
          >
            <div className="p-1.5 bg-blue-50 rounded-md">
              <Eye className="w-4 h-4" style={{ color: "#025FE0" }} />
            </div>
            Overview
          </li>

          <li
            onClick={() => handleScroll("Trip Glance")}
            className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("trip-glance")
              ? "bg-blue-50 text-blue-500 font-medium"
              : "hover:translate-x-1"
              }`}
          >
            <div className="p-1.5 bg-blue-50 rounded-md">
              <Compass className="w-4 h-4" style={{ color: "#14B8A6" }} />
            </div>
            Trip Glance
          </li>

          {/* <li
            onClick={() => handleScroll("Route Overview")}
            className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("route-overview") ? "bg-blue-50 text-blue-500 font-medium" : "hover:translate-x-1"}`}
          >
            <div className="p-1.5 bg-blue-50 rounded-md">
              <Route className="w-4 h-4" style={{ color: "#8B5CF6" }} />
            </div>
            Route Overview
          </li> */}

          <li
            onClick={() => handleScroll("Route Map")}
            className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("route-map")
              ? "bg-blue-50 text-blue-500 font-medium"
              : "hover:translate-x-1"
              }`}
          >
            <div className="p-1.5 bg-blue-50 rounded-md">
              <MapPinned className="w-4 h-4" style={{ color: "#EF4444" }} />
            </div>
            Route Map
          </li>

          {data?.itinerary?.length ? (
            <li
              onClick={() => handleScroll("Itinerary")}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("itinerary")
                ? "bg-blue-50 text-blue-500 font-medium"
                : "hover:translate-x-1"
                }`}
            >
              <div className="p-1.5 bg-blue-50 rounded-md">
                <CalendarRange
                  className="w-4 h-4"
                  style={{ color: "#10B981" }}
                />
              </div>
              Itinerary
            </li>
          ) : null}


          {data?.fixedDates.length ? (
            <li
              onClick={() => handleScroll("Date & Prices")}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("date-&-prices")
                ? "bg-blue-50 text-blue-500 font-medium"
                : "hover:translate-x-1"
                }`}
            >
              <div className="p-1.5 bg-blue-50 rounded-md">
                <CalendarDays
                  className="w-4 h-4"
                  style={{ color: "#3B82F6" }}
                />
              </div>
              Date & Prices
            </li>
          ) : null}

          {data?.inclusion.length ? (
            <li
              onClick={() => handleScroll("Inclusion & Exclusion")}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("inclusion-&-exclusion")
                ? "bg-blue-50 text-blue-500 font-medium"
                : "hover:translate-x-1"
                }`}
            >
              <div className="p-1.5 bg-blue-50 rounded-md">
                <DollarSign className="w-4 h-4" style={{ color: "#F97316" }} />
              </div>
              Inclusion & Exclusion
            </li>
          ) : null}

          {data?.requirements.length ? (
            <li
              onClick={() => handleScroll("Requirements")}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("requirements")
                ? "bg-blue-50 text-blue-500 font-medium"
                : "hover:translate-x-1"
                }`}
            >
              <div className="p-1.5 bg-blue-50 rounded-md">
                <ClipboardCheck className="w-4 h-4" style={{ color: "#8B5CF6" }} />
              </div>
              Requirements
            </li>
          ) : null}


          {data?.testimonial.length ? (
            <li
              onClick={() => handleScroll("Traveller Review")}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("traveller-review")
                ? "bg-blue-50 text-blue-500 font-medium"
                : "hover:translate-x-1"
                }`}
            >
              <div className="p-1.5 bg-blue-50 rounded-md">
                <Users className="w-4 h-4" style={{ color: "#E11D48" }} />
              </div>
              Traveller Review
            </li>
          ) : null}

          {data?.faq.length ? (
            <li
              onClick={() => handleScroll("FAQs")}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-300 ${isActive("faqs")
                ? "bg-blue-50 text-blue-500 font-medium"
                : "hover:translate-x-1"
                }`}
            >
              <div className="p-1.5 bg-blue-50 rounded-md">
                <HelpCircle className="w-4 h-4" style={{ color: "#6B7280" }} />
              </div>
              FAQs
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;
