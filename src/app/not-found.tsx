"use client";

import Link from "next/link";
import React from "react";

export default function NotFound() {

  return (
    <section className="w-full h-screen bg-white font-serif flex items-center justify-center">
      <div className="w-full max-w-4xl px-4 text-center">
        <h1 className="text-8xl mb-5 text-[#231F20]">404</h1>

        <div
          className="h-[400px] bg-center bg-no-repeat bg-cover flex items-center justify-center"
          style={{
            backgroundImage: "url('/404_error.gif')",
          }}
        ></div>
        <div className="text-[#231F20]">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Look like you're lost
          </h3>
          <p className="mb-4">The page you are looking for is not available!</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-[#025FE0] text-white rounded hover:bg-[#025ee0b6] transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
