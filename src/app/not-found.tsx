import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-5xl font-bold mb-4 text-orange-500">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-center max-w-md text-gray-600">
        Oops! The page you are looking for does not exist or has been moved.
        Let us guide you back to the adventure!
      </p>
      <Link href="/">
        <span className="inline-block px-6 py-3 bg-orange-500 text-white rounded shadow hover:bg-orange-600 transition">
          Go Home
        </span>
      </Link>
    </div>
  );
}
