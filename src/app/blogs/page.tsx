import { IBlog } from "@/types/IBlogs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// This makes the page statically generated at build time with ISR
export const revalidate = 3600; // Revalidate every hour (1 hour = 3600 seconds)

async function getBlogsData() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseURL) {
      throw new Error("Backend URL is not configured");
    }

    const response = await fetch(`${baseURL}/blog`, {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { data: [], status: "error", msg: "Failed to fetch blogs" };
  }
}

const Blogs = async () => {
  const data = await getBlogsData();

  return (
    <>
      <div className="py-12 pt-[5rem] px-4 sm:px-8 md:px-12 lg:px-16 bg-white sm:mx-3">

        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
            Adventure Stories & Insights
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover inspiring tales from the Himalayas, expert trekking guides, and exclusive expedition experiences
            from our team of mountain professionals and adventure enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10  mt-5">
          <Suspense fallback={<BlogsSkeletonGrid />}>
            {data?.data.length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-24 sm:px-4 text-center min-h-[60vh]">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4 max-w-lg">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    No Blog Posts Yet
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We're currently working on exciting content about Himalayan adventures, trekking experiences, and expedition stories.
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    Check back soon for inspiring articles and travel insights.
                  </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-sm text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                  </Link>
                  <Link
                    href="/expeditions"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    View Expeditions
                  </Link>
                </div>
              </div>
            )}

            {data?.data?.map((blog: IBlog) => (
              <Link
                href={`/blogs/${blog.slug}`}
                key={blog._id}
                className="bg-white overflow-hidden cursor-pointer text-left group relative z-30"
              >

                <div className="overflow-hidden w-full aspect-video relative">
                  <Image
                    src={blog.banner}
                    alt={blog.title}
                    className="w-full object-cover cursor-pointer rounded-sm"
                    fill
                  />
                </div>

                <div className="flex gap-2 capitalize items-center pt-2">
                  <span className="bg-orange-100 text-orange-500 py-1 px-4 rounded-sm text-sm font-semibold">
                    4 min reading
                  </span>
                  <span className="bg-orange-100 text-orange-500 py-1 px-4 rounded-sm text-sm font-semibold">
                    Expedition
                  </span>
                </div>

                <div className="mt-2">
                  <h2 className="text-xl line-clamp-2 font-bold text-gray-800 mb-2 hover:text-orange-500 transition-colors cursor-pointer">
                    {blog.title}
                  </h2>
                  <p id="editor" dangerouslySetInnerHTML={{ __html: blog.description }} className="text-gray-600 text-sm mb-4 line-clamp-2">
                  </p>
                </div>
              </Link>
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Blogs;

const BlogsSkeletonGrid = () => {
  return (
    <>
      {[...Array(6)].map((_, idx) => <BlogSkeleton key={idx} />)}
    </>
  );
};

const BlogSkeleton = () => {
  return (
    <div className="bg-white overflow-hidden text-left group">
      <div>
        <h2 className="text-2xl rounded-xl h-6 bg-slate-200 animate-pulse  font-bold text-gray-800 mb-2 hover:text-[#155DFC] transition-colors cursor-pointer"></h2>
        <p className="text-gray-600 rounded-xl bg-slate-200 text-sm mb-4 h-6 animate-pulse"></p>
      </div>
      <div className="overflow-hidden">
        <Image
          src={"/default-image.jpg"}
          alt={"default-image"}
          className="w-full border-none outline-none animate-pulse bg-slate-200 h-65 object-cover cursor-pointer rounded-xl"
          height={10}
          width={10}
        />
      </div>
    </div>
  );
};
