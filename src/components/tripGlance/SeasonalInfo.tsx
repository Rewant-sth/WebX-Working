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
            <style jsx>{`
                #seasonal-info #editor p,
                #seasonal-info #editor span,
                #seasonal-info #editor div,
                #seasonal-info #editor li,
                #seasonal-info #editor h1,
                #seasonal-info #editor h2,
                #seasonal-info #editor h3,
                #seasonal-info #editor h4,
                #seasonal-info #editor ul,
                #seasonal-info #editor ol {
                    font-size: 16px !important;
                }
            `}</style>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-semibold text-orange-500 text-left ">
                    Best Seasons for {data.name || "This Package"}</h2>
            </div>

            <ReadMore maxHeight="max-h-96" characterLimit={500}>
                <div className="space-y-6">
                    {data.seasonalTrek.map((season) => (
                        <div key={season._id} className="">
                            <h3 className="text-base font-semibold mb-1">{season.title}</h3>
                            <div
                                id="editor"
                                className="text-base text-zinc-800"
                                style={{ fontSize: '16px' }}
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
