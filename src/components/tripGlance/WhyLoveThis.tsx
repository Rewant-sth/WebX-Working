"use client";

import { ITravelPackage } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";


const WhyLoveThis = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="why-love-this"
            className="border-zinc-200 pt-6 pb-14"
        >
            <style jsx>{`
                #why-love-this #editor p,
                #why-love-this #editor span,
                #why-love-this #editor div,
                #why-love-this #editor li,
                #why-love-this #editor h1,
                #why-love-this #editor h2,
                #why-love-this #editor h3,
                #why-love-this #editor h4,
                #why-love-this #editor ul,
                #why-love-this #editor ol {
                    font-size: 16px !important;
                }
            `}</style>
            {/* Why Love This */}
            <h2 className="text-2xl  text-orange-500 text-left ">
                <span className="w-fit  font-semibold">
                    Why You'll Love This
                </span>
            </h2>
            <p className="text-base text-zinc-800 mt-1 leading-relaxed max-w-2xl mb-6">
                Discover what makes this adventure truly special and unforgettable.
            </p>
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
                                <h3 className="text-base font-semibold mb-1" style={{ color: '#3A3A3A' }}>
                                    {item.title}
                                </h3>
                                <div
                                    className="text-base space-x-4 leading-relaxed text-zinc-800"
                                    id="editor" 
                                    style={{ fontSize: '16px' }}
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
