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
                <style jsx>{`
                    #insurance #editor p,
                    #insurance #editor span,
                    #insurance #editor div,
                    #insurance #editor li,
                    #insurance #editor h1,
                    #insurance #editor h2,
                    #insurance #editor h3,
                    #insurance #editor h4,
                    #insurance #editor ul,
                    #insurance #editor ol {
                        font-size: 16px !important;
                    }
                `}</style>
                {/* Insurance */}
                <h2 className="text-2xl font-semibold text-orange-500 text-left ">
                    <span className="w-fit">
                        Travel Insurance
                    </span>
                </h2>
                <p className="text-base text-zinc-800 leading-relaxed mb-4">
                    Comprehensive insurance coverage details to ensure your safety and peace of mind during your adventure.
                </p>
                <ReadMore maxHeight="max-h-96" characterLimit={500}>
                    <div className="space-y-6">
                        {data?.insurance.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4   transition-all duration-200"
                            >
                                <div className="flex-1 min-w-0 ">
                                    <h3 className="text-base font-semibold mb-1">
                                        {item.title}
                                    </h3>
                                    <div
                                        id="editor"
                                        className="text-base space-y-2 leading-relaxed text-zinc-800"
                                        style={{ fontSize: '16px' }}
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
