"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "@/service/certificates";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Award,
  Shield,
  Star,
  Users,
  Mountain,
  Trophy,
  CheckCircle,
  Target,
  Globe,
  Heart,
  Zap,
  Eye,
  X,
  ZoomIn
} from "lucide-react";

export interface Certificate {
  _id: string
  name: string
  description: string
  image: string
  imagePublicId: string
  isActive: boolean
  sortOrder: number;
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
  icon?: string;
  color: string;
}

const milestonesData: Milestone[] = [
  {
    id: 1,
    title: "10,000+ Happy Trekkers",
    description:
      "Successfully guided over 10,000 trekkers across the Himalayas.",
    imageUrl: "/images/10000-trekkers.jpg",
    alt: "10,000+ Happy Trekkers",
    icon: "/icons/users.svg",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "500+ Expeditions Completed",
    description: "Led more than 500 expeditions to various peaks and trails.",
    imageUrl: "/images/500-expeditions.jpg",
    alt: "500+ Expeditions Completed",
    icon: "/icons/mountain.svg",
    color: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "25 International Partnerships",
    description:
      "Collaborated with 25 international travel agencies worldwide.",
    imageUrl: "/images/25-partnerships.jpg",
    alt: "25 International Partnerships",
    icon: "/icons/globe.svg",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "15 Years of Excellence",
    description: "Providing top-notch adventure services since 2010.",
    imageUrl: "/images/15-years.jpg",
    alt: "15 Years of Excellence",
    icon: "/icons/achievement.svg",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 5,
    title: "Zero Accident Record",
    description: "Maintained a flawless safety record in all our adventures.",
    imageUrl: "/images/safety-certified.jpg",
    alt: "Zero Accident Record",
    icon: "/icons/shield.svg",
    color: "from-red-500 to-red-600",
  },
  {
    id: 6,
    title: "Sustainable Tourism Award",
    description:
      "Awarded for our commitment to sustainable and responsible tourism.",
    imageUrl: "/images/sustainable-tourism.jpg",
    alt: "Sustainable Tourism Award",
    icon: "/icons/trophy.svg",
    color: "from-emerald-500 to-emerald-600",
  },
];

const CertificatesPage = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<CertificatesResponse>({
    queryKey: ["certificate"],
    queryFn: getCertificates,
  });

  const certificates = data?.data || [];

  const openModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    // Restore background scrolling
    document.body.style.overflow = 'unset';
  };

  return (
    <>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src={"/EVEREST REGION/NIKON D80013076.JPG"}
          alt="Everest Region"
          fill
          className="object-cover object-bottom brightness-60"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 text-center text-white w-full px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Certifications & Achievements
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:pt-[5rem]">
        {/* Achievements Section */}
        <div className=" relative overflow-hidden pb-12">
          <div className="absolute top-0 right-0 w-64 h-64  rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96  rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="text-center mb-12">

              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                These milestones represent years of dedication, expertise, and commitment to excellence in adventure tourism.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center ">
              {milestonesData.map((milestone) => (
                <div
                  key={milestone.id}
                  className="w h-[300px] rounded-sm p-6 border border-gray-300 transition-all duration-300 group"
                >
                  <div className="flex items-center mb-4">
                    {/* <div className="icon ">
                      <img className="w-7 h-7" src={milestone.icon} alt="" />
                    </div> */}
                    <h3 className="text-xl font-bold text-[#F05E25]">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="leading-relaxed">{milestone.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>



        {/* Certificates Grid */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center my-12 mt-20">
            {/* <h2 className="text-3xl uppercase md:text-4xl font-bold text-[#D16200] mb-4">
              Our Official Certifications
            </h2> */}
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              These certifications validate our expertise and commitment to providing world-class adventure tourism services.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="bg-white rounded-sm overflow-hidden border border-gray-200">
                  <Skeleton height={250} />
                  <div className="p-6">
                    <Skeleton height={24} className="mb-4" />
                    <Skeleton count={3} />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 ">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Failed to Load Certificates
              </h3>
              <p className="text-gray-600">
                We're having trouble loading our certifications. Please try again later.
              </p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Certificates Available
              </h3>
              <p className="text-gray-600">
                Certificates will be displayed here once they become available.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-4 ">
              {certificates.map((cert: Certificate, index: number) => (
                <div
                  key={cert._id}
                  className="group transition-all duration-500 transform"
                >
                  <div className="relative w-[300px] h-[400px] overflow-hidden rounded-sm">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full transition-transform duration-500"
                    />

                    <div className=" absolute backdrop-blur-sm z-30 flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300 inset-0">
                      <button
                        onClick={() => openModal(cert)}
                        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
                      >
                        <ZoomIn className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>


                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {isModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center">
          <button
            onClick={closeModal}
            className="absolute top-20 right-6 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedCertificate.image}
            alt={selectedCertificate.name}
            className="max-w-[90%] max-h-[80%] object-contain rounded-sm"
          />
        </div>
      )}


    </>
  );
};

export default CertificatesPage;