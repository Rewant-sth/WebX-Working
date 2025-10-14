import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import { ITeamMember } from "@/types/ITeams";
import api from "@/service/api";

const Team = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<ITeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTeams = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/teamMember/home");
      setData(response.data.data.members);
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none", // Only play when it enters
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <>
      <div className="min-h-screen w-full  bg-gradient-to-b from-zinc-50 to-zinc-100">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 ">
          <div
            ref={titleRef}
            className="flex flex-col items-start transition-all duration-700 ease-out mb-16"
          >
            <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3">
              Meet Our High Five
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-700">
              Our Leaders
            </h1>
            <p className="text-zinc-600 text-xl mt-6 max-w-2xl">
              Passionate experts dedicated to excellence and innovation in every
              project we undertake.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-hidden">
            {isLoading &&
              [...Array(3)].map((team, index) => (
                <li
                  key={index}
                  className="cursor-pointer transition-all duration-700 ease-out"
                >
                  <div className="relative h-[75vh] bg-blue-300 animate-pulse w-full rounded-xl overflow-hidden shadow-lg group"></div>
                </li>
              ))}

            {!isLoading &&
              data.slice(0, 3).map((team, index) => (
                <motion.li
                  key={team._id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="cursor-pointer transition-all duration-700 ease-out"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative h-[50vh] md:h-[70vh] w-full rounded-xl overflow-hidden shadow-lg group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                    <img
                      src={team.image}
                      alt={team.name || "Team member"}
                      className={`object-cover h-full w-full transition-all duration-700 ${activeIndex === index ? "scale-115" : "scale-100"
                        }`}
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-500">
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {team.name}
                        </h3>
                        <p className="text-blue-200 text-lg italic mb-3">
                          <Link href={`tel:${team.phoneNumber}`}>
                            {team.phoneNumber}
                          </Link>
                        </p>

                        <div
                          className={`overflow-hidden transition-all duration-500 ${activeIndex === index
                            ? "max-h-32 opacity-100"
                            : "max-h-0 opacity-0"
                            }`}
                        >
                          <p className="text-zinc-300 line-clamp-2 text-sm mb-4">
                            {team.description ||
                              "Bringing expertise and creativity to every project."}
                          </p>
                          <div className="flex gap-4 items-center">
                            <Link href={team?.facebook || ""}>
                              <svg
                                width="34px"
                                height="34px"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    fill="#1877F2"
                                    d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
                                  ></path>
                                  <path
                                    fill="#ffffff"
                                    d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
                                  ></path>
                                </g>
                              </svg>
                            </Link>
                            <Link href={team?.instagram || ""}>
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                  <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect>
                                  <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect> <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"></path>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"></path>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white"></path> <defs> <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"> <stop stopColor="#B13589"></stop>
                                    <stop offset="0.79309" stopColor="#C62F94"></stop> <stop offset="1" stopColor="#8A3AC8"></stop> </radialGradient> <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                                      <stop stopColor="#E0E8B7"></stop> <stop offset="0.444662" stopColor="#FB8A2E"></stop> <stop offset="0.71474" stopColor="#E2425C"></stop> <stop offset="1" stopColor="#E2425C" stopOpacity="0"></stop> </radialGradient> <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"> <stop offset="0.156701" stopColor="#406ADC">
                                      </stop> <stop offset="0.467799" stopColor="#6A45BE"></stop> <stop offset="1" stopColor="#6A45BE" stopOpacity="0"></stop> </radialGradient> </defs> </g></svg>
                            </Link>
                            <Link href={team?.linkedin || ""}>
                              <svg
                                width="34px"
                                height="34px"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    fill="#0A66C2"
                                    d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                                  ></path>
                                </g>
                              </svg>
                            </Link>
                            <Link href={team?.twitter || ""}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="34"
                                height="34"
                                viewBox="0 0 48 48"
                              >
                                <linearGradient
                                  id="U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1"
                                  x1="4.338"
                                  x2="38.984"
                                  y1="-10.056"
                                  y2="49.954"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0" stopColor="#4b4b4b"></stop>
                                  <stop
                                    offset=".247"
                                    stopColor="#3e3e3e"
                                  ></stop>
                                  <stop
                                    offset=".686"
                                    stopColor="#2b2b2b"
                                  ></stop>
                                  <stop offset="1" stopColor="#252525"></stop>
                                </linearGradient>
                                <path
                                  fill="url(#U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1)"
                                  d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28	C42,40.209,40.209,42,38,42z"
                                ></path>
                                <path
                                  fill="#fff"
                                  d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                                ></path>
                                <polygon
                                  fill="#fff"
                                  points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                                ></polygon>
                                <polygon
                                  fill="#fff"
                                  points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                                ></polygon>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
          </ul>
        </div>
      </div>

      {/* <div className="w-full py-16  sm:px-6 lg:px-8 ">
        <div className="relative   sm:mx-10 sm:rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative z-[45] h-full bg-black/40 flex flex-row lg:flex-row items-end justify-start p-6 py-16 sm:p-8 lg:p-12  sm:min-h-[450px]">
            <div className="text-left ">
              <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-bold mb-3  leading-tight">
                Bring your ideas to life in minutes
              </h1>
              <p className="text-blue-100 text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 max-w-lg leading-relaxed">
                Express yourself with the world's easiest design program.
              </p>
              <Link href="/bookform">
                <button
                  onMouseEnter={() => setIsCtaHovered(true)}
                  onMouseLeave={() => setIsCtaHovered(false)}
                  className={`bg-white hover:bg-blue-50 text-black font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl text-base sm:text-lg ${isCtaHovered ? "shadow-2xl" : ""
                    }`}
                >
                  Book now
                </button>
              </Link>
            </div>
          </div>

          <div className="absolute top-0 left-0 h-full w-full z-[40]">
            <div className="relative h-full w-full">
              <Image
                src={"/banner.webp"}
                fill
                alt="Banner"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Team;
