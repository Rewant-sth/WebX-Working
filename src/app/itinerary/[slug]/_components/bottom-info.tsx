import { ITravelPackage } from '@/types/IPackages';
import { ArrowRight, LocateIcon } from 'lucide-react';
import React from 'react'

export default function BottomInfo({ isStickyVisible, isScrolled, packageData }: { isStickyVisible: boolean; isScrolled: boolean; packageData: any | undefined; }) {
    return (
        <div>
            <div
                className={`sticky bottom-0 w-full shadow-3xl items-center grid grid-cols-4 py-2 text-zinc-900 bg-orange-100 rounded-sm transition-all z-[99] duration-300 transform ${isStickyVisible ? 'translate-y-0' : 'translate-y-full'
                    } ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="w-full flex items-center justify-center gap-2 py-4 border-orange-200 border-r-[2px]">
                    <h2 className=" font-bold  uppercase">Starting at - </h2>
                    <p className="text-lg font-bold text-orange-500">Rs. {packageData?.data?.fixedDates[0] ? packageData.data.fixedDates[0].pricePerPerson : "N/A"}</p>
                </div>
                <div className=" flex justify-center border-orange-200 border-r-[2px]">
                    <div className="">
                        <h2 className=" font-semibold">{packageData?.data?.name}</h2>
                        <p className="flex items-center gap-0.5"><LocateIcon size={15} />{packageData?.data?.location}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center border-orange-200 border-r-[2px]">
                    <div className="">
                        <h2 className=" font-semibold">Talk to Experts</h2>
                        <p>+977-9841240412</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="flex items-center gap-2 border py-2 px-6 uppercase font-semibold text-orange-500 rounded-full">
                        Book Now <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}
