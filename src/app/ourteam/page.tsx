"use client";
import { getTeams } from "@/service/Teams";
import { ITeamMember } from "@/types/ITeams";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const OurTeam: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getTeams"],
    queryFn: getTeams,
  });




  return (
    <div className="space-y-16 mt-[4rem]">
      <div className="min-h-[90dvh] p-6 gap-3 w-full  grid lg:grid-cols-2">
        <div className="grid grid-rows-2">
          <div className="h-full flex flex-col justify-between pb-10 w-full ">
            <h2 className="text-4xl lg:text-6xl font-semibold">
              <span className="flex gap-2 items-center">Meet our <Icon icon={"mynaui:arrow-long-right"} className="pt-4" /></span>
              Reason for excellence
            </h2>
            <p className="mt-4 text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus repellendus iure reiciendis quidem voluptatum delectus quam quibusdam reprehenderit?</p>



          </div>
          <div className="h-full w-full grid gap-3 grid-cols-2">
            <div className="h-full w-full  rounded-sm relative group overflow-hidden">
              <Image src={"/teams/tenzy.jpg"} fill alt="ceo" className="object-cover -100 group-hover:-0 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute flex w-full items-end inset-0 bg-black/10">
                <div className="p-6 text-white flex w-full justify-end gap-6 flex-col h-full">
                  <div className="">
                    <h2 className="text-2xl uppercase font-semibold">Gokul Thapa</h2>
                    <p>CEO - Real Himalaya</p>
                  </div>
                </div>
              </div>            </div>
            <div className="h-full w-full rounded-sm relative group overflow-hidden">
              <Image src={"/teams/sarki.jpg"} fill alt="ceo" className="object-cover -100 group-hover:-0 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute flex w-full items-end inset-0 bg-black/10">
                <div className="p-6 text-white flex w-full justify-end gap-6 flex-col h-full">
                  <div className="">
                    <h2 className="text-2xl uppercase font-semibold">Gokul Thapa</h2>
                    <p>CEO - Real Himalaya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[45dvh] lg:h-full w-full   relative rounded-sm group overflow-hidden">
          <Image src={"/teams/ceo.jpg"} fill alt="ceo" className="object-cover -100 group-hover:-0 group-hover:scale-105 transition-all duration-300" />
          <div className="absolute flex w-full items-end inset-0 bg-black/10">
            <div className="p-6 text-white flex w-full justify-between gap-6  items-end">
              <div className="">
                <h2 className="text-4xl uppercase font-semibold">Gokul Thapa</h2>
                <p>CEO - Real Himalaya</p>
              </div>
              <div className="">
                <button className="bg-orange-500 text-white  py-3 px-6 uppercase flex gap-4 items-center rounded-full text-lg ">Success Story <ArrowRight /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-4xl lg:text-6xl font-semibold  ">Our Heroes <br /> Who Made it  Possible</h2>
        <p className="max-w-2xl mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum at velit ex quibusdam corporis consequatur veniam delectus illum voluptatibus voluptate. Lorem ipsum dolor sit.</p>
        <div className="grid mt-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data?.map((member) => (
            <Link href={`/ourteam/${member._id}`} key={member._id} className="bg-white aspect-square p-4 rounded-sm group overflow-hidden relative">
              <Image fill src={member.image} alt={member.name} className="object-cover -100 group-hover:-0 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute inset-0 bg-black/30 flex items-center flex-col justify-center text-white">
                <h2 className="text-3xl font-semibold text-center">{member.name}</h2>
                <p className="text-xl mt-2">-{member.designation}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    View Profile <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div >
    </div >
  );
};

export default OurTeam;