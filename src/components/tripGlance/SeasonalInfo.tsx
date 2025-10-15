import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react";

interface SeasonalInfoProps {
    data: ITravelPackage;
}

const SeasonalInfo = ({ data }: SeasonalInfoProps) => {
    if (!data.seasonalTrek || data.seasonalTrek.length === 0) return null;

    return (
        <div id="seasonal-info" className="w-full bg-white rounded-xl  pb-14">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-orange-500 text-left ">
                    Best Seasons for {data.name || "This Package"}</h2>
            </div>

            <div className="space-y-6">
                {data.seasonalTrek.map((season) => (
                    <div key={season._id} className="">
                        <h3 className="text-lg font-bold mb-2">{season.title}</h3>
                        <div
                            className="text-zinc-800 sm:text-lg"
                            dangerouslySetInnerHTML={{ __html: season.description }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeasonalInfo;
