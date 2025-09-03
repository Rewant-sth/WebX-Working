"use client";
import { getTeamMember } from "@/service/Teams";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { use } from "react";

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
                    <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
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
        <div className="min-h-screen mt-[3rem] p-6">
            {/* Hero Section */}
            <div className="grid lg:grid-cols-2  gap-2 ">
                <div className="h-fit lg:sticky top-16">
                    <div className="relative h-[60vh] rounded-sm overflow-hidden">
                        <Image
                            src={member.data.image || "/placeholder.webp"}
                            alt={member.data.name}
                            fill
                            className="object-cover object-top"
                        />
                    </div>


                    <div className="flex mt-4 justify-between gap-6 flex-wrap">
                        <div className=" ">
                            <h1 className="text-2xl uppercase font-bold">{member.data.name}</h1>
                            <p className="text-xl md:text-2xl ">- {member.data.designation}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                {member.data.facebook && (
                                    <Link href={member.data.facebook} target="_blank" className="text-gray-600 hover:text-blue-600">
                                        <Facebook className="w-6 h-6" />
                                    </Link>
                                )}
                                {member.data.instagram && (
                                    <Link href={member.data.instagram} target="_blank" className="text-gray-600 hover:text-pink-600">
                                        <Instagram className="w-6 h-6" />
                                    </Link>
                                )}
                                {member.data.twitter && (
                                    <Link href={member.data.twitter} target="_blank" className="text-gray-600 hover:text-blue-400">
                                        <Twitter className="w-6 h-6" />
                                    </Link>
                                )}
                            </div>
                            {member.data.cvImage && (
                                <Link
                                    href={member.data.cvImage}
                                    target="_blank"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm inline-flex items-center gap-2 hover:bg-orange-600 transition-colors"
                                >
                                    <div className="relative w-5 h-5">
                                        <Image
                                            src="/icons/download.png"
                                            alt="Download CV"
                                            fill
                                            className="object-contain brightness-0 invert"
                                        />
                                    </div>
                                    Download CV
                                </Link>
                            )}
                        </div>

                    </div>
                </div>

                <div className="  px-6 ">
                    <div className="">
                        <div className="bg-white  rounded-lg ">
                            <div className="prose space-y-3 text-lg" id="editor" dangerouslySetInnerHTML={{ __html: member.data.description || "A dedicated professional bringing expertise and passion to every project. With years of experience in the field, they contribute significantly to our team's success." }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}

        </div>
    );
}
