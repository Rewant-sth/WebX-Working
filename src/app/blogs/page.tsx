import { getBlogs } from "@/service/blogs";
import { IBlog } from "@/types/IBlogs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// This makes the page statically generated at build time
export const revalidate = 3600; // Revalidate every hour

async function getBlogsData() {
  try {
    const data = await getBlogs();
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
      <div className="py-12 px-4 sm:px-8 md:px-12 lg:px-16 bg-white mx-3">

        <div className="grid md:grid-cols-3 gap-10  mt-5">
          <Suspense fallback={<BlogsSkeletonGrid />}>
            {data?.data.length === 0 && (
              <h2>No blogs available. empty data</h2>
            )}
            {data?.data?.map((blog: IBlog) => (
              <Link
                href={`/blogs/${blog._id}`}
                key={blog._id}
                className="bg-white overflow-hidden text-left group"
              >
                <div className="flex gap-2 capitalize items-center pb-2">
                  <span className="bg-orange-100 text-orange-500 py-1 px-4 rounded-sm text-sm font-semibold">
                    4 min reading
                  </span>
                  <span className="bg-orange-100 text-orange-500 py-1 px-4 rounded-sm text-sm font-semibold">
                    Expedition
                  </span>
                </div>
                <div className="overflow-hidden">
                  <Image
                    src={blog.banner}
                    alt={blog.title}
                    className="w-full h-65 object-cover cursor-pointer rounded-sm"
                    height={1000}
                    width={1000}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-xl line-clamp-2 font-bold text-gray-800 mb-2 hover:text-[#155DFC] transition-colors cursor-pointer">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {blog.description}
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
