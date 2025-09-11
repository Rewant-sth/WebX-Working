"use client";
import { getTeams } from "@/service/Teams";
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
      <div className="p-4 md:p-6 gap-3 w-full  ">
        <div className="">
          <div className="h-full flex flex-col justify-between pb-10 w-full ">
            <h2 className="text-4xl lg:text-6xl font-semibold">
              <span className="flex gap-2 items-center">Meet our <Icon icon={"mynaui:arrow-long-right"} className="pt-4" /></span>
              Reason for excellence
            </h2>
            <p className="mt-4 text-xl max-w-7xl">The Board Members of Real Himalaya bring together decades of experience in mountaineering, trekking, and adventure tourism. Each member plays a vital role in shaping our vision, ensuring that every Himalayan trek and expedition upholds the highest standards of safety, authenticity, and service. Their leadership and dedication are the driving force behind our reputation as a trusted Nepal trekking company, preferred by adventurers worldwide.</p>



          </div>
          <div className="h-full w-full grid gap-3 lg:grid-cols-2">
            {
              data?.data?.map((member) => {
                if (member.memberType.toLocaleLowerCase() === "boardmember") {
                  return (
                    <div key={member._id} className="h-[60dvh]  group w-full  rounded-sm relative group overflow-hidden">
                      <Image src={member.image} fill alt={member.name} className="object-cover group-hover:blur-xs object-top -100 group-hover:-0 group-hover:scale-105 transition-all duration-300" />
                      <div className="absolute flex w-full items-end inset-0 bg-black/10">
                        <div className="flex p-4 lg:p-6 w-full justify-between  items-end">
                          <div className=" text-white flex w-full justify-end gap-6 flex-col h-full">
                            <div className="w-full shrink-0">
                              <h2 className="text-2xl uppercase font-semibold">{member.name}</h2>
                              <p className="uppercase">{member.designation}</p>
                            </div>

                            <div className="flex gap-2 items-center">
                              {member.linkedin && (
                                <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                  <Icon icon="logos:facebook" className="size-6 text-white" />
                                </Link>
                              )}
                              {member.twitter && (
                                <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                                  <Icon icon="arcticons:x-twitter" className="size-6 text-white" />
                                </Link>
                              )}
                              {member.instagram && (
                                <Link href={member.instagram} target="_blank" rel="noopener noreferrer">
                                  <Icon icon="skill-icons:instagram" className="size-6 text-white" />
                                </Link>
                              )}
                              {member.linkedin && (
                                <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                  <Icon icon="devicon:linkedin" className="size-6 text-white" />
                                </Link>
                              )}
                            </div>
                          </div>
                          <div className="shrink-0">
                            <Link href={`/ourteam/${member._id}`}>
                              <button className=" text-white hover:text-orange-400 px-4 py-2 rounded-full font-semibold shrink-0 flex items-center gap-2">
                                View Profile <ArrowRight />
                              </button>
                            </Link>
                          </div>
                        </div>


                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>

      </div>

      <div className="p-6">
        <h2 className="text-4xl lg:text-6xl font-semibold  ">Our Heroes <br /> Who Made it  Possible</h2>
        <p className="max-w-7xl text-xl mt-4">Our field heroes are the backbone of every Himalayan journey. From expert Sherpa mountaineers and licensed trekking guides to hardworking porters and support staff, they are the ones who make each trek possible. Their strength, knowledge of the mountains, and dedication to client safety ensure that every adventure is not only successful but also deeply memorable. At Real Himalaya, we honor our field heroes as the true champions who turn Himalayan dreams into reality.</p>
        {!data?.data || data.data.filter(member => member.memberType.toLowerCase() !== "boardmember").length === 0 ? (
          <div className="flex flex-col h-[60dvh] items-center justify-center mt-10 py-16 px-4 border-2 border-dashed border-gray-300 rounded-sm">
            <h3 className="text-xl font-semibold mb-2 uppercase">No Team Members Found</h3>
            <p className="text-gray-500 text-center max-w-md">
              Our team information is currently being updated. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid mt-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((member) => {
              if (member.memberType.toLocaleLowerCase() !== "boardmember") {
                return (
                  <div key={member._id} className="h-[60dvh] w-full  rounded-sm relative group overflow-hidden">
                    <Image src={member.image} fill alt={member.name} className="object-cover object-top -100 group-hover:-0 group-hover:scale-105 transition-all duration-300" />
                    <div className="absolute flex w-full items-end inset-0 bg-black/10">
                      <div className="flex p-6 w-full justify-between  items-end">
                        <div className=" text-white flex w-full justify-end gap-6 flex-col h-full">
                          <div className="">
                            <h2 className="text-2xl uppercase font-semibold">{member.name}</h2>
                            <p className="uppercase">{member.designation} - Real Himalaya</p>
                          </div>

                          <div className="flex gap-2 items-center">
                            {member.linkedin && (
                              <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <Icon icon="logos:facebook" className="size-6 text-white" />
                              </Link>
                            )}
                            {member.twitter && (
                              <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                                <Icon icon="arcticons:x-twitter" className="size-6 text-white" />
                              </Link>
                            )}
                            {member.instagram && (
                              <Link href={member.instagram} target="_blank" rel="noopener noreferrer">
                                <Icon icon="skill-icons:instagram" className="size-6 text-white" />
                              </Link>
                            )}
                            {member.linkedin && (
                              <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <Icon icon="logos:linkedin" className="size-6 text-white" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurTeam;