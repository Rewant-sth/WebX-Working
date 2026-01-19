"use client";

import { ITravelPackage } from "@/types/IPackages";


const WhyLoveThis = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="why-love-this"
            className="border-zinc-200 pt-6 pb-14"
        >
            {/* Why Love This */}
            <h2 className="text-2xl  text-orange-500 text-left ">
                <span className="w-fit  font-semibold">
                    Why You'll Love This
                </span>
            </h2>
            <p className="text-zinc-600 mt-1 leading-relaxed max-w-2xl mb-6">
                Discover what makes this adventure truly special and unforgettable.
            </p>
            <div className="space-y-4">
                {data?.whyLoveThisTrek.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4  pb-8 border-b border-zinc-200 transition-all duration-200"
                    >
                        <div className="size-8">
                            <img src="/icons/heart.png" alt="attraction icon" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold " style={{ color: '#3A3A3A' }}>
                                {item.title}
                            </h3>
                            <div
                                className=" space-x-4  leading-relaxed text-zinc-600"
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
