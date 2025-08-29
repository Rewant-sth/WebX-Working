"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Star,
  Loader,
  Pen,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { postTestimonial } from "@/service/testimonial";
import toast from "react-hot-toast";
import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function TravellerReview({
  packageId,
  data,
}: {
  packageId: string;
  data: ITravelPackage | undefined;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const { mutate, isPending } = useMutation({
    mutationKey: ["postTestimonial"],
    mutationFn: postTestimonial,
    onSuccess: (data) => {
      toast.success(data.message || "Review added successfully!");
      setShowSuccess(true);
      clearForm();
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    },

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

  // Form validation effect
  useEffect(() => {
    const errors: { [key: string]: string } = {};

    if (fullName && fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters long";
    }

    if (reviewText && reviewText.trim().length < 10) {
      errors.reviewText = "Review must be at least 10 characters long";
    }

    if (rating === 0 && (fullName || reviewText)) {
      errors.rating = "Please select a rating";
    }

    setFormErrors(errors);
    setIsFormValid(
      fullName.trim().length >= 2 &&
      reviewText.trim().length >= 10 &&
      rating > 0 &&
      Object.keys(errors).length === 0
    );
  }, [fullName, reviewText, rating]);

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

    // Clear form after successful submission (will be handled by the success callback)
  };

  // Clear form function
  const clearForm = () => {
    setRating(0);
    setHoverRating(0);
    setReviewText("");
    setFullName("");
    setImage(null);
    setFormErrors({});
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
              <div className="mt-6 p-4 bg-white w-fit mx-auto rounded-sm border border-white/50 backdrop-blur-sm">
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

                return (
                  <div
                    key={review._id}
                    className={`transition-all  aspect-video duration-500 ease-in-out ${isCenter}`}
                  >
                    <div
                      className="p-6 rounded-sm border hover:shadow-lg transition-all duration-300 h-full"
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

      {/* Add Review Form Section */}
      <div className="mt-12 border-t border-gray-200 pt-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold" style={{ color: '#3A3A3A' }}>
              Share Your Experience
            </h3>
            <p className="text-gray-600 mt-2">
              Help future travelers by sharing your journey with us
            </p>
          </div>

        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-green-800">Review Submitted Successfully!</h4>
                <p className="text-sm text-green-600 mt-1">Thank you for sharing your experience. Your review will be published after verification.</p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="ml-auto p-1 hover:bg-green-100 rounded transition-colors"
              >
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitReview} className="space-y-6">

          {/* Rating Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setRating(star);
                    }
                  }}
                  className="p-1 transition-transform duration-150 hover:scale-110 focus:outline-none  focus:ring-orange-300 rounded"
                  aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                >
                  <Star
                    size={32}
                    style={{
                      color: (hoverRating || rating) >= star ? '#f05e25' : '#e5e7eb',
                      fill: (hoverRating || rating) >= star ? '#f05e25' : '#e5e7eb'
                    }}
                    className="transition-colors duration-150"
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-sm font-medium" style={{ color: '#f05e25' }}>
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </span>
              )}
            </div>
            {formErrors.rating && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.rating}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <div className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${formErrors.fullName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  placeholder="Enter your full name"
                />
                {formErrors.fullName && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label
                  htmlFor="reviewText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Review <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="reviewText"
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={5}
                    maxLength={1000}
                    className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none ${formErrors.reviewText
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500'
                      }`}
                    placeholder="Share your experience about the trip, guides, services, and what made it memorable..."
                  />
                  <div className={`absolute bottom-3 right-3 text-xs transition-colors duration-200 ${reviewText.length > 900 ? 'text-orange-600 font-medium' : 'text-gray-400'
                    }`}>
                    {reviewText.length}/1000
                  </div>
                </div>
                {formErrors.reviewText && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.reviewText}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-2 h-full">
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="relative h-full">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="hidden"
                />

                {image ? (
                  <div className="relative group h-full">
                    <div className="w-full full border-2 border-orange-200 rounded-sm overflow-hidden bg-gray-50">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm flex items-center justify-center gap-2">
                      <label
                        htmlFor="profileImage"
                        className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <Pen className="w-4 h-4 text-gray-700" />
                      </label>
                      <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Trash className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="profileImage"
                    className="w-full px-4 py-8 h-[88%] border-2 border-dashed border-gray-300 rounded-sm cursor-pointer hover:border-orange-400 transition-colors duration-200 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-orange-600"
                  >
                    <span className="text-sm font-medium">Choose Profile Picture</span>
                    <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
                  </label>
                )}
              </div>
            </div>
          </div>


          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isPending || !isFormValid}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-200 disabled:to-gray-200 text-white font-semibold rounded-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:cursor-not-allowed min-w-[200px] justify-center flex items-center"
            >
              {isPending ? (
                <>
                  <Loader className="w-5 h-5 mr-3 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Review
                </>
              )}

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            <div className="text-xs text-gray-500 text-center sm:text-left">
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <ShieldCheck className="w-4 h-4" style={{ color: '#f05e25' }} />
                <span>Your review will be verified before publishing</span>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}
