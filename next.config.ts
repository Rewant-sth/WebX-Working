import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      },
      {
        hostname: "images.unsplash.com"
      },{
        protocol: "https",
        hostname: "me7aitdbxq.ufs.sh",
        pathname: "/**"
      }
      ,{
        protocol: "https",
        hostname: "www.wildnatureimages.com",
        pathname: "/**"
      }
      ,{
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
