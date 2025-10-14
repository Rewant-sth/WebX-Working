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
            <div className="relative  mb-8 pb-10">
                <h2 className="text-2xl uppercase mb-8 font-semibold text-center sm:text-left">
                    Trip Overview
                </h2>
                <div className="rounded-sm bg-zinc-25 transition-all duration-200">
                    <div
                        className="prose space-y-4  prose-lg max-w-none text- leading-relaxed"
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
