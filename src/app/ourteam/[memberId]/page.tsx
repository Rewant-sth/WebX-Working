"use client";
import { getTeamMember } from "@/service/Teams";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, Mountain, Award, Calendar, Linkedin } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import GalleryCarousel from "./_components/GalleryCarousel";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PageProps {
    params: Promise<{
        memberId: string;
    }>;
}

export default function TeamMemberDetails({ params }: PageProps) {
    const resolvedParams = use(params);
    const { data: member, isLoading } = useQuery({
        queryKey: ["teamMember", resolvedParams.memberId],
        queryFn: () => getTeamMember(resolvedParams.memberId),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen mt-[4rem] p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="h-96 bg-gray-200 animate-pulse rounded-sm"></div>
                </div>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="min-h-screen mt-[4rem] p-6 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Team member not found</h1>
                    <p className="mt-2 text-gray-600">The team member you're looking for doesn't exist.</p>
                    <Link href="/ourteam" className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-full">
                        Back to Team
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 mb-16 ">
            <div className=" mx-auto">
                <div className="grid lg:grid-cols-5 ">
                    {/* Left Column - Profile */}
                    <div className="lg:col-span-2 lg:sticky top-20 h-fit">
                        <div className=" rounded-sm border border-gray-200 ">
                            <div className="relative h-80 lg:h-96 w-full  overflow-hidden ">
                                <Image
                                    src={member.data.image || "/placeholder.webp"}
                                    alt={member.data.name}
                                    fill
                                    className="object-cover object-top"
                                />

                            </div>

                            <div className=" px-4 flex flex-wrap justify-between w-full gap-4 items-center py-6 bg-orange-50  ">
                                <div className="w-fit">
                                    <h1 className="text-2xl lg:text-3xl font-bold ">{member.data.name.trim()}</h1>
                                    <p className=" ">{member.data.designation}</p>
                                </div>
                                <div className="flex h-full  space-x-4 justify-center items-center mt-4">
                                    {member.data.facebook && (
                                        <Link href={member.data.facebook} target="_blank" className="text-gray-600 hover:text-blue-600 transition-colors">
                                            <Icon icon={"logos:facebook"} className="size-7" />
                                        </Link>
                                    )}
                                    {member.data.instagram && (
                                        <Link href={member.data.instagram} target="_blank" className="text-gray-600 hover:text-pink-600 transition-colors">
                                            <Icon icon={"skill-icons:instagram"} className="size-7" />
                                        </Link>
                                    )}

                                    {member.data.linkedin && (
                                        <Link href={member.data.linkedin} target="_blank" className="text-gray-600 hover:text-orange-600 transition-colors">
                                            <Icon icon={"devicon:linkedin"} className="size-7" />
                                        </Link>
                                    )}

                                    {member.data.phoneNumber && (
                                        <Link href={`tel:${member.data.phoneNumber}`} className="text-gray-600 hover:text-blue-400 transition-colors">
                                            <Icon icon={"ic:baseline-phone-enabled"} className="size-8 text-black" />
                                        </Link>
                                    )}
                                </div>
                            </div>




                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-3 mt-14 space-y-8">


                        {/* Gallery Section */}
                        {member.data.gallery && member.data.gallery.length > 0 && (
                            <div className="px-6 mt-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase">Gallery</h2>
                                <GalleryCarousel images={member.data.gallery} />
                            </div>
                        )}

                        {/* About Section */}
                        <div className="  px-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">About {member.data.name}</h2>
                            <div
                                className="prose space-y-5 text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: member.data.description ||
                                        "A dedicated professional bringing expertise and passion to every project. With years of experience in the field, they contribute significantly to our team's success."
                                }}
                            />

                            {member.data.cvImage && (
                                <div className=" mb-6">
                                    <Image
                                        src={member.data.cvImage}
                                        alt={`CV of ${member.data.name}`}
                                        width={1500}
                                        height={1700}
                                        className="object-cover "
                                    />
                                </div>
                            )}
                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
}