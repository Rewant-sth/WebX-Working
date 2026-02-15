"use client";
import { ITravelPackage } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";

interface OverviewSectionProps {
    packageData: ITravelPackage;
}

const OverviewSection = ({ packageData }: OverviewSectionProps) => {
    return (
        <div
            id="overview"
            className="relative pt-6 flex justify-center items-center"
        >
            <div className="relative pb-14">
                <h2 className="text-2xl font-semibold text-orange-500 text-left mb-4">
                    Trip Overview
                </h2>
                <div className="rounded-sm bg-zinc-25 transition-all duration-200">
                    <ReadMore maxHeight="max-h-48" characterLimit={300}>
                        <div
                            className="prose space-y-4 text-[17px] leading-snug font-montserrat"
                            id="editor"
                            dangerouslySetInnerHTML={{
                                __html: packageData?.overview as string,
                            }}
                        />
                    </ReadMore>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
