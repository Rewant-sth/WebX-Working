"use client";
import TitleDesc from "@/components/titleDesc/TitleDesc";
import { getBlogs } from "@/service/blogs";
import { IBlog } from "@/types/IBlogs";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Blogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: getBlogs,
  });

  return (
    <>
      <Head>
        <title>All Trekking Blogs & Guides | HighFive Adventures</title>
        <meta
          name="description"
          content="Read expert trekking blogs from HighFive. Get tips, travel guides, route info, and personal stories from Nepal’s most iconic trekking destinations like Everest, Annapurna, Langtang, and more."
        />
        <meta
          name="keywords"
          content="trekking blogs Nepal, HighFive trekking blog, Everest Base Camp tips, Annapurna guide, Nepal hiking stories, trekking routes Nepal, Himalaya travel blog"
        />
      </Head>

      <TitleDesc
        title={"Our Blogs"}
        desc={
          "Dive into expert tips, inspiring travel stories, and must-know guides to make the most of your mountain adventures around the world."
        }
      />
      <div className="py-12 px-4 sm:px-8 md:px-12 lg:px-16 bg-white mx-3">
        <div className="grid md:grid-cols-3 gap-10 xl:gap-14 mt-5">
          {isLoading
            ? [...Array(6)].map((data, idx) => <BlogSkeleton key={idx} />)
            : null}
          {!isLoading && data?.data.length == 0 && (
            <h2>No blogs available. empty data</h2>
          )}
          {!isLoading &&
            data?.data?.map((blog: IBlog) => (
              <Link
                href={`/blogs/${blog._id}`}
                key={blog._id}
                className="bg-white overflow-hidden text-left group"
              >
                <div>
                  <h2 className="text-2xl line-clamp-2 font-bold text-gray-800 mb-2 hover:text-[#155DFC] transition-colors cursor-pointer">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                </div>
                <div className="overflow-hidden">
                  <Image
                    src={blog.banner}
                    alt={blog.title}
                    className="w-full h-65 object-cover cursor-pointer rounded-2xl"
                    height={1000}
                    width={1000}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;

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
