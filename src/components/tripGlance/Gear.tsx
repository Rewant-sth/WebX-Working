"use client";

import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReadMore from "@/components/ui/ReadMore";

const Gear = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="gear"
            className="border-b border-zinc-200 pt-6 mb-8 py-10"
        >
            <style jsx>{`
                #gear #editor p,
                #gear #editor span,
                #gear #editor div,
                #gear #editor li,
                #gear #editor h1,
                #gear #editor h2,
                #gear #editor h3,
                #gear #editor h4,
                #gear #editor ul,
                #gear #editor ol {
                    font-size: 16px !important;
                }
            `}</style>
            {/* Gear */}
            <h2 className="text-2xl font-semibold text-orange-500 text-left ">
                <span className="w-fit  ">
                    Essential Gear
                </span>
            </h2>
            <p className="text-base text-zinc-800 mt-1 leading-relaxed max-w-2xl mb-4">
                Complete gear list and equipment recommendations for your adventure.
            </p>
            
            <ReadMore maxHeight="max-h-96" characterLimit={500}>
                <div className="space-y-4">
                    {data?.gearInfo.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4  transition-all duration-200"
                            style={{ borderColor: '#f0f0f0' }}
                        >
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base flex gap-2 items-center  font-semibold mb-1" style={{ color: '#3A3A3A' }}>
                                    <span><Icon icon={"streamline-ultimate:chef-gear-gloves"} className="size-6" /></span> {item.title}
                                </h3>
                                <div
                                    className="text-base leading-relaxed text-zinc-800"
                                    id="editor"
                                    style={{ fontSize: '16px' }}
                                    dangerouslySetInnerHTML={{ __html: item?.description?.replace(/&nbsp;/g, "<br />") }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </ReadMore>
        </div>
    );
};

export default Gear;
