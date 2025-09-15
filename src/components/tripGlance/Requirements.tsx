"use client";

import { ITravelPackage } from "@/types/IPackages";

const Requirements = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="requirements"
            className="pb-14"
        >
            {/* Requirements */}
            <h2 className="text-3xl font-bold text-orange-500 text-left ">
                <span className="w-fit text-2xl font-semibold">
                    Requirements
                </span>
            </h2>
            <p className="text-zinc-600 mt-1 leading-relaxed max-w-2xl mb-8">
                Essential requirements and preparations needed for a safe and successful journey.
            </p>
            <div className="space-y-4">
                {data?.requirements.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4  transition-all duration-200"
                    >
                        {/* <div className="shrink-0 mt-1 p-2 rounded-md" style={{ backgroundColor: '#fff5f0', border: '1px solid #f05e25' }}>
                            <ClipboardCheck size={20} style={{ color: '#f05e25' }} />
                        </div> */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                                {item.title}
                            </h3>
                            <div id="editor" className=" leading-relaxed text-gray-600 space-y-4" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Requirements;
