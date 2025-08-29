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
  icon: React.ComponentType<any>;
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
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "500+ Expeditions Completed",
    description: "Led more than 500 expeditions to various peaks and trails.",
    imageUrl: "/images/500-expeditions.jpg",
    alt: "500+ Expeditions Completed",
    icon: Mountain,
    color: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "25 International Partnerships",
    description:
      "Collaborated with 25 international travel agencies worldwide.",
    imageUrl: "/images/25-partnerships.jpg",
    alt: "25 International Partnerships",
    icon: Globe,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "15 Years of Excellence",
    description: "Providing top-notch adventure services since 2010.",
    imageUrl: "/images/15-years.jpg",
    alt: "15 Years of Excellence",
    icon: Trophy,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 5,
    title: "Zero Accident Record",
    description: "Maintained a flawless safety record in all our adventures.",
    imageUrl: "/images/safety-certified.jpg",
    alt: "Zero Accident Record",
    icon: Shield,
    color: "from-red-500 to-red-600",
  },
  {
    id: 6,
    title: "Sustainable Tourism Award",
    description:
      "Awarded for our commitment to sustainable and responsible tourism.",
    imageUrl: "/images/sustainable-tourism.jpg",
    alt: "Sustainable Tourism Award",
    icon: Heart,
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#01283F] via-[#01283F] to-[#01283F] text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >

                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  Certifications & Achievements
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                  Discover our prestigious certifications and achievements that showcase our commitment to excellence, safety, and sustainable tourism practices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-6 text-sm"
              >
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Shield className="w-4 h-4" />
                  <span>Safety Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Globe className="w-4 h-4" />
                  <span>Internationally Recognized</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Trophy className="w-4 h-4" />
                  <span>Award Winning</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Certificates Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Official Certifications
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These certifications validate our expertise and commitment to providing world-class adventure tourism services.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="bg-white rounded-sm overflow-hidden shadow-lg">
                    <Skeleton height={250} />
                    <div className="p-6">
                      <Skeleton height={24} className="mb-4" />
                      <Skeleton count={3} />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-8">
                {certificates.map((cert: Certificate, index: number) => (
                  <motion.div
                    key={cert._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white rounded-sm overflow-hidden  transition-all duration-500 transform "
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
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
                      <div className="absolute p-4 flex flex-col justify-end text-white inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent  transition-opacity duration-300">


                        <div className="py-4">
                          <h2 className="text-xl font-semibold">{cert.name}</h2>
                        </div>
                      </div>
                    </div>


                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>


          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-[#01283F] via-[#01283F] to-[#01283F] rounded-sm p-8 lg:p-12 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Proud Achievements
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  These milestones represent years of dedication, expertise, and commitment to excellence in adventure tourism.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {milestonesData.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-lg rounded-sm p-6 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${milestone.color} mr-4 group-hover:scale-110 transition-transform`}>
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{milestone.title}</h3>
                    </div>
                    <p className="text-blue-100 leading-relaxed">
                      {milestone.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white rounded-sm w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 py-4 border-b border-gray-200 ">
                  <h2 className="text-2xl font-bold uppercase text-gray-900 truncate pr-4">
                    {selectedCertificate.name}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body - Two Column Layout */}
                <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
                  {/* Left Side - Certificate Image */}
                  <div className="lg:w-1/2   p-6">
                    <div className="w-full ">
                      <img
                        src={selectedCertificate.image}
                        alt={selectedCertificate.name}
                        className="max-w-full  object-contain rounded-sm "
                      />
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-900">Verification</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          This certificate has been verified and is authentic.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">Accredited</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Recognized by international standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Certificate Content */}
                  <div className="lg:w-1/2 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6">
                        {/* Certificate Title (Mobile Only) */}
                        <div className="lg:hidden">
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {selectedCertificate.name}
                          </h2>
                        </div>



                        {/* Certificate Description */}
                        <div>

                          <div
                            className="prose prose-gray space-y-4 max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: selectedCertificate.description }}
                          />
                        </div>


                      </div>
                    </div>


                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificatesPage;