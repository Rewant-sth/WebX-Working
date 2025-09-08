"use client";

import { ITravelPackage } from "@/types/IPackages";

const Insurance = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <>
            <div
                id="insurance"
                className=" pb-6"
            >
                {/* Insurance */}
                <h2 className="text-3xl font-bold text-orange-500 text-left ">
                    <span className="w-fit">
                        Travel Insurance
                    </span>
                </h2>
                <p className="text-zinc-600 mt-1 leading-relaxed  mb-8">
                    Comprehensive insurance coverage details to ensure your safety and peace of mind during your adventure.
                </p>
                <div className="space-y-4">
                    {data?.insurance.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4  border-b border-gray-300 pb-6 mb-6 transition-all duration-200"
                        >
                            {/* <div className="size-7">
                                <img src="/icons/insurance.png" alt="insurance icon" />
                            </div> */}
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
