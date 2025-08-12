import React from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/service/Teams";
import ExpertSkeleton from "./skeleton";
import Link from "next/link";

interface Expert {
  _id: string;
  name: string;
  phoneNumber: string;
  instagram: string;
  facebook: string;
  twitter: string;
  image: string;
  memberType: string;
  designation: string;
}

interface TeamMemberResponse {
  success: boolean;
  count: number;
  data: Expert[];
}

const TalkToExperts: React.FC = () => {
  const { data, isLoading } = useQuery<TeamMemberResponse>({
    queryKey: ["getTeams"],
    queryFn: getTeams,
  });

  if (isLoading) {
    return <ExpertSkeleton />;
  }

  if (!data || data.data.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Our experts will be listed here soon. Please check back later!
      </p>
    );
  }

  return (
    <section className=" z-[99] relative mx-auto max-w-6xl">
      <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 text-center">
        Talk to Our Experts
      </h1>
      <div className="flex mt-8 justify-center items-center flex-wrap gap-4 ">
        {data.data
          // .filter((expert) => expert.memberType === "fieldhero")
          .filter((expert) =>
            expert.designation.toLowerCase().includes("expert")
          )
          .map((expert) => {
            if (expert.designation.toLowerCase() == "expert") {
              return (
                <div
                  key={expert._id}
                  className="flex transition-all duration-500 cursor-pointer gap-6 lg:gap-12 items-center p-2 w-full md:max-w-[360px] bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl"
                >
                  <div>
                    <Image
                      src={expert.image || "/Team/team1.avif"}
                      alt={expert.name}
                      width={800}
                      height={800}
                      className="rounded-full object-cover border-2 border-white shrink-0 size-32"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg md:text-md lg:text-xl font-medium text-white">
                      {expert.name}
                    </div>
                    <Link
                      href={`tel:${expert.phoneNumber.replace(/-/g, "")}`}
                      className="text-white font-medium md:text-md text-sm lg:text-md"
                    >
                      {expert.phoneNumber}
                    </Link>
                    <div className="flex gap-6 mt-4">
                      {
                        expert.instagram && (
                          <Link
                            href={expert.instagram}
                            className="text-white text-lg md:text-xl"
                          >
                            <FaInstagram />
                          </Link>
                        )}
                      {expert.facebook && (
                        <Link
                          href={expert.facebook}
                          className="text-white text-lg md:text-xl"
                        >
                          <FaFacebook />
                        </Link>
                      )}
                      {expert.twitter && (
                        <Link
                          href={expert.twitter}
                          className="text-white text-lg md:text-xl"
                        >
                          <FaTwitter />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            }
          })}
      </div>
    </section>
  );
};

export default TalkToExperts;
