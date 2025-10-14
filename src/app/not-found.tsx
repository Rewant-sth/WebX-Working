import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-zinc-800">
      <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-orange-500">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-center max-w-md text-zinc-600">
        Oops! The page you are looking for does not exist or has been moved.
        Let us guide you back to the adventure!
      </p>
      <Link href="/">
        <span className="flex gap-2 items-center text-orange-500   transition">
          <ArrowLeft className="size-5" /> Go Home
        </span>
      </Link>
    </div>
  );
}
