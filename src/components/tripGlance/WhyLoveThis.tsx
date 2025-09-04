"use client";

import { ITravelPackage } from "@/types/IPackages";
import { Heart } from "lucide-react";

const WhyLoveThis = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="why-love-this"
            className=" mt-10  border-gray-200  pb-10"
        >
            {/* Why Love This */}
            <h2 className="text-3xl font-bold text-orange-500 text-left ">
                <span className="w-fit  font-semibold">
                    Why You'll Love This
                </span>
            </h2>
            <p className="text-zinc-600 mt-1 leading-relaxed max-w-2xl mb-8">
                Discover what makes this adventure truly special and unforgettable.
            </p>
            <div className="space-y-4">
                {data?.whyLoveThisTrek.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 lg:gap-8 pb-8 border-b border-gray-200 transition-all duration-200"
                    >
                        <div className="size-10">
                            <img src="/icons/heart.png" alt="attraction icon" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold " style={{ color: '#3A3A3A' }}>
                                {item.title}
                            </h3>
                            <div
                                className="text-sm space-x-4  leading-relaxed text-gray-600"
                                id="editor" dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyLoveThis;
