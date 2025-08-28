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
    <div className="min-h-screen py-20 flex items-center justify-center bg-white px-4 w-full">
      <div className="max-w-7xl w-full relative mx-auto  gap-6 items-center">
        <div className="">
          <h2 className="text-xl md:text-4xl pb-4 mx-auto font-semibold max-w-2xl text-center leading-snug text-gray-900">
            <span className="bg-orange-500 text-white px-4">Explore </span>{" "}
            our latest insights and healing{" "}
            <span className="bg-orange-500 text-white px-4">Journey</span>
          </h2>
          <p className="max-w-3xl mx-auto text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius ducimus fugiat ut consequatur repellendus? Asperiores, soluta mollitia voluptate assumenda voluptatibus harum sed molestiae fugiat nemo.</p>
        </div>

        {/* Right Side Custom Layout */}
        <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mt-14">
          {blogsData?.data?.slice(0, 4).map((data, idx) => {
            if (idx === 0) return (
              <div className="col-span-3 bg-orange-100 h-[26rem] p-2 rounded-sm overflow-hidden gap- grid md:grid-cols-2  w-full">
                <div className="w-full h-full relative rounded-sm overflow-hidden">
                  <Image fill src={data?.banner} alt={data?.title} className="object-cover" />
                </div>
                <div className="flex flex-col justify-between p-4">
                  <div className="">
                    <h2 className="text-3xl font-semibold">{data?.title}</h2>
                    <p className="text-xl  mt-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: data?.description }}></p>
                  </div>

                  <div className="flex justify-between">
                    <div className="">
                      <h2 className="uppercase font-semibold">Author</h2>
                      <p className="text-sm  mt-1">{data?.author}</p>
                    </div>

                    <div className="">
                      <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center border-gray-900">
                          <Play size={22} className="text-gray-900" />
                        </div>
                        <p className="uppercase tracking-wide text-sm font-semibold text-gray-900">
                          READ MORE
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )

            return (
              <div className="w-full ">
                <div className="w-full aspect-video relative rounded-sm overflow-hidden">
                  <Image fill src={data?.banner} alt={data?.title} className="object-cover" />
                </div>
                <h2 className="text-xl font-semibold mt-2">{data?.title}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
