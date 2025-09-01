"use client";

import { ITravelPackage } from "@/types/IPackages";

const Insurance = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <>
            <div
                id="insurance"
                className="border-b  border-gray-200 mb-8 pb-10"
            >
                {/* Insurance */}
                <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
                    <span className="w-fit text-2xl font-semibold">
                        Travel Insurance
                    </span>
                </h2>
                <p className="text-zinc-600 mt-2 leading-relaxed  mb-8">
                    Comprehensive insurance coverage details to ensure your safety and peace of mind during your adventure.
                </p>
                <div className="space-y-4">
                    {data?.insurance.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-6 rounded-sm border border-gray-300 transition-all duration-200"
                        >
                            <div className="size-7">
                                <img src="/icons/insurance.png" alt="insurance icon" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-semibold mb-2">
                                    {item.title}
                                </h3>
                                <div
                                    className="space-y-2 leading-relaxed text-gray-800"
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
