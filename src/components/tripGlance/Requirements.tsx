"use client";

import { ITravelPackage } from "@/types/IPackages";
import { ClipboardCheck } from "lucide-react";

const Requirements = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="requirements"
            className="border-b border-gray-200 mb-8 pb-10"
        >
            {/* Requirements */}
            <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-center sm:text-left" style={{ color: '#3A3A3A' }}>
                Requirements
            </h2>
            <div className="space-y-4">
                {data?.requirements.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-6 rounded-sm border hover:border-gray-300 transition-all duration-200"
                        style={{ backgroundColor: '#fafafa', borderColor: '#f0f0f0' }}
                    >
                        <div className="shrink-0 mt-1 p-2 rounded-md" style={{ backgroundColor: '#fff5f0', border: '1px solid #f05e25' }}>
                            <ClipboardCheck size={20} style={{ color: '#f05e25' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Requirements;
