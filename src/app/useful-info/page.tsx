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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-white/10 rounded-full">
                                <Info className="w-12 h-12" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Useful Information
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Essential travel tips, guidelines, and important information to help you plan your perfect adventure in Nepal.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Stats Section */}
                    {/* {usefulInfoData && (
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                                <div className="flex justify-center mb-3">
                                    <BookOpen className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                    {usefulInfoData.pagination.total}
                                </div>
                                <div className="text-gray-600">Information Articles</div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                                <div className="flex justify-center mb-3">
                                    <Clock className="w-8 h-8 text-green-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                    {usefulInfoData.pagination.totalPages}
                                </div>
                                <div className="text-gray-600">Page{usefulInfoData.pagination.totalPages > 1 ? 's' : ''}</div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                                <div className="flex justify-center mb-3">
                                    <Info className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                    Updated
                                </div>
                                <div className="text-gray-600">Regularly</div>
                            </div>
                        </div>
                    )} */}

                    {/* Content Section */}
                    <div className="space-y-6">
                        {isLoading ? (
                            // Loading State
                            <>
                                {[...Array(5)].map((_, index) => (
                                    <UsefulInfoSkeleton key={index} />
                                ))}
                            </>
                        ) : isError ? (
                            // Error State
                            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                                <div className="text-red-600 mb-4">
                                    <Info className="w-12 h-12 mx-auto" />
                                </div>
                                <h3 className="text-lg font-semibold text-red-800 mb-2">
                                    Failed to Load Information
                                </h3>
                                <p className="text-red-600">
                                    {error instanceof Error ? error.message : "Something went wrong while fetching the useful information."}
                                </p>
                            </div>
                        ) : sortedData.length === 0 ? (
                            // Empty State
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                                <div className="text-gray-400 mb-4">
                                    <BookOpen className="w-12 h-12 mx-auto" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    No Information Available
                                </h3>
                                <p className="text-gray-600">
                                    We're working on adding useful information for travelers. Please check back soon!
                                </p>
                            </div>
                        ) : (
                            // Data Content
                            <>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        Essential Travel Information
                                    </h2>
                                    <p className="text-gray-600">
                                        Here's everything you need to know for your trip to Nepal. This information is regularly updated to ensure accuracy.
                                    </p>
                                </div>

                                {sortedData.map((item, index) => (
                                    <div
                                        key={item._id}
                                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                                    <span className="text-blue-600 font-bold text-lg">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {formatDate(item.updatedAt)}
                                                    </div>
                                                </div>
                                                <div className="text-gray-700 leading-relaxed">
                                                    {item.description.split('\n').map((paragraph, idx) => (
                                                        <p key={idx} className={idx > 0 ? "mt-3" : ""}>
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Additional Info */}
                    {usefulInfoData && sortedData.length > 0 && (
                        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-start gap-3">
                                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-blue-800 mb-2">
                                        Need More Information?
                                    </h4>
                                    <p className="text-blue-700 mb-3">
                                        This information is updated regularly to ensure you have the most current travel guidelines and tips.
                                        Last updated: {formatDate(sortedData[0]?.updatedAt || new Date().toISOString())}
                                    </p>
                                    <p className="text-blue-600 text-sm">
                                        {usefulInfoData.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsefulInfoPage;
