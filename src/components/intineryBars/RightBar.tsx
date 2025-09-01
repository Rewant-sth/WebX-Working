"use client";

import { useEffect, useState } from "react";
import { ITravelPackage } from "@/types/IPackages";
import Link from "next/link";
import api from "@/service/api";
import { Icon } from "@iconify/react/dist/iconify.js";

const RightBar = ({ data }: { data: ITravelPackage | undefined }) => {
  const [price, setPrice] = useState<number | null>(null);

  const getLowestPrice = async () => {
    try {
      const response = await api.get("/lowest-price");
      setPrice(response.data.data.pricePerPerson);
    } catch (error) {
      console.error("Error fetching lowest price:", error);
    }
  };

  useEffect(() => {
    getLowestPrice();
  }, []);



  const [hovered, setHovered] = useState<"date" | "enquiry" | null>(null);

  const isEnquiryActive = hovered === "enquiry";

  const scrollToDateSection = () => {
    const element = document.getElementById("date-&-prices");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className=" bg-[#F05E25]/5 hidden xl:block rounded-sm border border-gray-200 sticky top-[80px] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200" >
        <h2 className="text-2xl font-bold text-center" style={{ color: '#3A3A3A' }}>
          Starting Price
        </h2>
        {data?.name && (
          <p className="text-center  font-medium text-gray-600 leading-tight">
            {data.name}
          </p>
        )}
      </div>

      {/* Price Section */}
      <div className="px-6 py-4 mb-5">
        <div className="text-center mb-4">
          <div className="flex items-baseline justify-center gap-2 mb-3">
            <span className="text-5xl font-bold" style={{ color: '#f05e25' }}>
              ${price + "99" || "N/A"}
            </span>
            <span className="text-xl font-medium text-gray-600">per person</span>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            Best Available Rate
          </p>
        </div>

        {/* Key Benefits Banner */}
        {/* <div className={` overflow-hidden ${showBanner ? "h-full mb-8" : "h-0"}  `}>
          <div className="rounded-sm  p-4 text-center" style={{ borderColor: '#f05e25', backgroundColor: '#fffbf8' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-bold text-lg" style={{ color: '#3A3A3A' }}>
                Premium Experience
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600">
              Expert Guides • Best Price • Full Customization
            </p>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="space-y-4 transition-all duration-300">
          {/* Choose Your Date Button */}
          {data?.fixedDates.length ? (
            <button
              onClick={scrollToDateSection}
              onMouseEnter={() => setHovered("date")}
              onMouseLeave={() => setHovered(null)}
              className="w-full px-8 py-2.5 rounded-sm font-bold text-lg transition-all duration-300 text-white border-2"
              style={{
                backgroundColor: '#f05e25',
                borderColor: '#f05e25'
              }}
            >
              Choose Your Date
            </button>
          ) : null}

          {/* Enquiry Now Button */}
          <Link href={"/contact-us"} className="w-full block">
            <button
              onMouseEnter={() => setHovered("enquiry")}
              onMouseLeave={() => setHovered(null)}
              className="w-full px-8 py-2.5 rounded-sm font-bold text-lg border-2 transition-all duration-300"
              style={{
                backgroundColor: isEnquiryActive ? '#3A3A3A' : 'transparent',
                borderColor: '#3A3A3A',
                color: isEnquiryActive ? 'white' : '#3A3A3A'
              }}
            >
              Enquiry Now
            </button>
          </Link>
        </div>
      </div>

      {/* Talk to Expert Section */}
      <div className="border-t border-gray-200" >
        <div className="px-8 py-6">
          <h3 className="text-xl font-bold  text-center" style={{ color: '#3A3A3A' }}>
            Talk to Expert
          </h3>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Get personalized advice from our travel experts
            </p>
            <div className="flex items-center justify-center gap-3">
              <Icon icon="line-md:phone-call-loop" width="24" height="24" style={{ color: '' }} />
              <Icon icon="skill-icons:instagram" width="24" height="24" style={{ color: '#f05e25' }} />
              <Icon icon="logos:facebook" width="24" height="24" style={{ color: '#f05e25' }} />
              <Icon icon="skill-icons:gmail-light" width="28" height="28" style={{ color: '#f05e25' }} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
