"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaStar,
} from "react-icons/fa";
import {
  ShieldCheck,
  Star,
  ChevronDown,
  ChevronUp,
  Loader,
  Pen,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { postTestimonial } from "@/service/testimonial";
import toast from "react-hot-toast";
import Image from "next/image";
import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function TravellerReview({
  packageId,
  data,
}: {
  packageId: string;
  data: ITravelPackage | undefined;
}) {
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const { mutate, isPending } = useMutation({
    mutationKey: ["postTestimonial"],
    mutationFn: postTestimonial,
    onSuccess: (data) =>
      toast.success(data.message || "Review added successfully!"),

    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Something went wrong"),
  });

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && data?.testimonial && data.testimonial.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % data.testimonial.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, data?.testimonial]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Navigation functions
  const goToNext = () => {
    if (data?.testimonial) {
      setCurrentIndex((prev) => (prev + 1) % data.testimonial.length);
    }
  };

  const goToPrev = () => {
    if (data?.testimonial) {
      setCurrentIndex((prev) => (prev - 1 + data.testimonial.length) % data.testimonial.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get testimonials with proper indexing for carousel
  const getVisibleTestimonials = () => {
    if (!data?.testimonial || data.testimonial.length === 0) return [];

    const testimonials = data.testimonial;
    const length = testimonials.length;

    if (length === 1) return [testimonials[0]];
    if (length === 2) return [testimonials[0], testimonials[1]];

    const prevIndex = (currentIndex - 1 + length) % length;
    const nextIndex = (currentIndex + 1) % length;

    return [
      testimonials[prevIndex],
      testimonials[currentIndex],
      testimonials[nextIndex]
    ];
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("packageId", packageId);
    formData.append("rating", rating.toString());
    formData.append("fullName", fullName);
    formData.append("comment", reviewText);
    if (image) {
      formData.append("image", image);
    }

    mutate(formData as any); // use correct backend handling

    setRating(0);
    setReviewText("");
    setFullName("");
    setImage(null);
  };

  return (
    <div
      id="traveller-review"
      className="border-b max-w-6xl mx-auto border-gray-200 mb-8 pb-10"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
          <span className="w-fit text-2xl font-semibold">
            Traveller Reviews
          </span>
        </h2>
        <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl">
          Hear what our travellers have to say. We're proud to maintain a 5-star
          rating across all platforms.
        </p>
      </div>

      {/* <pre>{JSON.stringify(data?.testimonial, null, 2)}</pre> */}

      {/* Reviews Carousel */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold" style={{ color: '#3A3A3A' }}>Recent Reviews</h3>

          {data?.testimonial && data.testimonial.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title={isPlaying ? "Pause autoplay" : "Start autoplay"}
              >
                <Icon
                  icon={isPlaying ? "ph:pause-fill" : "ph:play-fill"}
                  className="w-4 h-4"
                  style={{ color: '#f05e25' }}
                />
              </button>

              <button
                onClick={goToPrev}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                disabled={data.testimonial.length <= 1}
              >
                <ChevronLeft className="w-4 h-4" style={{ color: '#f05e25' }} />
              </button>

              <button
                onClick={goToNext}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                disabled={data.testimonial.length <= 1}
              >
                <ChevronRight className="w-4 h-4" style={{ color: '#f05e25' }} />
              </button>
            </div>
          )}
        </div>

        {data?.testimonial.length === 0 && (
          <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-slate-50 to-gray-50  p-8 text-center group  transition-all duration-500 ease-out">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-12 h-12 bg-orange-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-6 right-8 w-8 h-8 bg-blue-100 rounded-full opacity-30 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute top-1/2 right-4 w-6 h-6 bg-green-100 rounded-full opacity-25 group-hover:scale-125 transition-transform duration-600"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10">
              <div className="mb-6 transform group-hover:scale-105 transition-transform duration-500">
                <div className="relative inline-block">
                  <div className="w-50 flex items-center justify-center mb-4 mx-auto">
                    <img src="/icons/stars.png" alt="stars" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Be the First Reviewer!
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                  Share your amazing journey and help future travellers discover this incredible experience
                </p>
              </div>


              {/* Subtle encouragement text */}
              <div className="mt-6 p-4 bg-white w-fit mx-auto rounded-lg border border-white/50 backdrop-blur-sm">
                <p className="text-xs text-gray-500 italic">
                  💡 Your review helps others make informed decisions and supports local communities
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Carousel Container */}
        {data?.testimonial && data.testimonial.length > 0 && (
          <div className="relative">
            <div className="flex items-center bg-black  justify-center gap-4 overflow-hidden">
              {getVisibleTestimonials().map((review, index) => {
                const isCenter = data.testimonial.length >= 3 ? index === 1 : index === 0;
                const isSide = data.testimonial.length >= 3 && index !== 1;

                return (
                  <div
                    key={review._id}
                    className={`transition-all  aspect-video duration-500 ease-in-out ${isCenter}`}
                  >
                    <div
                      className="p-6 rounded-lg border hover:shadow-lg transition-all duration-300 h-full"
                      style={{
                        backgroundColor: isCenter ? '#ffffff' : '#fafafa',
                        borderColor: isCenter ? '#f05e25' : '#f0f0f0',
                        borderWidth: isCenter ? '2px' : '1px'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                          {review.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold" style={{ color: '#3A3A3A' }}>
                            {review.fullName}
                          </h3>
                          <p className="text-sm text-gray-500">Traveller</p>
                        </div>
                      </div>

                      <div className="flex gap-1 items-center mb-4">
                        {[...Array(5)].map((_, key) => (
                          <Star
                            key={key}
                            size={16}
                            style={{
                              color: key < review.rating ? '#f05e25' : '#e5e7eb',
                              fill: key < review.rating ? '#f05e25' : '#e5e7eb'
                            }}
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium" style={{ color: '#f05e25' }}>
                          {review.rating}.0
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots indicator */}
            {data.testimonial.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {data.testimonial.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                      ? 'scale-110'
                      : 'hover:scale-105'
                      }`}
                    style={{
                      backgroundColor: index === currentIndex ? '#f05e25' : '#e5e7eb'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold" style={{ color: '#3A3A3A' }}>Video Reviews</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <iframe className="w-full" height="315" src="https://www.youtube-nocookie.com/embed/hWp06RX_5pw?si=M-8SNKmsGTzQ45nv" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <iframe className="w-full" height="315" src="https://www.youtube-nocookie.com/embed/hWp06RX_5pw?si=M-8SNKmsGTzQ45nv" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <iframe className="w-full" height="315" src="https://www.youtube-nocookie.com/embed/hWp06RX_5pw?si=M-8SNKmsGTzQ45nv" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

    </div>
  );
}
