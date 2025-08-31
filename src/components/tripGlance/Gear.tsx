"use client";

import { ITravelPackage } from "@/types/IPackages";
import { Backpack } from "lucide-react";

const Gear = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="gear"
            className="border-b max-w-6xl mx-auto border-gray-200 mb-8 py-10"
        >
            {/* Gear */}
            <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
                <span className="w-fit text-2xl font-semibold">
                    Essential Gear
                </span>
            </h2>
            <p className="text-zinc-600 mt-1 leading-relaxed max-w-2xl mb-8">
                Complete gear list and equipment recommendations for your adventure.
            </p>
            <div className="space-y-4">
                {data?.gearInfo.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-6 rounded-sm border hover:border-gray-300 transition-all duration-200"
                        style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}
                    >
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                                {item.title}
                            </h3>
                            <div
                                className="text-sm leading-relaxed text-gray-600"
                                id="editor" dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gear;
