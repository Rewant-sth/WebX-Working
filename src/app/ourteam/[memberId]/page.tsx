"use client";
import { getTeamMember } from "@/service/Teams";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, Mountain, Award, Calendar, Linkedin } from "lucide-react";
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
        <div className="min-h-screen pt-[5rem] p-6 mb-16 ">
            <div className=" mx-auto">
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Left Column - Profile */}
                    <div className="lg:col-span-2 lg:sticky top-20 h-fit">
                        <div className=" rounded-sm border border-gray-200 ">
                            <div className="relative h-80 lg:h-96 w-full  overflow-hidden mb-6">
                                <Image
                                    src={member.data.image || "/placeholder.webp"}
                                    alt={member.data.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">{member.data.name}</h1>
                                <p className="text-lg text-orange-600">{member.data.designation}</p>
                            </div>

                            <div className="flex justify-center space-x-4 mb-6">
                                {member.data.facebook && (
                                    <Link href={member.data.facebook} target="_blank" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        <Facebook className="w-6 h-6" />
                                    </Link>
                                )}
                                {member.data.instagram && (
                                    <Link href={member.data.instagram} target="_blank" className="text-gray-600 hover:text-pink-600 transition-colors">
                                        <Instagram className="w-6 h-6" />
                                    </Link>
                                )}
                                {member.data.twitter && (
                                    <Link href={member.data.twitter} target="_blank" className="text-gray-600 hover:text-blue-400 transition-colors">
                                        <Twitter className="w-6 h-6" />
                                    </Link>
                                )}
                                {member.data.linkedin && (
                                    <Link href={member.data.linkedin} target="_blank" className="text-gray-600 hover:text-orange-600 transition-colors">
                                        <Linkedin className="w-6 h-6" />
                                    </Link>
                                )}
                            </div>


                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* About Section */}
                        <div className="  px-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase">About {member.data.name}</h2>
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