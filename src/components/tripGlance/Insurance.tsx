"use client";

import { ITravelPackage } from "@/types/IPackages";

const Insurance = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <>
            <div
                id="insurance"
                className=" pb-14"
            >
                {/* Insurance */}
                <h2 className="text-2xl font-semibold text-orange-500 text-left ">
                    <span className="w-fit">
                        Travel Insurance
                    </span>
                </h2>
                <p className="text-zinc-600 mt-1 leading-relaxed  mb-8">
                    Comprehensive insurance coverage details to ensure your safety and peace of mind during your adventure.
                </p>
                <div className="space-y-6">
                    {data?.insurance.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4   transition-all duration-200"
                        >
                            <div className="flex-1 min-w-0 ">
                                <h3 className="text-lg font-semibold mb-3">
                                    {item.title}
                                </h3>
                                <div
                                    id="editor"
                                    className="space-y-2 leading-relaxed text-zinc-800"
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Insurance;
