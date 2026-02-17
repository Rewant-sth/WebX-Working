"use client";

import { ITravelPackage } from "@/types/IPackages";
import ReadMore from "@/components/ui/ReadMore";


const ImportantNotice = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="important-notice"
            className="pt-6 pb-14"
        >
            {/* Important Notice */}
            <h2 className="text-2xl font-semibold text-orange-500 text-left mb-2">
                <span className="flex items-center gap-2 mb-4">
                    <span>Important Notice</span>
                </span>
            </h2>
            <p className="text-base text-zinc-800 mt-1 leading-relaxed mb-4">
                Important information and notices that you should be aware of before booking your adventure.
            </p>
            <ReadMore maxHeight="max-h-80" characterLimit={500}>
                <div className="space-y-2">
                    {data?.importantNotice.map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-3 items-start bg-white rounded-sm transition-all duration-200"
                        >
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[17px] text-zinc-900 leading-snug font-montserrat mb-1">
                                    {item.title}
                                </h3>
                                <div
                                    className="text-[17px] leading-snug text-zinc-900 font-montserrat"
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

export default ImportantNotice;
