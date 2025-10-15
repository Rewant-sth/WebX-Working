"use client";

import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

const Gear = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="gear"
            className="border-b  border-zinc-200 mb-8 py-10"
        >
            {/* Gear */}
            <h2 className="text-2xl font-semibold text-orange-500 text-left ">
                <span className="w-fit  ">
                    Essential Gear
                </span>
            </h2>
            <p className="text-zinc-600 mt-1 leading-relaxed max-w-2xl mb-4">
                Complete gear list and equipment recommendations for your adventure.
            </p>
            <div className="space-y-4">
                {data?.gearInfo.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4  transition-all duration-200"
                        style={{ borderColor: '#f0f0f0' }}
                    >
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg flex gap-2 items-center  font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                                <span><Icon icon={"streamline-ultimate:chef-gear-gloves"} className="size-6" /></span> {item.title}
                            </h3>
                            <div
                                className="text-sm leading-relaxed text-zinc-800"
                                id="editor" dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gear;
