
import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { getBlogsById } from "@/service/blogs";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";
import ShareButtons from "@/components/ShareButtons";

// This makes the page statically generated at build time with revalidation
export const revalidate = 3600; // Revalidate every hour

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBlogData(id: string) {
  try {
    const data = await getBlogsById(id);
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getBlogData(id);

  if (!data?.data) {
    return {
      title: 'Blog Not Found | HIGH5 ADVENTURES',
    };
  }

  return {
    title: `${data.data.title} | HIGH5 ADVENTURES`,
    description: data.data.description,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const data = await getBlogData(id);

  if (!data?.data) {
    notFound();
  }

  // Construct the current URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realhimalaya.com';
  const currentUrl = `${baseUrl}/blogs/${id}`;

  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section with Banner */}
        <div className="relative">
          <div className="aspect-[16/9] md:aspect-[21/8] w-full overflow-hidden">
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

          {/* Back Button - Floating */}
          {/* <Link
            href="/blogs"
            className="absolute top-6 left-6 flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-orange-600 transition-all duration-200 rounded-sm font-medium z-10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link> */}
        </div>

        {/* Content Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Article Header */}
            <header className="mb-12">
              {/* Category & Reading Time */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-sm text-sm font-semibold">
                  Adventure Blog
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-sm text-sm">
                  5 min read
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                {data?.data?.title}
              </h1>

              {/* Description */}
              <div
                id="editor" dangerouslySetInnerHTML={{ __html: data?.data?.description }}
                className="text-xl text-gray-600 leading-relaxed mb-8 space-y-3"
              />

              {/* Author & Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6  border-gray-200">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-sm flex items-center justify-center">
                    <img src="/logo/logo.svg" alt="" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xl">REAL HIMALAYA</p>
                    <p className="text-sm text-gray-500">Adventure Specialists</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <time>{data?.data?.date}</time>
                </div>
              </div>
            </header>

            {/* Content */}
            <article className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
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


