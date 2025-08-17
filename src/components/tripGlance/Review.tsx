"use client";

import { useState } from "react";
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

  const userReviews = [
    {
      id: 1,
      userName: "John Smith",
      userTitle: "Marketing Director",
      reviewText: "The trip was well-organized and fun!",
      date: "1 month ago",
      rating: 5,
    },
    {
      id: 2,
      userName: "Priya Sharma",
      userTitle: "Travel Blogger",
      reviewText: "Highly recommended for seamless adventures!",
      date: "1 week ago",
      rating: 4,
    },
    {
      id: 3,
      userName: "Daniel Kim",
      userTitle: "Photographer",
      reviewText: "Amazing guides and beautiful views. Loved every moment!",
      date: "2 days ago",
      rating: 5,
    },
    {
      id: 4,
      userName: "Maria Lopez",
      userTitle: "Travel Enthusiast",
      reviewText: "A perfect mix of guided tours and personal time.",
      date: "3 weeks ago",
      rating: 5,
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationKey: ["postTestimonial"],
    mutationFn: postTestimonial,
    onSuccess: (data) =>
      toast.success(data.message || "Review added successfully!"),

    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Something went wrong"),
  });

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

      {/* Reviews */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold" style={{ color: '#3A3A3A' }}>Recent Reviews</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.testimonial.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center  rounded-sm py-12 px-6 text-center" style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}>
              <Icon icon={"bx:happy-heart-eyes"} className="text-6xl mb-4 text-zinc-600" />
              <h2 className="text-xl font-semibold" style={{ color: '#3A3A3A' }}>
                You will be the first to leave a review1
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Be the first to leave a review and share your experience!
              </p>
            </div>
          )}

          {data?.testimonial
            .slice(0, showMoreReviews ? userReviews.length : 4)
            .map((review) => (
              <div
                key={review._id}
                className="p-6 rounded-sm  hover:border-gray-300 transition-all duration-200"
                style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}
              >
                <h2 className="text-lg font-semibold mb-1" style={{ color: '#3A3A3A' }}>
                  {review.fullName}
                </h2>
                <p className="text-sm text-gray-500 mb-3">Traveller</p>

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
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
        </div>

        {!showMoreReviews && userReviews.length > 4 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowMoreReviews(true)}
              className="inline-flex items-center font-medium hover:opacity-80 transition-all duration-200 px-6 py-3 rounded-sm "
              style={{
                color: '#f05e25',
                borderColor: '#f05e25',
                backgroundColor: '#fff5f0'
              }}
            >
              View all {userReviews.length} reviews
              <ChevronDown className="ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Review Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-2" style={{ color: '#3A3A3A' }}>
          Share Your Experience
        </h2>
        <p className="text-gray-600 text-base mb-8">
          We'd love to hear about your journey. Your feedback helps others.
        </p>

        <form onSubmit={handleSubmitReview} className="gap-8 grid lg:grid-cols-2">
          <div className="space-y-4">
            {/* Rating */}
            <div className="p-6 rounded-sm border npm run dev border-gray-200">
              <label className="block text-lg font-semibold mb-4" style={{ color: '#3A3A3A' }}>
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
                className="w-full border border-gray-300 rounded-sm text-base p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                className="w-full border border-gray-300 rounded-sm text-base p-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
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
              <div className="p-4 rounded-sm h-full   bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer flex justify-center items-center">
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

          <div className="pt-4">
            <button
              type="submit"
              disabled={!rating || isPending}
              className={`px-8 py-4 flex justify-center items-center rounded-sm font-semibold text-base transition-all duration-200 ${rating && !isPending
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
