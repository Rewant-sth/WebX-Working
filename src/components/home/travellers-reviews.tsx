"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface ExternalReview {
    id: string;
    author: string;
    avatarUrl?: string;
    rating: number; // 1-5
    text: string;
    source: "google" | "tripadvisor";
    url?: string; // link to original
    time: string; // ISO
}

// Small star rating renderer
const Stars = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-0.5" aria-label={`Rating ${rating} of 5`}>
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < Math.round(rating);
                return (
                    <svg
                        key={i}
                        viewBox="0 0 20 20"
                        className={`h-4 w-4 ${filled ? "fill-yellow-400 text-yellow-400" : "fill-none text-yellow-400"} stroke-yellow-400`}
                    >
                        <path
                            strokeWidth={1.2}
                            d="M10 2.5l2.3 4.67 5.15.75-3.72 3.63.88 5.13L10 14.96l-4.61 2.42.88-5.13L2.55 7.92l5.15-.75z"
                        />
                    </svg>
                );
            })}
        </div>
    );
};

// Fetch helpers (hit our Next.js API routes)
async function fetchGoogleReviews(): Promise<ExternalReview[]> {
    const res = await fetch("/api/google-reviews", { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Failed to load Google reviews");
    return res.json();
}

async function fetchTripAdvisorReviews(): Promise<ExternalReview[]> {
    const res = await fetch("/api/tripadvisor-reviews", { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Failed to load TripAdvisor reviews");
    return res.json();
}

export default function TravellerReview() {
    const [active, setActive] = useState<"google" | "tripadvisor">("google");

    const googleQuery = useQuery({
        queryKey: ["google-reviews"],
        queryFn: fetchGoogleReviews,
        staleTime: 5 * 60 * 1000,
    });

    const tripQuery = useQuery({
        queryKey: ["tripadvisor-reviews"],
        queryFn: fetchTripAdvisorReviews,
        staleTime: 5 * 60 * 1000,
        enabled: active === "tripadvisor", // lazy fetch
    });

    const loading = active === "google" ? googleQuery.isLoading : tripQuery.isLoading;
    const error = active === "google" ? googleQuery.error : tripQuery.error;
    const data = active === "google" ? googleQuery.data : tripQuery.data;

    return (
        <section id="travellers-reviews" className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="px-4 lg:px-16 mx-auto ">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Traveller Reviews</h2>
                        <p className="text-gray-600 mt-2 max-w-xl text-sm md:text-base">
                            Real experiences shared by our guests. Pulled directly from Google and TripAdvisor so you
                            can book with confidence.
                        </p>
                    </div>
                    <div className="inline-flex rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
                        <button
                            className={`px-4 py-2 text-sm font-medium transition-colors ${active === "google" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => setActive("google")}
                        >
                            Google
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 ${active === "tripadvisor" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => setActive("tripadvisor")}
                        >
                            TripAdvisor
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="min-h-[280px]">
                    {loading && (
                        <div className="grid gap-6 md:grid-cols-3 animate-pulse">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-12 w-12 rounded-full bg-gray-200" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-1/2 bg-gray-200 rounded" />
                                            <div className="h-3 w-1/3 bg-gray-200 rounded" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-gray-200 rounded" />
                                        <div className="h-3 bg-gray-200 rounded w-5/6" />
                                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {error && !loading && (
                        <div className="text-red-600 text-sm">
                            {(error as Error).message} – configure API keys to load live reviews.
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid gap-6 md:grid-cols-2">
                            {data && data.length > 0 ? (
                                data.slice(0, 6).map((r) => (
                                    <article
                                        key={r.id}
                                        className=" rounded-sm min-h-[44dvh] bg-white relative  border border-gray-100 flex flex-col justify-end items-end"
                                    >
                                        <div className="absolute inset-0">
                                            <Image src={r.avatarUrl as string} alt={r.author} layout="fill" className="object-cover rounded-sm" />
                                        </div>

                                        <div className="h-full w-full relative shrink-0 ">
                                            <div className="absolute inset-0">
                                                <Image src={"/cloud_3.webp"} alt={r.author} layout="fill" className="object-cover rounded-sm" />
                                            </div>
                                        </div>

                                    </article>
                                ))
                            ) : (
                                <div className="col-span-full text-sm text-gray-500">No reviews available.</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-10 flex flex-wrap gap-4 text-xs text-gray-500">
                    <p>
                        Want your feedback here? Leave us a review on {" "}
                        <a
                            href="#"
                            className="underline decoration-dotted underline-offset-2 hover:text-gray-700"
                        >
                            Google
                        </a>{" "}
                        or {" "}
                        <a
                            href="#"
                            className="underline decoration-dotted underline-offset-2 hover:text-gray-700"
                        >
                            TripAdvisor
                        </a>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
}
