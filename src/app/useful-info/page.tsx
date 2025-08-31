"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Info, BookOpen, Clock, ChevronRight } from "lucide-react";
import api from "@/service/api";

// Types
interface UsefulInfoItem {
    _id: string;
    name: string;
    description: string;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface UsefulInfoResponse {
    status: string;
    data: UsefulInfoItem[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasNext: boolean;
        hasPrev: boolean;
        nextPage: number | null;
        previousPage: number | null;
    };
    message: string;
}

// Skeleton Component
const UsefulInfoSkeleton = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-sm flex-shrink-0"></div>
            <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    </div>
);

const UsefulInfoPage = () => {
    // Fetch useful info data
    const {
        data: usefulInfoData,
        isLoading,
        isError,
        error
    } = useQuery<UsefulInfoResponse>({
        queryKey: ["useful-info"],
        queryFn: async () => {
            const response = await api.get("/useful-info");
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // Sort data by sortOrder
    const sortedData = usefulInfoData?.data?.sort((a, b) => a.sortOrder - b.sortOrder) || [];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen pt-[5rem] max-w-[1300px] mx-auto  ">

            <h2 className="text-2xl md:text-3xl font-semibold uppercase max-w-lg mx-auto text-center">some information that might help you</h2>

            <div className=" gap-p  mt-4 px-4 lg:px-0 ">
                {usefulInfoData?.data?.map((data, idx) => (
                    <div className="relative border-b flex flex-col md:flex-row gap-4 border-zinc-300 py-6       ">
                        <div className="w-22 text-3xl font-semibold shrink-0">
                            {idx < 9 ? `0${idx + 1}` : idx + 1}
                        </div>
                        <div className="">
                            <h3 className="text-xl mb-2 font-semibold">{data.name}</h3>
                            <div className="editor" id="editor" dangerouslySetInnerHTML={{ __html: data.description }}></div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default UsefulInfoPage;
