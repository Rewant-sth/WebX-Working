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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section with Enhanced Visuals */}
        <div className="relative">
          <div className="relative w-full h-[80vh] overflow-hidden">
            {/* Cover Image with Parallax Effect */}
            <div className="absolute inset-0 transform scale-105">
              <Image
                src={subcategoryImage}
                alt="Category Cover"
                className="w-full h-full object-cover"
                fill
                priority
              />
            </div>

            {/* Enhanced Overlay with Better Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-indigo-900/20"></div>
            </div>

            {/* Hero Content with Better Typography */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="inline-block">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium tracking-wide uppercase">
                    Adventure Awaits
                  </span>
                </div>

                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="">
                    {subcategoryName}
                  </span>
                </h1>

                <div className="max-w-4xl mx-auto">
                  <p
                    className="text-white/90 text-lg md:text-xl line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: subcategoryDescription }}
                  />
                </div>

                <div className="flex justify-center ">
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}

          </div>
        </div>

        {/* Enhanced Subcategory Navigation */}
        <div className="relative -mt-16 z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="bg-gradient-to-l from-blue-800 to-blue-500 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {subcategories.length === 0 ? (
                  <div className="text-slate-500 italic py-4">
                    No subcategories available
                  </div>
                ) : (
                  subcategories.map((subcat) => (
                    <button
                      key={subcat._id}
                      className={`group relative px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${selectedSubcategory === subcat.slug
                        ? "bg-white text-blue-600 border"
                        : "bg-transparent text-white border"
                        }`}
                      onClick={() => setSelectedSubcategory(subcat.slug)}
                    >
                      <span className="relative z-10">{subcat.name}</span>
                      {selectedSubcategory === subcat.slug && (
                        <div className="absolute inset-0  rounded-xl opacity-100"></div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Packages Grid Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Discover Your Perfect Adventure
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Choose from our carefully curated collection of expedition packages designed for every adventurer
            </p>
          </div>

          {filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No packages found</h3>
                <p className="text-slate-500">
                  No packages found in this subcategory. Try selecting a different category.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPackages.map((card, index) => {
                if (!card) return null;

                return (
                  <div
                    key={card._id || `card-${index}`}
                    className="group relative bg-white rounded-xl overflow-hidden  transition-all duration-500 transform  border border-slate-200/50 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Location Badge */}
                    {card.location && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-700 shadow-lg">
                          <MapPin className="w-3 h-3 mr-1 text-blue-500" />
                          {card.location}
                        </span>
                      </div>
                    )}



                    {/* Image Container */}
                    <div className="relative overflow-hidden h-60">
                      <img
                        src={card.coverImage || "/placeholder-image.jpg"}
                        alt={card.name || "Travel Package"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Price Badge (if available) */}
                      {card.price && (
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ${card.price}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
                            {typeof card.subCategoryId === "object"
                              ? card.subCategoryId?.name
                              : "Adventure"}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {card.name || "Unnamed Package"}
                        </h3>

                        <div className="text-slate-600 text-sm leading-relaxed mb-4">
                          <p
                            dangerouslySetInnerHTML={{ __html: card?.overview }}
                            className="line-clamp-2"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                          <Link
                            href={`/booking/${card.id}`}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center  transform hover:scale-105"
                          >
                            Book Now
                          </Link>
                          <Link
                            href={`/itinerary/${card.slug}`}
                            className="flex-1 border-2 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center hover:bg-blue-50 transform hover:scale-105"
                          >
                            Details
                          </Link>
                        </div>

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
