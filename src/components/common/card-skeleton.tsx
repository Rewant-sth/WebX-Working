import React from 'react'

export default function CardSkeleton({ idx }: { idx: number }) {
    return (
        <div
            key={idx}
            className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white animate-pulse"
        >
            <div className="w-full aspect-video relative bg-gray-200">
                {/* Price badge */}
                <div className="absolute top-2 left-2 z-10 h-10 w-28 bg-white rounded-full"></div>

                {/* Booking Open Ribbon */}
                {idx % 2 === 0 && (
                    <div className="absolute right-0 top-0 h-16 w-20 z-10">
                        <div className="absolute transform rotate-45 bg-blue-300 text-white font-semibold py-1.5 right-[-35px] top-[36px] w-[190px]"></div>
                    </div>
                )}
            </div>

            <div className="p-4 space-y-4">
                <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
                <div className="h-4 bg-gray-300 w-full rounded"></div>
                <div className="h-4 bg-gray-300 w-5/6 rounded"></div>

                <div className="flex gap-4 mt-6">
                    <div className="h-10 w-32 bg-gray-300 rounded-sm"></div>
                    <div className="h-10 w-24 bg-gray-300 rounded-sm"></div>
                </div>
            </div>
        </div>
    )
}
