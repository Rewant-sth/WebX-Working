import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react";

interface SeasonalInfoProps {
    data: ITravelPackage;
}

const SeasonalInfo = ({ data }: SeasonalInfoProps) => {
    if (!data.seasonalTrek || data.seasonalTrek.length === 0) return null;

    return (
        <div id="seasonal-info" className="w-full bg-white rounded-xl py-6 mt-8">
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-3xl font-bold text-orange-500 text-left mb-3">
                    Best Seasons for Trek</h2>
            </div>

            <div className="space-y-6">
                {data.seasonalTrek.map((season) => (
                    <div key={season._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <h3 className="text-lg font-medium mb-3">{season.title}</h3>
                        <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{ __html: season.description }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeasonalInfo;
