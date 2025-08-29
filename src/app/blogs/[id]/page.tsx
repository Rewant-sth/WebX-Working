
import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { getBlogsById } from "@/service/blogs";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";

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
            <div className="mt-6 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
                  Share this article
                </h3>
                <div className="flex space-x-4">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    Twitter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-sm hover:bg-blue-900 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.386" />
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </main>
    </>
  );
};


