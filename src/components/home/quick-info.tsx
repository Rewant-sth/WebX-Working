"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";




export default function QuickInfo() {

    return (
        <div className="grid grid-cols-3 gap-[1vh] min-h-[80vh] lg:p-16 mx-auto">
            <div className=" h-[38vh]  flex justify-end items-start  relative overflow-hidden">
                <div className="absolute inset-0 rounded-md overflow-hidden ">
                    <img src="/one.jpg" alt="" className="h-full w-full object-cover rounded-md" />
                </div>

                <div className=" h-[38vh] w-full text-white rounded-md overflow-hidden bg-black/40 flex flex-col justify-between p-3">
                    <div className="flex gap-4 items-center text-xs">
                        <div className="border  w-fit  px-4 py-1 backdrop-blur-lg rounded-full text-white">Trekking</div>
                        <div className="border w-fit  px-4 py-1 backdrop-blur-lg rounded-full text-white">Jum 22, 2025</div>
                    </div>
                    <div className="flex justify-between items-end ">
                        <h2 className="text-2xl font-bold max-w-xs">Bringing Essential tools with you</h2>
                        <div className=""> <div className="size-11 bg-white/10 backdrop-blur-md  flex justify-center items-center rounded-full text-white">
                            <ArrowUpRight size={20} />
                        </div></div>
                    </div>
                </div>
            </div>

            <div className="bg-black  h-[77vh] rounded-md overflow-hidden row-span-2 relative">
                <Image src={"/four.jpg"} fill alt="Blogs" />
                <div className="absolute inset-0 flex  justify-center items-center">
                    <div className="text-3xl font-semibold p-6 text-white">
                        <h2 className=" w-fit px-2 py-1 pr-4 rounded-tr-2xl"><span className='bg-orange-500 text-white px-4'>Journey</span> Through </h2>
                        <h2 className=" w-fit px-2 py-1 pr-4 rounded-tr-2xl flex gap-4 items-center ">
                            <span>Life's <span className='bg-orange-500 text-white px-4'>Spectrum</span></span>
                        </h2>
                    </div>
                </div>
            </div>


            <div className=" h-full flex justify-between p-4 items- px-6 gap-6 bg-orange-500 rounded-md   flex-col text-white font-semibold  relative overflow-hidden">
                <div className="absolute inset-0 ">
                    <img src="/two.jpg" alt="" className=" -translate-y-20" />
                </div>
                <div className="">
                    <span className="bg-orange-500 px-4 py-1 text-sm rounded-full">Popular</span>
                </div>
                <div className="flex justify-between items-end">
                    <h2 className="text-2xl font-semibold"> Mt. Everest  Trekking through Gokyo Lakes</h2>
                    <div className="">
                        <div className="size-11 bg-white/10 backdrop-blur-md  flex justify-center items-center rounded-full text-white">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                </div>
            </div>


            <div className=" h-[38vh]  flex justify-end items-start  relative overflow-hidden">
                <div className="absolute inset-0 rounded-md overflow-hidden ">
                    <img src="/two.jpg" alt="" className="h-full w-full object-cover rounded-md" />
                </div>

                <div className=" h-[38vh] w-full text-white rounded-md overflow-hidden bg-black/40 flex flex-col justify-between p-3">
                    <div className="flex gap-4 items-center text-xs">
                        <div className="border  w-fit  px-4 py-1 backdrop-blur-lg rounded-full text-white">Trekking</div>
                        <div className="border w-fit  px-4 py-1 backdrop-blur-lg rounded-full text-white">Jum 22, 2025</div>
                    </div>
                    <div className="flex justify-between items-end ">
                        <h2 className="text-2xl font-bold max-w-xs">Bringing Essential tools with you</h2>
                        <div className="">
                            <div className="size-11 bg-white/10 backdrop-blur-md  flex justify-center items-center rounded-full text-white">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className=" h-[38vh]  flex justify-end items-start  relative overflow-hidden">
                <div className="absolute inset-0 rounded-md overflow-hidden ">
                    <img src="/three.jpg" alt="" className="h-full w-full object-cover rounded-md" />
                </div>

                <div className=" h-[38vh] w-full text-white rounded-md overflow-hidden bg-black/40 flex flex-col justify-between p-3">
                    <div className="flex gap-4 items-center text-xs">
                        <div className="border  w-fit  px-4 py-1 backdrop-blur-lg rounded-full text-white">Trekking</div>
                        <div className="border w-fit  px-4 py-1 backdrop-blur-lg rounded-full text-white">Jum 22, 2025</div>
                    </div>
                    <div className="flex justify-between items-end ">
                        <h2 className="text-2xl font-bold max-w-xs">Bringing Essential tools with you</h2>
                        <div className=""> <div className="size-11 bg-white/10 backdrop-blur-md  flex justify-center items-center rounded-full text-white">
                            <ArrowUpRight size={20} />
                        </div></div>
                    </div>
                </div>
            </div>

        </div>
    );
}
