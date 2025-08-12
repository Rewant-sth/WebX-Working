"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { blogData } from "../../../components/blogData/blogData";
import ReactMarkdown from "react-markdown";
import { MessageSquare, ArrowLeft } from "lucide-react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getBlogsById } from "@/service/blogs";
import Image from "next/image";

const BlogPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["blogById"],
    queryFn: () => getBlogsById(id as string),
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-28 py-20 space-y-8 animate-pulse">
        {/* Back Button */}
        <button
          onClick={() => router.push("/blogs")}
          className="absolute -top-14 left-0 flex items-center text-gray-700 hover:text-blue-500 transition-colors text-base font-semibold"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back to Blogs
        </button>

        {/* Title */}
        <div className="h-10 bg-slate-200 rounded w-3/4"></div>

        {/* Description */}
        <div className="h-6 bg-slate-200 rounded w-1/2"></div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="h-5 w-24 bg-slate-200 rounded"></div>
          <div className="h-5 w-20 bg-slate-200 rounded"></div>
        </div>

        {/* Banner Image */}
        <div className="w-full h-72 md:h-96 xl:h-[30rem] bg-slate-200 rounded-2xl shadow-inner"></div>

        {/* Content */}
        <div className="space-y-4 mt-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 bg-slate-200 rounded w-full"></div>
          ))}
          <div className="h-5 bg-slate-200 rounded w-3/4"></div>
          <div className="h-5 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Blog not found</h2>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{data?.data?.title} | HighFive Blog</title>
        <meta name="description" content={data?.data?.description} />
      </Head>
      <main className="bg-white text-gray-800 py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-[90px]">
        <div className="max-w-7xl mx-auto relative">
          {/* Back Button */}
          <button
            onClick={() => router.push("/blogs")}
            className="absolute -top-14 left-0 flex items-center text-gray-700 hover:text-blue-500 transition-colors text-base font-semibold"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back to Blogs
          </button>

          {/* Title */}
          <h1 className="text-4xl capitalize font-bold mb-4 text-black leading-tight">
            {data?.data?.title}
          </h1>
          {/* Description */}
          <p className="text-lg text-gray-600 mb-6">
            {data?.data?.description}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            <span>
              By:{" "}
              <span className="text-blue-500 font-semibold">
                HIGH5 ADVENTURES
              </span>
            </span>
            <span>{data?.data?.date}</span>
          </div>

          {/* Image */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-gray-200">
            <Image
              src={data?.data?.banner || "/default-image.jpg"}
              alt={data?.data?.title}
              className="w-full h-full object-cover rounded-xl"
              height={1000}
              width={1000}
            />
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none prose-blue space-y-6 text-lg leading-relaxed text-gray-700">
            <ReactMarkdown>{data?.data?.content}</ReactMarkdown>
          </article>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
