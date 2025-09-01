"use client";

import { ITravelPackage } from "@/types/IPackages";
import { AlertTriangle } from "lucide-react";

const ImportantNotice = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="important-notice"
            className="border-b  border-gray-200 mb-8 pb-10"
        >
            {/* Important Notice */}
            <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
                <span className="w-fit text-2xl font-semibold">
                    Important Notice
                </span>
            </h2>
            <p className="text-zinc-600 mt-1 leading-relaxed  mb-8">
                Important information and notices that you should be aware of before booking your adventure.
            </p>
            <div className="space-y-4">
                {data?.importantNotice.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-6 rounded-sm border bg-green-50 border-green-500 hover:border-gray-300 transition-all duration-200"
                    >
                        <div className="shrink-0 size-10 flex justify-center items-center mt-1 p-2 rounded-sm bg-green-500 text-white" >
                            <AlertTriangle className="text-3xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: '#3A3A3A' }}>
                                {item.title}
                            </h3>
                            <div
                                className=" leading-relaxed "
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
