"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";




export default function QuickInfo() {

    return (
        <div className="grid grid-cols-3 gap-2 gap-y-4 min-h-[80vh] lg:p-16 mx-auto">
            <div className=" h-[35vh]  flex justify-end items-start  relative overflow-hidden">
                <div className="absolute inset-0 rounded-md overflow-hidden ">
                    <img src="/one.jpg" alt="" className="h-full w-full object-cover rounded-md" />
                </div>
                <div className="absolute -bottom-8 z-[999] bg-white flex p-4 rounded-tl-[50px] -right-8 size-36  ">
                    <div className="size-22 bg-orange-100 flex justify-center items-center rounded-full text-orange-500">
                        <ArrowUpRight size={30} />
                    </div>
                </div>
                <div className=" h-[35vh] w-full text-white rounded-md overflow-hidden bg-black/40 flex flex-col justify-between p-3">
                    <div className="flex gap-4 items-center">
                        <div className="border  w-fit  px-4 py-0.5 rounded-full text-white">Trekking</div>
                        <div className="border w-fit  px-4 py-0.5 rounded-full text-white">Jum 22, 2025</div>
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-bold max-w-xs">Bringing Essential tools with you</h2>
                    </div>
                </div>
            </div>

            <div className="bg-black  h-[73vh] rounded-md overflow-hidden row-span-2 relative">
                <Image src={"/four.jpg"} fill alt="Blogs" />
                <div className="absolute inset-0 flex  items-end">
                    <div className="text-4xl font-semibold">
                        <h2 className="bg-white w-fit p-2 py-4 pr-4 rounded-tr-2xl">Journey Through </h2>
                        <h2 className="bg-white w-fit p-2 py-4 pr-4 rounded-tr-2xl flex gap-4 items-center ">
                            <span className="flex justify-center items-center overflow-hidden w-20 h-10 bg-black rounded-full">
                                <img src="/four.jpg" alt="four" className="object-cover" />
                            </span>
                            <span>Life's Spectrum</span>
                        </h2>
                    </div>
                </div>
            </div>


            <div className=" h-fit px-6 gap-6 flex flex-col justify-start items-start  relative overflow-hidden">
                <p className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic perferendis velit fugiat recusandae voluptatum placeat dolorum sequi consequuntur, omnis ad</p>
                <p className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic perferendis velit fugiat</p>
                <div className="flex justify-between gap-4 flex-wrap w-full items-center mt-4 ">
                    <div className="flex gap-3 items-center">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-full flex gap-2 items-center">
                            Read More
                            <ArrowRight />
                        </button>
                    </div>

                    <div className="flex gap-3 text-2xl">
                        <Icon icon="mdi:facebook" />
                        <Icon icon="mdi:instagram" />
                        <Icon icon="mdi:linkedin" />
                    </div>
                </div>
            </div>


            <div className="  h-[35vh]  flex justify-end items-start  relative  overflow-hidden">

                <div className="absolute -bottom-8 z-[999] bg-white flex p-4 rounded-tl-[50px] -right-8 size-36  ">
                    <div className="size-22 bg-orange-100 flex justify-center items-center rounded-full text-orange-500">
                        <ArrowUpRight size={30} />
                    </div>
                </div>

                <div className="absolute inset-0 "

                >
                    <div className="relative rounded-md overflow-hidden h-full w-full">
                        <img src="/two.jpg" alt="Musings in Grayscale" className="h-full w-full object-cover  " />
                    </div>



                </div>

                <div className="h-full w-full text-white rounded-md overflow-hidden bg-black/40 flex flex-col justify-between p-3">
                    <div className="flex gap-4 items-center">
                        <div className="border  w-fit  px-4 py-0.5 rounded-full text-white">Trekking</div>
                        <div className="border w-fit  px-4 py-0.5 rounded-full text-white">Jum 22, 2025</div>
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-bold max-w-xs">Bringing Essential tools with you</h2>
                    </div>
                </div>
            </div>


            <div className="  h-[35vh]  flex justify-end items-end  relative overflow-hidden">

                <div className="absolute inset-0 rounded-md overflow-hidden">
                    <img src="/three.jpg" alt="" className="h-full w-full object-cover rounded-md " />
                </div>

                <div className="absolute -bottom-8 z-[999] rounded-md overflow-hidden bg-white flex p-4 rounded-tl-[50px] -right-8 size-36  ">
                    <div className="size-22 bg-orange-100 flex justify-center items-center rounded-full text-orange-500">
                        <ArrowUpRight size={30} />
                    </div>
                </div>

                <div className="h-full min-h-[35vh] w-full rounded-md overflow-hidden text-white bg-black/40 flex flex-col justify-between p-3">
                    <div className="flex gap-4 items-center">
                        <div className="border  w-fit  px-4 py-0.5 rounded-full text-white">Trekking</div>
                        <div className="border w-fit  px-4 py-0.5 rounded-full text-white">Jum 22, 2025</div>
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-bold max-w-xs">Bringing Essential tools with you</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
