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
            {/* Gear */}
            <h2 className="text-2xl font-semibold text-orange-500 text-left mb-4 ">
                <span className="w-fit  ">
                    Essential Gear
                </span>
            </h2>
            {/* <p className="text-base text-zinc-800 mt-1 leading-relaxed max-w-2xl mb-4">
                Complete gear list and equipment recommendations for your adventure.
            </p> */}
            
            <ReadMore maxHeight="max-h-96" characterLimit={500}>
                <div className="space-y-2">
                    {data?.gearInfo.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4  transition-all duration-200"
                            style={{ borderColor: '#f0f0f0' }}
                        >
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[17px] flex gap-2 items-center mb-1 font-semibold  font-montserrat" style={{ color: '#3A3A3A' }}>
                                    <span><Icon icon={"streamline-ultimate:chef-gear-gloves"} className="size-6" /></span> {item.title}
                                </h3>
                                <div
                                    className="text-[17px] leading-snug font-montserrat text-zinc-800"
                                    id="editor"
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
