"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "@/service/certificates";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export interface Certificate {
  _id: string;
  name: string;
  description: string;
  image: string;
  imagePublicId: string;
  sortOrder?: number; // optional since some items don't have it
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export interface CertificatesResponse {
  status: "success" | "error";
  data: Certificate[];
  pagination: Pagination;
  message: string;
}



interface Milestone {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

const milestonesData: Milestone[] = [
  {
    id: 1,
    title: "10,000+ Happy Trekkers",
    description:
      "Successfully guided over 10,000 trekkers across the Himalayas.",
    imageUrl: "/images/10000-trekkers.jpg",
    alt: "10,000+ Happy Trekkers",
  },
  {
    id: 2,
    title: "500+ Expeditions Completed",
    description: "Led more than 500 expeditions to various peaks and trails.",
    imageUrl: "/images/500-expeditions.jpg",
    alt: "500+ Expeditions Completed",
  },
  {
    id: 3,
    title: "25 International Partnerships",
    description:
      "Collaborated with 25 international travel agencies worldwide.",
    imageUrl: "/images/25-partnerships.jpg",
    alt: "25 International Partnerships",
  },
  {
    id: 4,
    title: "15 Years of Excellence",
    description: "Providing top-notch adventure services since 2010.",
    imageUrl: "/images/15-years.jpg",
    alt: "15 Years of Excellence",
  },
  {
    id: 5,
    title: "Zero Accident Record",
    description: "Maintained a flawless safety record in all our adventures.",
    imageUrl: "/images/safety-certified.jpg",
    alt: "Zero Accident Record",
  },
  {
    id: 6,
    title: "Sustainable Tourism Award",
    description:
      "Awarded for our commitment to sustainable and responsible tourism.",
    imageUrl: "/images/sustainable-tourism.jpg",
    alt: "Sustainable Tourism Award",
  },
];

const CertificatesPage = () => {
  const { data, isLoading, error } = useQuery<CertificatesResponse>({
    queryKey: ["certificate"],
    queryFn: getCertificates,
  });

  // Ensure data is always an array
  const certificates = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen py-24 lg:py-28 xl:py-36 pb-12 px-4 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Our Proud Milestones & Certifications
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At Highfive, we take pride in delivering outstanding travel and
            adventure experiences, supported by our official certifications and
            globally recognized accreditations. These credentials highlight our
            strong commitment to sustainability, safety, and top-quality
            service.
          </p>
        </div>


        {/* Certificates Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-3xl font-bold text-blue-800 mr-4">
              Our Certifications
            </h2>
            <div className="flex-1 h-0.5 bg-blue-200" />
          </div>

          {/* <pre>{JSON.stringify(data?.data, null, 2)}</pre> */}

          <div className="grid gap-6 sm:grid-cols-2 [column-fill:_balance]">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className=" flex flex-col items-center border border-blue-100 shadow-sm h-96 overflow-hidden relative"
                >
                  <Skeleton height={"100%"} width={"100%"} />
                </div>
              ))
            ) : error ? (
              <div className="col-span-2 text-center py-8">
                <p className="text-red-600 text-lg">
                  Failed to load certificates. Please try again later.
                </p>
              </div>
            ) : data?.data?.length === 0 ? (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-600 text-lg">
                  No certificates available at the moment.
                </p>
              </div>
            ) : (
              data?.data?.map((cert: Certificate) => (
                <div
                  key={cert._id}
                  className="rounded-sm break-inside-avoid flex flex-col items-center   hover:shadow-md transition-all duration-300 transform hover:-translate-y-1  overflow-hidden relative"
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="object-contain h-full w-full"
                    loading="eager"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Milestones Section */}
        <div className="bg-white py-12 px-6 rounded-2xl border border-blue-100 shadow-sm">
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-3xl font-bold text-blue-800 mr-4">
              Our Achievements
            </h2>
            <div className="flex-1 h-0.5 bg-blue-200" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {milestonesData.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`flex items-center gap-6 ${index % 2 === 0 ? "flex-row" : ""
                  }`}
              >
                {/* Image Container */}
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 text-xl font-bold">
                    {milestone.id}
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;