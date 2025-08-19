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
          <div className="relative w-full h-[70vh] overflow-hidden">
            {/* Cover Image with subtle zoom */}
            <div className="absolute inset-0">
              <Image
                src={subcategoryImage}
                alt="Category Cover"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                fill
                priority
              />
            </div>

            {/* Layered Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-indigo-900/20"></div>

            {/* Hero Content with improved layout */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Enhanced badge */}
                <div className="inline-block">
                  <span className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-sm text-slate-700 text-sm font-semibold tracking-wider uppercase rounded-full border border-white/20">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                    </svg>
                    Adventure Awaits
                  </span>
                </div>

                {/* Enhanced title with text shadow */}
                <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                  <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {subcategoryName}
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

        {/* Enhanced Subcategory Navigation */}
        <div className="relative -mt-12 z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-sm border border-slate-200/60 shadow-sm">

              {/* Enhanced tab buttons */}
              <div className="p-6">
                <div className="flex flex-wrap gap-3 justify-center">
                  {subcategories.length === 0 ? (
                    <div className="text-slate-500 py-8 text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>No subcategories available</p>
                    </div>
                  ) : (
                    subcategories.map((subcat, index) => {
                      const isActive = selectedSubcategory === subcat.slug;
                      const packageCount = cardData.filter(pkg => pkg.subCategoryId?.slug === subcat.slug).length;

                      return (
                        <button
                          key={subcat._id}
                          className={`group relative px-6 py-3 rounded-sm font-medium whitespace-nowrap transition-all duration-300 ${isActive
                            ? "bg-blue-600 text-white shadow-md transform scale-105"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
                            }`}
                          onClick={() => setSelectedSubcategory(subcat.slug)}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-sm font-semibold">{subcat.name}</span>
                            <span className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                              {packageCount} packages
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Packages Grid Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Available Packages
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Choose from our curated collection of expedition packages
            </p>
          </div>

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
                  No packages available in this category.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredPackages.map((card, index) => {
              if (!card) return null;

              return (
                <div
                  key={card._id || `card-${index}`}
                  className="bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-slate-300 transition-colors duration-200"
                >
                  {/* Location Badge */}
                  {card.location && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-white text-slate-700 border border-slate-200">
                        <MapPin className="w-3 h-3 mr-1 text-blue-600" />
                        {card.location}
                      </span>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={card.coverImage || "/placeholder-image.jpg"}
                      alt={card.name || "Travel Package"}
                      className="w-full h-full object-cover"
                    />

                    {/* Price Badge */}
                    {card.price && (
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-sm text-sm font-medium">
                          ${card.price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-zinc-800 text-xs font-medium rounded-md border border-blue-100">
                        {typeof card.subCategoryId === "object"
                          ? card.subCategoryId?.name
                          : "Adventure"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-2">
                      {card.name || "Unnamed Package"}
                    </h3>

                    <div className="text-slate-600 text-sm leading-relaxed mb-6">
                      <p
                        dangerouslySetInnerHTML={{ __html: card?.overview }}
                        className="line-clamp-2"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={`/booking/${card.id}`}
                        className="flex-1 bg-[#F05E25]/80 hover:bg-[#F05E25] text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 text-center"
                      >
                        Book Now
                      </Link>
                      <Link
                        href={`/itinerary/${card.slug}`}
                        className="flex-1 border border-[#01283F] hover:border-slate-400 text-[#01283F] hover:text-slate-900 font-medium py-2.5 px-4 rounded-md transition-colors duration-200 text-center hover:bg-[#01283F]/20"
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
    </>
  );
};

export default ExpeditionCards;
