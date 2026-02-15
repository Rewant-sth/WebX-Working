"use client";

import { ITravelPackage } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";


const WhyLoveThis = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="why-love-this"
            className="border-zinc-200 pt-6 pb-14"
        >
            {/* Why Love This */}
            <h2 className="text-2xl  text-orange-500 text-left mb-4 ">
                <span className="w-fit  font-semibold">
                    Why You'll Love This
                </span>
            </h2>
            
            <ReadMore maxHeight="max-h-96" characterLimit={500}>
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
                                <h3 className="text-[17px] font-semibold mb-1 font-montserrat" style={{ color: '#3A3A3A' }}>
                                    {item.title}
                                </h3>
                                <div
                                    className="text-[17px] space-x-4 leading-snug font-montserrat text-zinc-800"
                                    id="editor" 
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </ReadMore>
        </div>
    );
};

export default WhyLoveThis;
