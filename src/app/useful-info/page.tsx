"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Info, Search, Plus, Minus } from "lucide-react";
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
    // local UI state
    const [query, setQuery] = useState<string>("");
    const [openId, setOpenId] = useState<string | null>(null);

    // Fetch useful info data
    const {
        data: usefulInfoData,
        isLoading,
        isError,
        error,
    } = useQuery<UsefulInfoResponse>({
        queryKey: ["useful-info"],
        queryFn: async () => {
            const response = await api.get("/useful-info");
            return response.data as UsefulInfoResponse;
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // Sort data by sortOrder (make a copy first)
    const sortedData = usefulInfoData?.data?.slice().sort((a, b) => a.sortOrder - b.sortOrder) || [];

    // Filtered by search query (name + description)
    const filteredData = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return sortedData;
        return sortedData.filter((item) => {
            return (
                item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q)
            );
        });
    }, [sortedData, query]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen pt-[6rem] p-6 mx-auto">

            <p className="text- mb-2">Quick Informations</p>
            <h2 className="text-2xl mb-10  md:text-3xl  font-semibold uppercase  ">some <span className="">information</span> that might help you</h2>

            <div className="grid grid-cols-5 gap-8 lg:gap-14">
                <div className="col-span-3">
                    {isLoading && (
                        <div className="space-y-4">
                            <UsefulInfoSkeleton />
                            <UsefulInfoSkeleton />
                            <UsefulInfoSkeleton />
                        </div>
                    )}

                    {isError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded">Something went wrong: {(error as any)?.message || 'Failed to load.'}</div>
                    )}

                    {!isLoading && !isError && filteredData.length === 0 && (
                        <div className="p-6 text-gray-500">No results found for "{query}"</div>
                    )}

                    {!isLoading && !isError && filteredData.map((item) => {
                        const isOpen = openId === item._id;
                        return (
                            <div key={item._id} className="relative flex transition-all duration-300 flex-col gap-2 border-zinc-300 border-b py-4">
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={`panel-${item._id}`}
                                    onClick={() => setOpenId(isOpen ? null : item._id)}
                                    className="flex items-center justify-between w-full text-left"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* <div className="w-10 flex-shrink-0 mt-1 text-orange-500">
                                            <Info />
                                        </div> */}
                                        <div>
                                            <h3 className="text-xl capitalize lg:pr-6 max-w-xl w-full">{item.name}</h3>
                                        </div>
                                    </div>

                                    <div className="ml-4 flex items-center text-gray-600">
                                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </button>

                                <div
                                    id={`panel-${item._id}`}
                                    className="mt-3 prose max-w-none text-gray-700 pl-14 overflow-hidden transition-[max-height] duration-300 ease-in-out"
                                    style={{ maxHeight: isOpen ? '600px' : '0px' }}
                                    aria-hidden={!isOpen}
                                >
                                    <div className={`pt-2 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-4 flex col-span-2 w-full  justify-between  flex-col">
                    <div className="lg:sticky lg:top-20 w-full bg-white pb-4">
                        <div className="border    relative border-gray-300 w-full max-w-sm p-2 hover:border-orange-500 rounded-full">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                type="text"
                                name="usefulSearch"
                                id="usefulSearch"
                                placeholder="Search..."
                                className="w-full peer h-full border-none outline-none px-4 pr-6 bg-transparent"
                            />
                            <div className="absolute text-gray-500 top-1/2 right-5 peer-focus:border-red-500 -translate-y-1/2">
                                <Search />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae nisi, ratione quasi nesciunt necessi Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsefulInfoPage;
