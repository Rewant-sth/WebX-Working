"use client";

import { ITravelPackage } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";

const Requirements = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="requirements"
            className="pt-6 pb-14"
        >
            {/* Requirements */}
            <h2 className="text-3xl font-bold text-orange-500 text-left mb-4 ">
                <span className="w-fit text-2xl font-semibold">
                    Requirements
                </span>
            </h2>
           
            <ReadMore maxHeight="max-h-96" characterLimit={500}>
                <div className="space-y-4">
                    {data?.requirements.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4  transition-all duration-200"
                        >
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[17px] font-semibold mb-2 font-montserrat" style={{ color: '#3A3A3A' }}>
                                    {item.title}
                                </h3>
                                <div id="editor" className="text-[17px] leading-snug font-montserrat text-zinc-800 space-y-4" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </ReadMore>
        </div>
    );
};

export default Requirements;
