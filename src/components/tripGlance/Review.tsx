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
      className="border-b border-gray-200 mb-8 pb-10"
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
          <div className="col-span-full flex flex-col items-center justify-center rounded-sm py-12 px-6 text-center" style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}>
            <Icon icon={"bx:happy-heart-eyes"} className="text-6xl mb-4 text-zinc-600" />
            <h2 className="text-xl font-semibold" style={{ color: '#3A3A3A' }}>
              You will be the first to leave a review
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Be the first to leave a review and share your experience!
            </p>
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

        {/* <div className="grid  grid-cols-2">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/kwGYF2gf6gA?si=Ocd8ygKyvAg15wCP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/kwGYF2gf6gA?si=Ocd8ygKyvAg15wCP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div> */}
      </div>


      {/* Review Form */}
      <div>
        <h2 className="text-lg font-semibold mb-1" style={{ color: '#3A3A3A' }}>
          Share Your Experience
        </h2>
        <p className="text-gray-600 text-base mb-6">
          We'd love to hear about your journey. Your feedback helps others.
        </p>

        <form onSubmit={handleSubmitReview} className="gap-8 grid lg:grid-cols-2 pt-6 bg-gray-50 p-4 rounded-sm">
          <div className="space-y-4">
            {/* Rating */}
            <div className="rounded-sm mb-6">
              <label className="block  font-semibold mb-4" style={{ color: '#3A3A3A' }}>
                Rate Your Experience
              </label>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className="cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        className="hidden"
                      />
                      <FaStar
                        size={38}
                        className={`mx-1 transition-all hover:scale-110 ${ratingValue <= (hoverRating || rating)
                          ? "text-orange-500 fill-current"
                          : "text-gray-300"
                          }
                          
                        `}
                        style={{
                          color: ratingValue <= (hoverRating || rating) ? '#f05e25' : '#e5e7eb'
                        }}
                        onMouseEnter={() => setHoverRating(ratingValue)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    </label>
                  );
                })}
                <span className="ml-4 text-xl font-semibold" style={{ color: '#3A3A3A' }}>
                  {rating > 0 ? `${rating}.0` : "0"}
                </span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-base font-semibold mb-3" style={{ color: '#3A3A3A' }}>
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-sm text-base p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Image Upload */}


            {/* Review Text */}
            <div>
              <label className="block text-base font-semibold mb-3" style={{ color: '#3A3A3A' }}>
                Tell us about your experience
              </label>
              <textarea
                placeholder="What did you enjoy most? What could be improved?"
                className="w-full border outline-none border-gray-300 rounded-sm text-base p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="h-full ">
            <label
              htmlFor="image"
              className="block text-base font-semibold mb-3"
              style={{ color: '#3A3A3A' }}
            >
              Moment You Captured (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className="hidden"
            />
            <div className="relative h-[350px]">
              <div className="p-4 rounded-sm h-full    border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer flex justify-center items-center">
                <div className="absolute top-3 right-3 z-10">
                  {image ? (
                    <button
                      type="button"
                      className="text-red-500 bg-white p-2 rounded-md border border-gray-200 hover:bg-gray-50"
                      onClick={() => setImage(null)}
                    >
                      <Trash size={16} />
                    </button>
                  ) : null}
                </div>
                {image ? (
                  <div className="w-full h-full mx-auto relative">
                    <Image
                      fill
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="object-contain rounded-md"
                    />
                  </div>
                ) : (
                  <label
                    htmlFor="image"
                    className="flex flex-col justify-center items-center gap-2 py-8 cursor-pointer"
                  >
                    <Icon
                      icon="stash:image-plus-duotone"
                      width="32"
                      height="32"
                      style={{ color: '#f05e25' }}
                    />
                    <h3 className="font-medium" style={{ color: '#f05e25' }}>
                      Click to add image
                    </h3>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end items-center col-span-2">
            <button
              type="submit"
              disabled={!rating || isPending}
              className={`px-6 py-2 flex justify-center items-center rounded-sm font-semibold text-base transition-all duration-200 ${rating && !isPending
                ? "text-white hover:opacity-90 shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              style={{
                backgroundColor: rating && !isPending ? '#f05e25' : undefined
              }}
            >
              {isPending ? (
                <Loader className="animate-spin mr-2" size={20} />
              ) : null}
              {isPending ? "Submitting..." : "Submit Review"}
            </button>
          </div>


        </form>
      </div>
    </div>
  );
}
