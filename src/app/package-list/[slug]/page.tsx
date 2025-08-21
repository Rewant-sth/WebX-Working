"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Clock, Star, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import api from "@/service/api";
import CardSkeleton from "./_components/cardSkeleton";
import Image from "next/image";
import Link from "next/link";

const ExpeditionCards: React.FC = () => {
  const { slug } = useParams();
  const [cardData, setCardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategoryList, setSubCategoryList] = useState<any[]>([]);

  // New state for selected subcategory slug
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  // Unique subcategories extracted from cardData
  const subcategories = Array.from(
    new Map(
      cardData
        .filter((pkg) => pkg.subCategoryId) // filter only those with subCategoryId
        .map((pkg) => [pkg.subCategoryId.slug, pkg.subCategoryId])
    ).values()
  );

  // Filtered packages based on selected subcategory
  const filteredPackages = selectedSubcategory
    ? cardData.filter((pkg) => pkg.subCategoryId?.slug === selectedSubcategory)
    : cardData;

  const fetchPackageData = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/package/category/${slug}`);
      const packagesArray = Array.isArray(data.data) ? data.data : [];
      setCardData(packagesArray);

      // Check for active query parameter in URL
      const searchParams = new URLSearchParams(window.location.search);
      const activeSubSlug = searchParams.get("active");

      // If active query parameter exists and matches a subcategory, use it
      // Otherwise, fall back to the first subcategory
      const activeSub = activeSubSlug
        ? packagesArray.find(
          (pkg: any) => pkg.subCategoryId?.slug === activeSubSlug
        )?.subCategoryId?.slug
        : packagesArray.find((pkg: any) => pkg.subCategoryId)?.subCategoryId
          ?.slug || null;

      setSelectedSubcategory(activeSub);
    } catch (error) {
      console.error("Error fetching package data:", error);
      setCardData([]);
      setSelectedSubcategory(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const { data } = await api.get("/subcategory");
      setSubCategoryList(data.data); // store full subcategories
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  const activeSubcategory = subCategoryList.find(
    (subcat) => subcat.slug === selectedSubcategory
  );
  const subcategoryImage = activeSubcategory?.image || "/placeholder.webp";
  const subcategoryDescription = activeSubcategory?.description || "";
  const subcategoryName = activeSubcategory?.name || "";

  useEffect(() => {
    if (slug) {
      fetchPackageData();
      fetchSubcategories();
    }
  }, [slug]);

  if (isLoading) return <CardSkeleton />;
  if (!cardData.length) return <div>No packages found for this category.</div>;

  return (
    <>
      <div className="min-h-screen bg-white">




        {/* Enhanced Hero Section */}
        <div className="relative">
          <div
            style={{
              backgroundImage: `url(${subcategoryImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed"

            }}
            className="relative w-full h-[80vh] overflow-hidden">


            {/* Layered Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-indigo-900/20"></div>

            {/* Hero Content with improved layout */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
              <div className="max-w-5xl mx-auto space-y-6">


                {/* Enhanced title with text shadow */}
                <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                  <span
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
                    }}
                    className="text-white ">
                    {subcategoryName || "All Categories"}
                  </span>
                </h1>

                {/* Enhanced description */}
                <div className="max-w-4xl mx-auto">
                  <p
                    className="text-white/90 text-lg md:text-xl line-clamp-3 leading-relaxed drop-shadow-sm"
                    dangerouslySetInnerHTML={{ __html: subcategoryDescription }}
                  />
                </div>

                {/* Enhanced divider */}
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-px bg-white/40"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-16 h-px bg-white"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-8 h-px bg-white/40"></div>
                </div>

                {/* Package count indicator */}
                <div className="mt-8">
                  <div className="inline-flex items-center px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full text-white/90 text-sm">
                    <span className="font-medium">{cardData.length} Packages Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce">
                <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>




        {/* Sidebar Navigation and Content Layout */}
        <div className=" mx-auto  md:px-12 py-8">
          <div className="flex gap-8">
            {/* Left Sidebar - Tabs */}
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-16">
                <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
                  {/* Sidebar Header */}
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Categories</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {cardData.length} packages available
                    </p>
                  </div>

                  {/* Tabs Container */}
                  <div className="p-2">
                    {subcategories.length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-slate-500 text-sm">No categories available</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {/* All Categories Tab */}
                        <button
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${!selectedSubcategory
                            ? "bg-[#01283F]/10 text-[#01283F] border border-[#01283F]"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          onClick={() => setSelectedSubcategory(null)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">All Categories</div>
                              <div className="text-sm text-slate-500">
                                {cardData.length} packages
                              </div>
                            </div>
                            {!selectedSubcategory && (
                              <div className="w-2 h-2 bg-[#01283F] rounded-full"></div>
                            )}
                          </div>
                        </button>

                        {/* Individual Category Tabs */}
                        {subcategories.map((subcat, index) => {
                          const isActive = selectedSubcategory === subcat.slug;
                          const packageCount = cardData.filter(pkg => pkg.subCategoryId?.slug === subcat.slug).length;

                          return (
                            <button
                              key={subcat._id}
                              className={`w-full text-left px-4 py-3 rounded-sm transition-all duration-200 ${isActive
                                ? "bg-[#01283F]/10 text-[#01283F] border border-[#01283F]"
                                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                              onClick={() => setSelectedSubcategory(subcat.slug)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{subcat.name}</div>
                                  <div className="text-sm text-slate-500">
                                    {packageCount} packages
                                  </div>
                                </div>
                                {isActive && (
                                  <div className="w-2 h-2 bg-[#01283F] rounded-full"></div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 min-w-0">
              {/* Content Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      {selectedSubcategory
                        ? subcategories.find(s => s.slug === selectedSubcategory)?.name
                        : "All Packages"
                      }
                    </h2>
                    <p className="text-slate-600 mt-1">
                      {filteredPackages.length} packages found
                      {selectedSubcategory && (
                        <span className="ml-2 text-blue-600 cursor-pointer" onClick={() => setSelectedSubcategory(null)}>
                          · View all categories
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Category Description (if selected) */}
                {selectedSubcategory && activeSubcategory?.description && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <div
                      className="text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: activeSubcategory.description }}
                    />
                  </div>
                )}
              </div>

              {/* Packages Grid */}
              {filteredPackages.length === 0 ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No packages found</h3>
                    <p className="text-slate-500">
                      {selectedSubcategory
                        ? "No packages available in this category."
                        : "No packages available at this time."
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPackages.map((card, index) => {
                    if (!card) return null;

                    return (
                      <div
                        key={card._id || `card-${index}`}
                        className="bg-white border relative border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200"
                      >
                        {/* Location Badge */}
                        {card.location && (
                          <div className="absolute top-4 left-4 z-20">
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-sm">
                              <MapPin className="w-3 h-3 mr-1 text-blue-600" />
                              {card.location}
                            </span>
                          </div>
                        )}

                        {/* Image Container */}
                        <div className="relative overflow-hidden h-48">
                          <img
                            src={card.coverImage || "/placeholder-image.jpg"}
                            alt={card.name || "Travel Package"}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />

                          {/* Price Badge */}
                          {card.price && (
                            <div className="absolute bottom-4 right-4">
                              <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg">
                                ${card.price}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                              {typeof card.subCategoryId === "object"
                                ? card.subCategoryId?.name
                                : "Adventure"}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900  mb-2 line-clamp-1 leading-tight">
                            {card.name || "Unnamed Package"}
                          </h3>

                          <div className="text-slate-600 text-sm leading-relaxed mb-5">
                            <p
                              dangerouslySetInnerHTML={{ __html: card?.overview }}
                              className="line-clamp-2"
                            />
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Link
                              href={`/booking/${card.id}`}
                              className="flex-1 bg-[#F05E25] hover:bg-[#E04E1F] text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 text-center text-sm"
                            >
                              Book Now
                            </Link>
                            <Link
                              href={`/itinerary/${card.slug}`}
                              className="flex-1 border border-[#01283F] hover:border-[#01283F] text-[#01283F] hover:text-white hover:bg-[#01283F] font-medium py-2.5 px-4 rounded-md transition-all duration-200 text-center text-sm"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpeditionCards;
