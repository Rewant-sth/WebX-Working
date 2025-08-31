"use client";

import { ITravelPackage } from "@/types/IPackages";
import { AlertTriangle } from "lucide-react";

const ImportantNotice = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="important-notice"
            className="border-b max-w-6xl mx-auto border-gray-200 mb-8 pb-10"
        >
            {/* Important Notice */}
            <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
                <span className="w-fit text-2xl font-semibold">
                    Important Notice
                </span>
            </h2>
            <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl mb-8">
                Important information and notices that you should be aware of before booking your adventure.
            </p>
            <div className="space-y-4">
                {data?.importantNotice.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-6 rounded-sm border hover:border-gray-300 transition-all duration-200"
                        style={{ backgroundColor: '#fff8f0', borderColor: '#fcd34d' }}
                    >
                        <div className="shrink-0 mt-1 p-2 rounded-md" style={{ backgroundColor: '#fef3c7', border: '1px solid #f59e0b' }}>
                            <AlertTriangle size={20} style={{ color: '#f59e0b' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                                {item.title}
                            </h3>
                            <div
                                className="text-sm leading-relaxed text-gray-600"
                                id="editor" dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImportantNotice;
