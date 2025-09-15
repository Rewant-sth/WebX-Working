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


  return (
    <div className=" py-12 md:py-20 flex items-center justify-center bg-white px-4 w-full">
      <div className="max-w-7xl w-full relative mx-auto  gap-6 items-center">
        <div className="">
          <h2 className="text-2xl md:text-4xl space-x-1 pb-4 mx-auto font-semibold uppercase max-w-4xl text-center leading-snug text-gray-900">
            Your Mountain
            <span className="bg-orange-500 ml-2 text-white px-2">Guidebook</span>
          </h2>
          <p className="max-w-4xl mx-auto text-center">
            Discover stories, tips, and experiences from the heart of the Himalayas.
            From mountaineering expeditions to cultural journeys, our blogs bring you closer
            to the mountains, the people, and the adventures that make every trip unforgettable.
          </p>
        </div>

        {/* Right Side Custom Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 md:space-y-0 gap-6  mt-14">
          {blogsData?.data?.slice(0, 4).map((data, idx) => {
            if (idx === 0) return (
              <div key={idx} className="lg:col-span-3 relative border border-gray-300 h-full  lg:h-[26rem] p-2 rounded-sm overflow-hidden gap-4 md:gap-6 grid lg:grid-cols-2  w-full">
                <div className="w-full lg:h-full h-[40dvh]  relative rounded-sm overflow-hidden">
                  <Image fill src={data?.banner} alt={data?.title} className="object-cover object-center" />
                </div>
                <div className="flex flex-col justify-center p-4">
                  <div className="">
                    <h2 className="text-xl lg:text-2xl md:text-3xl font-semibold">{data?.title}</h2>
                    <p className="md:text-xl  mt-3 line-clamp-2" id="editor" dangerouslySetInnerHTML={{ __html: data?.description }}></p>
                  </div>

                  <div className="flex pt-10 justify-between">
                    <div className="">
                      <h2 className="uppercase font-semibold">Author</h2>
                      <p className="  mt-1">{data?.author}</p>
                    </div>

                    <div className="">
                      <Link href={`/blogs/${data?.slug}`} className="flex items-center gap-3 cursor-pointer">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center border-gray-900">
                          <Play size={22} className="text-gray-900" />
                        </div>
                        <p className="uppercase tracking-wide text-sm font-semibold text-gray-900">
                          READ MORE
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )

            return (
              <div className="w-full p-2 border border-gray-300 rounded-sm overflow-hidden" key={idx}>
                <div className="w-full aspect-video relative rounded-sm overflow-hidden">
                  <Image fill src={data?.banner} alt={data?.title} className="object-cover" />
                </div>
                <h2 className="md:text-xl font-semibold mt-2">{data?.title}</h2>

                <div className="flex w-full py-3 p-2 justify-between items-center">
                  <h2 className="shrink-0">By: {data?.author}</h2>
                  <div className=" flex w-full  justify-end items-center">
                    <Link href={"/blogs/" + data?.slug} className="flex w-fit  items-center gap-3 cursor-pointer">
                      <div className="w-7 h-7 rounded-full border flex items-center justify-center border-gray-900">
                        <Play size={11} className="text-gray-900" />
                      </div>
                      <p className="uppercase tracking-wide text-sm font-semibold text-gray-900">
                        READ MORE
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
