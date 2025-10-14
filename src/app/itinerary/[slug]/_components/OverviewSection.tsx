"use client";
import { ITravelPackage } from "@/types/IPackages";

interface OverviewSectionProps {
    packageData: ITravelPackage;
}

const OverviewSection = ({ packageData }: OverviewSectionProps) => {
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
                        className="prose space-y-4   "
                        id="editor"
                        dangerouslySetInnerHTML={{
                            __html: packageData?.overview as string,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
