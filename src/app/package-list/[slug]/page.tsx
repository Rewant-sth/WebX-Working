"use client";

import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import api from "@/service/api";
import CardSkeleton from "./_components/cardSkeleton";
import Link from "next/link";
import { openBookingModal } from "@/store/booking-store";

const ExpeditionCards: React.FC = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [cardData, setCardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategoryList, setSubCategoryList] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // New state for selected subcategory slug
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      // Otherwise, default to showing all categories (null) instead of
      // falling back to the first subcategory.
      const activeSub = activeSubSlug
        ? packagesArray.find(
          (pkg: any) => pkg.subCategoryId?.slug === activeSubSlug
        )?.subCategoryId?.slug || null
        : null;

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
  const subcategoryImage = activeSubcategory?.coverImage || "/categories.png";
  const subcategoryName = activeSubcategory?.name || "";

  useEffect(() => {
    if (slug) {
      fetchPackageData();
      fetchSubcategories();
    }
  }, [slug]);

  if (isLoading) return <CardSkeleton />;

  if (!cardData.length) {
    return (
      <div className="min-h-screen h-[50dvh] flex flex-col justify-center items-center  bg-gradient-to-br from-slate-50 via-white to-orange-50">

        <h2 className="text-xl uppercase font-semibold">Sorry no packages found for this category</h2>
      </div>
    );
  }

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
              backgroundAttachment: isMobile ? "scroll" : "fixed"
            }}
            className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">

            {/* Layered Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-indigo-900/20"></div>

            {/* Hero Content with improved layout */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12">
              <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">

                {/* Enhanced title with text shadow */}
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg">
                  <span
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
                    }}
                    className="text-white uppercase">
                    {subcategoryName || "All Categories"}
                  </span>
                </h1>


                {/* Package count indicator */}
                <div className="mt-4">
                  <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2  bg-orange-50 rounded-full text-orange-500 text-xs sm:text-sm">
                    <span className="font-medium">{cardData.length} Packages Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>




        {/* Sidebar Navigation and Content Layout */}
        <div className="mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Mobile Tabs - Horizontal Scroll */}
            <div className="block lg:hidden">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Categories</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {/* All Categories Tab */}
                  <button
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${!selectedSubcategory
                      ? "bg-orange-500 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                      }`}
                    onClick={() => setSelectedSubcategory(null)}
                  >
                    All ({cardData.length})
                  </button>

                  {/* Individual Category Tabs */}
                  {subcategories.map((subcat) => {
                    const isActive = selectedSubcategory === subcat.slug;
                    const packageCount = cardData.filter(pkg => pkg.subCategoryId?.slug === subcat.slug).length;

                    return (
                      <button
                        key={subcat._id}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${isActive
                          ? "bg-orange-500 text-white"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        onClick={() => setSelectedSubcategory(subcat.slug)}
                      >
                        {subcat.name} ({packageCount})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Sidebar - Vertical */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-16">
                <div className="bg-white rounded-sm overflow-hidden">
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
                          className={`w-full text-left px-4 py-3 rounded-sm transition-all duration-200 ${!selectedSubcategory
                            ? "bg-orange-500/10 text-orange-500 border border-orange-500"
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
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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
                                ? "bg-orange-500/10 text-orange-500 border border-orange-500"
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
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {/* Content Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
                      {selectedSubcategory
                        ? subcategories.find(s => s.slug === selectedSubcategory)?.name
                        : "All Packages"
                      }
                    </h2>
                    <p className="text-slate-600 mt-1 text-sm sm:text-base">
                      {filteredPackages.length} packages found
                      {selectedSubcategory && (
                        <span className="ml-2 text-orange-600 cursor-pointer hover:underline" onClick={() => setSelectedSubcategory(null)}>
                          · View all categories
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Category Description (if selected) */}
                {selectedSubcategory && activeSubcategory?.description && (
                  <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 sm:p-6 mb-4 sm:mb-6">
                    <div
                      className="text-slate-700 leading-relaxed text-sm sm:text-base"
                      id="editor" dangerouslySetInnerHTML={{ __html: activeSubcategory.description }}
                    />
                  </div>
                )}
              </div>

              {/* Packages Grid */}
              {filteredPackages.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="max-w-md mx-auto px-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">No packages found</h3>
                    <p className="text-slate-500 text-sm sm:text-base">
                      {selectedSubcategory
                        ? "No packages available in this category."
                        : "No packages available at this time."
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {filteredPackages.map((card, index) => {
                    if (!card) return null;

                    return (
                      <div
                        key={card._id || `card-${index}`}
                        className="bg-white border relative border-slate-200 rounded-sm overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200"
                      >
                        {/* Location Badge */}
                        {card.location && (
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-md text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-sm">
                              <MapPin className="w-3 h-3 mr-1 text-orange-600" />
                              <span className="hidden sm:inline">{card.location}</span>
                              <span className="sm:hidden">{card.location.split(',')[0]}</span>
                            </span>
                          </div>
                        )}

                        {/* Image Container */}
                        <div className="relative overflow-hidden h-40 sm:h-48">
                          <img
                            src={card.coverImage || "/placeholder-image.jpg"}
                            alt={card.name || "Travel Package"}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />

                          {/* Price Badge */}
                          {card.price && (
                            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                              <span className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium shadow-lg">
                                ${card.price}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-5">
                          <div className="mb-2 sm:mb-3">
                            <span className="inline-block bg-orange-50 px-2 sm:px-3 py-1 bg-oran-50 text-orange-700 text-xs font-medium rounded-full border border-orange-100">
                              {typeof card.subCategoryId === "object"
                                ? card.subCategoryId?.name
                                : "Adventure"}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight">
                            {card.name || "Unnamed Package"}
                          </h3>

                          <div className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                            <p
                              id="editor" dangerouslySetInnerHTML={{ __html: card?.overview }}
                              className="line-clamp-2"
                            />
                          </div>

                          {/* Action Buttons */}
                          <div className="flex  flex-wrap gap-2 sm:gap-3">
                            <button
                              onClick={() => {
                                openBookingModal(card as any, card.fixedDates?.[0]?._id || null);
                                router.push(`/itinerary/${card.slug}`);
                              }}
                              className="flex-1 bg-[#F05E25] hover:bg-[#E04E1F] text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 text-center text-xs sm:text-sm"
                            >
                              Book Now
                            </button>
                            <Link
                              href={`/itinerary/${card.slug}`}
                              className="flex-1 border border-orange-500 hover:border-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 font-medium py-2.5 px-4 rounded-md transition-all duration-200 text-center text-xs sm:text-sm"
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
