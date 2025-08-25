"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useQuery } from '@tanstack/react-query';
import api from '@/service/api';
import { IBlog } from '@/types/IBlogs';
import Link from "next/link";

interface BlogsResponse {
  data: IBlog[];
  status: string;
  msg: string;
}

// Fetch blogs from API
const fetchBlogs = async (): Promise<BlogsResponse> => {
  try {
    const response = await api.get('/blog');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export default function QuickInfo() {
  // Fetch blogs using React Query
  const { data: blogsData, isLoading, error } = useQuery<BlogsResponse>({
    queryKey: ['blogs-quick-info'],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get the first 6 blogs for the layout (1+2+3 = 6 cards)
  const blogs = blogsData?.data?.slice(0, 6) || [];

  // Debug logging
  console.log('Quick Info - Blogs data:', blogsData);
  console.log('Quick Info - Filtered blogs:', blogs);

  // Fallback images if no blogs or insufficient blogs
  const fallbackImage = "/three.jpg";

  // Ensure we always have enough content for the layout
  const getImageSource = (index: number) => {
    return blogs[index]?.banner || fallbackImage;
  };

  const getBlogSlug = (index: number) => {
    return blogs[index]?.slug;
  };

  // Handle image load error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackImage;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 w-full">
      <div className="w-11/12 relative mx-auto grid md:grid-cols-3 gap-6 items-center">
        <div className="absolute top-0 left-0">
          <h2 className="text-4xl pb-12 text-left font-semibold max-w-3xl leading-snug text-gray-900">
            <span className="bg-orange-500 text-white px-4">Understanding</span>{" "}
            Tales of Mountains with Real Himalaya{" "}
            <span className="bg-orange-500 text-white px-4">platforms</span>
          </h2>
        </div>
        {/* Left Side Content */}
        <div className="flex h-full flex-col justify-between ">
          <div className=""> </div>

          <div className="space-y-6">
            {/* Play button + text */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-full border flex items-center justify-center border-gray-900">
                <Play size={22} className="text-gray-900" />
              </div>
              <p className="uppercase tracking-wide text-sm font-semibold text-gray-900">
                Watch the video
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-justify leading-relaxed max-w-xl">
              Discover insider secrets, survival stories, and expert tips from
              seasoned mountaineers. Our curated collection of adventure guides
              will transform your next expedition into an unforgettable journey.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur est amet tempore culpa incidunt? Tempora itaque alias ipsa. Perspiciatis, optio molestias aperiam architecto ullam repudiandae.
            </p>
          </div>
        </div>

        {/* Right Side Custom Layout */}
        <div className="flex col-span-2 gap-4 w-full">
          {/* Column 1 → 1 card */}
          <div className="flex flex-col gap-4 flex-1 justify-end">
            <div className="relative w-full h-48 overflow-hidden rounded-sm group">
              {getBlogSlug(0) ? (
                <Link href={`/blogs/${getBlogSlug(0)}`}>
                  <Image
                    src={getImageSource(0)}
                    alt={blogs[0]?.title || "Blog thumbnail"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Play size={28} className="text-white" />
                  </div>
                </Link>
              ) : (
                <>
                  <Image
                    src={getImageSource(0)}
                    alt="Thumbnail"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Play size={28} className="text-white" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Column 2 → 2 cards */}
          <div className="flex flex-col gap-4 flex-1 justify-end">
            {[...Array(2)].map((_, idx) => {
              const blogIndex = idx + 1; // Start from index 1 (second blog)
              return (
                <div
                  key={idx}
                  className="relative w-full h-48 overflow-hidden rounded-sm group"
                >
                  {getBlogSlug(blogIndex) ? (
                    <Link href={`/blogs/${getBlogSlug(blogIndex)}`}>
                      <Image
                        src={getImageSource(blogIndex)}
                        alt={blogs[blogIndex]?.title || "Blog thumbnail"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Play size={28} className="text-white" />
                      </div>
                    </Link>
                  ) : (
                    <>
                      <Image
                        src={getImageSource(blogIndex)}
                        alt="Thumbnail"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Play size={28} className="text-white" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 3 → 3 cards */}
          <div className="flex flex-col gap-4 flex-1">
            {[...Array(3)].map((_, idx) => {
              const blogIndex = idx + 3; // Start from index 3 (fourth blog)
              return (
                <div
                  key={idx}
                  className="relative w-full h-32 md:h-40 lg:h-48 overflow-hidden rounded-sm group"
                >
                  {getBlogSlug(blogIndex) ? (
                    <Link href={`/blogs/${getBlogSlug(blogIndex)}`}>
                      <Image
                        src={getImageSource(blogIndex)}
                        alt={blogs[blogIndex]?.title || "Blog thumbnail"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Play size={28} className="text-white" />
                      </div>
                    </Link>
                  ) : (
                    <>
                      <Image
                        src={getImageSource(blogIndex)}
                        alt="Thumbnail"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Play size={28} className="text-white" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
