"use client";
import { getTeamMember } from "@/service/Teams";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, Mountain, Award, Calendar, Linkedin } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import GalleryCarousel from "./_components/GalleryCarousel";
import { Icon } from "@iconify/react/dist/iconify.js";
import ShareButtons from "@/components/ShareButtons";
import TeamMemberSkeleton from "./_components/TeamMemberSkeleton";

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
            <div className="">
                <TeamMemberSkeleton />
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
        <div className=" mb-20   space-y-6 lg:space-y-16 xl:space-y-20">

            <div className="h-[60dvh] relative w-full">
                <Image
                    src={member.data.image || "/placeholder.webp"}
                    alt={member.data.name}
                    fill
                    className="object-cover object-center rounded-sm"
                />
            </div>

            <div className="grid px-4  max-w-7xl mx-auto gap-4 lg:gap-10 text-center">
                <div className="">
                    <h2 className="text-xl lg:text-3xl font-semibold text-orange-500 mb-4 uppercase">About {member.data.name}</h2>
                    <div
                        className="prose space-y-5  text-gray-700 text-justify sm:text-center"
                        dangerouslySetInnerHTML={{
                            __html: member.data.description ||
                                "A dedicated professional bringing expertise and passion to every project. With years of experience in the field, they contribute significantly to our team's success."
                        }}
                    />

                </div>

                <div className="max-w-7xl mx-auto text-center px-4">
                    <h2 className="lg:text-xl ">Follow {member.data.name} on </h2>

                    <div className="mt-4 flex gap-4 justify-center items-center flex-wrap">
                        {/* Twitter */}
                        {
                            member.data.twitter && (
                                <Link href={member.data.twitter} target="_blank">
                                    <button
                                        className="flex items-center px-4 text-sm sm:text-base py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors"
                                        aria-label="Share on Twitter"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                        Twitter
                                    </button>
                                </Link>
                            )
                        }

                        {/* Facebook */}
                        {
                            member.data.facebook && (
                                <Link href={member.data.facebook} target="_blank">
                                    <button
                                        className="flex items-center px-4 text-sm sm:text-base py-2 bg-blue-800 text-white rounded-sm hover:bg-blue-900 transition-colors"
                                        aria-label="Share on Facebook"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        Facebook
                                    </button>
                                </Link>
                            )
                        }

                        {/* LinkedIn */}
                        {
                            member.data.linkedin && (
                                <Link href={member.data.linkedin} target="_blank">
                                    <button
                                        className="flex items-center px-4 text-sm sm:text-base py-2 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-colors"
                                        aria-label="Share on LinkedIn"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        LinkedIn
                                    </button>

                                </Link>
                            )
                        }

                        {/* WhatsApp */}
                        {
                            member.data.instagram && (
                                <Link href={member.data.instagram} target="_blank">
                                    <button

                                        className="flex items-center px-4 text-sm sm:text-base py-2 bg-pink-600 text-white rounded-sm hover:bg-pink-700 transition-colors gap-2"
                                        aria-label="Share on Instagram"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 256 256"><g fill="none"><rect width={256} height={256} fill="url(#SVGWRUqebek)" rx={60}></rect><rect width={256} height={256} fill="url(#SVGfkNpldMH)" rx={60}></rect><path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"></path><defs><radialGradient id="SVGWRUqebek" cx={0} cy={0} r={1} gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse"><stop stopColor="#fd5"></stop><stop offset={0.1} stopColor="#fd5"></stop><stop offset={0.5} stopColor="#ff543e"></stop><stop offset={1} stopColor="#c837ab"></stop></radialGradient><radialGradient id="SVGfkNpldMH" cx={0} cy={0} r={1} gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse"><stop stopColor="#3771c8"></stop><stop offset={0.128} stopColor="#3771c8"></stop><stop offset={1} stopColor="#60f" stopOpacity={0}></stop></radialGradient></defs></g></svg>
                                        Instagram
                                    </button>
                                </Link>
                            )
                        }
                    </div>
                </div>



                {/* Right Column - Content */}
                <div className=" rounded-sm space-y-4  h-fit">
                    <h2 className="text-xl lg:text-3xl font-semibold text-orange-500 mb-4 uppercase">Gallery of {member.data.name}</h2>
                    <div className=" ">
                        {/* Gallery Section */}
                        {member.data.gallery && member.data.gallery.length > 0 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols- gap-4 ">
                                {member.data.gallery.map((memb, idx) => (
                                    <div className="w-full relative aspect-square" key={idx}>
                                        <Image
                                            src={memb || "/placeholder.webp"}
                                            alt={member.data.name || "Gallery Image"}
                                            fill
                                            className="object-cover rounded-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>


                <div className="">
                    <Link href={member.data.cvImage || "#"} target="_blank" download>
                        <button className="bg-orange-500 text-white py-2 px-4 rounded">View Resume</button>
                    </Link>
                </div>
            </div>





        </div >
    );
}