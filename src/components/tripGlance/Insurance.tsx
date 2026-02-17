"use client";

import { ITravelPackage } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";

const Insurance = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <>
            <div
                id="insurance"
                className="pt-6 pb-14"
            >
                {/* Insurance */}
                <h2 className="text-2xl font-semibold text-orange-500 text-left pb-4 ">
                    <span className="w-fit">
                        Travel Insurance
                    </span>
                </h2>

                <ReadMore maxHeight="max-h-96" characterLimit={500}>
                    <div className="space-y-4">
                        {data?.insurance.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4   transition-all duration-200"
                            >
                                <div className="flex-1 min-w-0 ">
                                    <h3 className="text-[17px] mb-1 font-montserrat">
                                        {item.title}
                                    </h3>
                                    <div
                                        id="editor"
                                        className="text-[17px] space-y-2 leading-snug font-montserrat text-zinc-800"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </ReadMore>
            </div>
        </>
    );
};

export default Insurance;
