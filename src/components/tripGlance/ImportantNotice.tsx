"use client";

import { ITravelPackage } from "@/types/IPackages";


const ImportantNotice = ({ data }: { data: ITravelPackage | undefined }) => {
    return (
        <div
            id="important-notice"
            className="pt-6 pb-14"
        >
            <style jsx>{`
                #important-notice #editor p,
                #important-notice #editor span,
                #important-notice #editor div,
                #important-notice #editor li,
                #important-notice #editor h1,
                #important-notice #editor h2,
                #important-notice #editor h3,
                #important-notice #editor h4,
                #important-notice #editor ul,
                #important-notice #editor ol {
                    font-size: 16px !important;
                }
            `}</style>
            {/* Important Notice */}
            <h2 className="text-2xl font-bold text-orange-500 text-left ">
                <span className="w-fit  font-semibold">
                    Important Notice
                </span>
            </h2>
            <p className="text-base text-zinc-800 mt-1 leading-relaxed  mb-8">
                Important information and notices that you should be aware of before booking your adventure.
            </p>
            <div className="space-y-4 divide-y divide-zinc-200">
                {data?.importantNotice.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 pb-6   transition-all duration-200"
                    >
                        {/* <div className="shrink-0 size-10 flex justify-center items-center mt-1 p-2 rounded-sm bg-green-500 text-white" >
                            <AlertTriangle className="text-3xl" />
                        </div> */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold mb-1" style={{ color: '#3A3A3A' }}>
                                {item.title}
                            </h3>
                            <div
                                className="text-base leading-relaxed text-zinc-800"
                                id="editor" 
                                style={{ fontSize: '16px' }}
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImportantNotice;
