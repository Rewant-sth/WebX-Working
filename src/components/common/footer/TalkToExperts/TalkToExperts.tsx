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
  addToHome?: boolean;
  gallery: string[];
  countryCode: string;
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
      <p className="text-center text-zinc-500 py-10">
        Our experts will be listed here soon. Please check back later!
      </p>
    );
  }

  return (
    <section className=" z-[99] relative mx-auto max-w-6xl">
      <h1 className="text-2xl sm:text-4xl uppercase lg:text-4xl font-bold mb-6 text-zinc-800 text-center">
        Talk to Our Experts
      </h1>
      <div className="flex mt-8 justify-center items-center flex-wrap gap-4 ">
        {data.data
          .filter((expert) =>
            expert.addToHome == true
          )
          .map((expert) => {
            if (expert.addToHome) {
              return (
                <Link href={`/ourteam/${expert._id}`}
                  key={expert._id}
                  className="grid grid-cols-2 transition-all duration-500 cursor-pointer gap-6  items-center p-1 md:p-2 w-full md:max-w-[360px] text-[#01283F] border rounded-sm"
                >
                  <div>
                    <Image
                      src={expert.image || "/Team/team1.avif"}
                      alt={expert.name}
                      width={800}
                      height={800}
                      className="rounded-sm object-cover object-center w-full border border-white shrink-0 size-32"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg md:text-md lg:text-xl font-medium ">
                      {expert.name}
                    </div>
                    <div
                      className=" font-medium md:text-md text-sm lg:text-md"
                    >
                      {expert.countryCode}-{expert.phoneNumber}
                    </div>
                    <div className="flex gap-4 mt-4">
                      {
                        expert.instagram && (
                          <div
                            className=" text-lg md:text-xl"
                          >
                            <FaInstagram />
                          </div>
                        )}
                      {expert.facebook && (
                        <div
                          className=" text-lg md:text-xl"
                        >
                          <FaFacebook />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            }
          })}
      </div>
    </section>
  );
};

export default TalkToExperts;
