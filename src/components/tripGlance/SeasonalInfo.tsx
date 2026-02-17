"use client";

import { ITravelPackage } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";

interface SeasonalInfoProps {
    data: ITravelPackage;
}

const SeasonalInfo = ({ data }: SeasonalInfoProps) => {
    if (!data.seasonalTrek || data.seasonalTrek.length === 0) return null;

    return (
        <div id="seasonal-info" className="w-full bg-white rounded-xl pt-6 pb-14">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-semibold text-orange-500 text-left ">
                    Best Seasons for {data.name || "This Package"}</h2>
            </div>

            <ReadMore maxHeight="max-h-96" characterLimit={500}>
                <div className="space-y-2">
                    {data.seasonalTrek.map((season) => (
                        <div key={season._id} className="">
                            <h3 className="text-[17px] mb-1 font-montserrat">{season.title}</h3>
                            <div
                                id="editor"
                                className="text-[17px] text-zinc-800 leading-snug font-montserrat"
                                dangerouslySetInnerHTML={{ __html: season.description }}
                            />
                        </div>
                    ))}
                </div>
            </ReadMore>
        </div>
    );
};

export default SeasonalInfo;
