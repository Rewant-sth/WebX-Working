/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getBlogsById } from "@/service/blogs";
import Image from "next/image";
import { Metadata } from "next/types";
import ShareButtons from "@/components/ShareButtons";

// This makes the page statically generated at build time with revalidation
export const revalidate = 3600; // Revalidate every hour

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const data = await getBlogsById(id);
    if (!data?.data) {
      return {
        title: 'Blog Not Found | HIGH5 ADVENTURES',
      };
    }
    return {
      title: `${data.data.title} | HIGH5 ADVENTURES`,
      description: data.data.description,
    };
  } catch {
    return {
      title: 'Blog Not Found | HIGH5 ADVENTURES',
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  
  let data = null;
  try {
    data = await getBlogsById(id);
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  if (!data?.data) {
    notFound();
  }

  // Construct the current URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realhimalaya.com';
  const currentUrl = `${baseUrl}/blogs/${id}`;

  return (
    <>
      <main className="bg-zinc-50 min-h-screen">
        {/* Hero Section with Banner */}
        <div className="relative">
          <div className="aspect-square md:aspect-[21/8] w-full overflow-hidden">
            <Image
              src={data?.data?.banner || "/default-image.jpg"}
              alt={data?.data?.title}
              className="w-full h-full object-cover"
              height={1000}
              width={1000}
              priority
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white mt-10 sm:mt-0">
          <div className="max-w-7xl mx-auto px-4 sm:py-12">
            {/* Article Header */}
            <header className="sm:mb-12">
              {/* Category & Reading Time */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-orange-100 text-orange-500 capitalize px-3 py-1 rounded-sm text-sm font-semibold">
                  Adventure Blog
                </span>
                <span className="bg-orange-100 text-orange-500  capitalize font-semibold px-3 py-1 rounded-sm text-sm">
                  {data?.data?.estimatedReadTime ? data?.data?.estimatedReadTime + " Min Read" : '5 Min Read'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 leading-tight">
                {data?.data?.title}
              </h1>

              {/* Description */}
              <div
                id="editor" dangerouslySetInnerHTML={{ __html: data?.data?.description }}
                className="text-xl text-zinc-600 leading-relaxed mb-8 space-y-3"
              />

              {/* Author & Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6  border-zinc-200">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-sm flex items-center justify-center">
                    <img src="/logo/logo.svg" alt="Real Himalaya" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-xl">REAL HIMALAYA</p>
                    <p className="text-sm text-zinc-500">Adventure Specialists</p>
                  </div>
                </div>
                <div className="text-sm text-zinc-500">
                  <time>{data?.data?.date}</time>
                </div>
              </div>
            </header>

            {/* Content */}
            <article className="prose prose-lg prose-gray max-w-none prose-headings:text-zinc-900 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-zinc-700 prose-p:leading-relaxed prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-900 prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
              <ReactMarkdown>{data?.data?.content}</ReactMarkdown>
            </article>

            {/* Share Section */}
            <ShareButtons
              url={currentUrl}
              title={data?.data?.title}
              description={data?.data?.description}
            />


          </div>
        </div>
      </main>
    </>
  );
};


