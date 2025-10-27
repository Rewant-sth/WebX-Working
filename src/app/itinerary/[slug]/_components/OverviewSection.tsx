"use client";
import { ITravelPackage } from "@/types/IPackages";
import { useState, useEffect } from "react";

interface OverviewSectionProps {
    packageData: ITravelPackage;
}

const OverviewSection = ({ packageData }: OverviewSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);

    // Check if overview text exceeds 100 characters
    useEffect(() => {
        const textContent = packageData?.overview?.replace(/<[^>]*>/g, '') || '';
        setShowButton(textContent.length > 100);
    }, [packageData?.overview]);

    return (
        <div
            id="overview"
            className="relative    flex justify-center items-center"
        >
            <div className="relative pb-14">
                <h2 className="text-2xl font-semibold text-orange-500 text-left mb-6">
                    Trip Overview
                </h2>
                <div className="rounded-sm bg-zinc-25 transition-all duration-200">
                    <div
                        className={`prose space-y-4 overflow-hidden transition-all duration-500 ease-in-out ${!isExpanded && showButton ? 'max-h-fit line-clamp-4' : 'max-h-none'
                            }`}
                        id="editor"
                        dangerouslySetInnerHTML={{
                            __html: packageData?.overview as string,
                        }}
                    />
                    {showButton && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className=" text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200  mt-2 underline"
                        >
                            {isExpanded ? 'read less' : 'read more'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
