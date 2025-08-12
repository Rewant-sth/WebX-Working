"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ITravelPackage, IFixedDate } from "@/types/IPackages";
import TitleDesc from "@/components/titleDesc/TitleDesc";
import { getTimeLeft } from "@/components/lib/get-time";
import { getPages } from "@/service/pages";
import { IPages } from "@/types/Ipages";
import { motion } from "framer-motion";
import api from "@/service/api";

const useCountdown = (endDate: string | Date | null) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));
  useEffect(() => {
    if (!endDate) return;

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return timeLeft;
};
interface EventCardProps {
  event: ITravelPackage;
  fixedDate: IFixedDate;
  setPackage?: (event: ITravelPackage) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, fixedDate, setPackage }) => {
  const endDate = fixedDate?.endDate;
  const timeLeft = useCountdown(endDate);
  const countdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (countdownRef.current) {
      gsap.fromTo(
        countdownRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [timeLeft]);

  const monthShort = new Date(fixedDate.startDate).toLocaleDateString(undefined, {
    month: "short",
  });
  const dayNum = new Date(fixedDate.startDate).getDate();
  return (
    <motion.div
      className="group relative bg-white/95 backdrop-blur-sm border border-blue-200/50 rounded-2xl transition-all duration-500 flex flex-col lg:flex-row overflow-hidden transform"
      style={{
        animation: `slideInUp 0.6s ease-out 0s both`,
      }}
    >
      {/* Left Side - Image Section */}
      <div className="relative w-full lg:w-4/8 min-h-[300px] lg:min-h-[450px] overflow-hidden">
        <Image
          src={event.coverImage}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Floating Date Badge */}
        <div className="absolute top-6 left-6 z-20">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="text-blue-600 font-bold text-sm uppercase tracking-wide">
              {monthShort}
            </div>
            <div className="text-gray-900 font-black text-2xl leading-none">
              {dayNum}
            </div>
          </div>
        </div>

        {/* Country Flags - old design, no border radius, aligned bottom-right */}
        <div className="absolute bottom-4 right-4 z-20 flex gap-3 items-end">
          <Image
            className="w-12 lg:w-16 h-auto shadow-lg"
            src="/TrekImages/nepal.png"
            alt="Nepal"
            height={48}
            width={48}
            style={{ borderRadius: 0 }}
          />
          <Image
            className="w-12 lg:w-16 h-auto shadow-lg"
            src="/TrekImages/india.png"
            alt="India"
            height={48}
            width={48}
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 flex flex-col justify-between p-4 lg:p-10 relative">
        {/* Content Header */}
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl lg:text-4xl font-black mb-4 text-gray-900 leading-tight group-hover:text-blue-900 transition-colors duration-300">
              {event.name}
            </h3>
            <div
              className="text-gray-600 text-base lg:text-lg leading-relaxed line-clamp-3 font-medium"
              dangerouslySetInnerHTML={{
                __html: event.overview,
              }}
            />
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-4 lg:mt-8 text-lg font-medium">
          {!endDate ? (
            <span>No event date</span>
          ) : timeLeft.total > 0 ? (
            <div className="space-y-3">
              <div className="text-xl sm:text-2xl font-semibold text-gray-800 text-left">
                Count Down Starts
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                <span className="backdrop-blur-2xl bg-white text-blue-500 h-14 w-14 sm:h-16 sm:w-16 lg:h-22 lg:w-22 rounded-xl flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-bold">
                  {timeLeft.days} D
                </span>
                <span className="backdrop-blur-2xl bg-white text-blue-500 h-14 w-14 sm:h-16 sm:w-16 lg:h-22 lg:w-22 rounded-xl flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-bold">
                  {timeLeft.hours} H
                </span>
                <span className="backdrop-blur-2xl bg-white text-blue-500 h-14 w-14 sm:h-16 sm:w-16 lg:h-22 lg:w-22 rounded-xl flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-bold">
                  {timeLeft.minutes} M
                </span>
                <span className="backdrop-blur-2xl bg-white text-blue-500 h-14 w-14 sm:h-16 sm:w-16 lg:h-22 lg:w-22 rounded-xl flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-bold">
                  {timeLeft.seconds} S
                </span>
              </div>
            </div>
          ) : (
            <span className="text-red-600 font-semibold">Booking Closed</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href={timeLeft.total > 0 ? `/booking/${event.id}` : "#"}
            onClick={() => setPackage && setPackage(event)}
            className="flex-1 group/button"
          >
            <button
              disabled={timeLeft.total <= 0}
              className={`relative w-full px-8 py-4 bg-gradient-to-r ${timeLeft.total > 0
                ? "from-blue-600 to-indigo-600"
                : "from-red-600 to-red-700"
                } text-white font-bold rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${timeLeft.total > 0 ? "" : "cursor-not-allowed opacity-70"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform scale-x-0 group-hover/button:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Calendar
                  size={20}
                  className="transform group-hover/button:rotate-12 transition-transform duration-300"
                />
                <span className="text-md shrink-0">
                  {timeLeft.total > 0 ? "Book Now" : "Booking Closed"}
                </span>
              </span>
            </button>
          </Link>

          <Link
            href={`/everest-basecamp-trek`}
            className="flex-1 group/button"
          >
            <button className="relative w-full px-8 py-4 bg-white border-2 border-blue-200 text-blue-700 font-bold rounded-2xl shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:border-blue-400">
              <span className="flex items-center justify-center gap-3">
                <Eye
                  size={20}
                  className="transform group-hover/button:scale-110 transition-transform duration-300"
                />
                <span className="text-lg shrink-0">View Details</span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState<ITravelPackage[]>([]);
  const [activeCategory, setActiveCategory] = useState("ongoing");

  // Section refs for scroll tracking
  const ongoingRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);

  // Categorized events
  const [ongoingEvents, setOngoingEvents] = useState<
    { event: ITravelPackage; fixedDate: IFixedDate }[]
  >([]);
  const [upcomingEvents, setUpcomingEvents] = useState<
    { event: ITravelPackage; fixedDate: IFixedDate }[]
  >([]);
  const [pastEvents, setPastEvents] = useState<
    { event: ITravelPackage; fixedDate: IFixedDate }[]
  >([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await api.get(`/package/category/event`);
      setPackages(data?.data?.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Categorize events when packages change
  useEffect(() => {
    if (!packages.length) return;

    const now = new Date();
    const ongoing: { event: ITravelPackage; fixedDate: IFixedDate }[] = [];
    const upcoming: { event: ITravelPackage; fixedDate: IFixedDate }[] = [];
    const past: { event: ITravelPackage; fixedDate: IFixedDate }[] = [];

    packages.forEach((event) => {
      event.fixedDates.forEach((fixedDate) => {
        if (!fixedDate.startDate || !fixedDate.endDate) return;

        const start = new Date(fixedDate.startDate);
        const end = new Date(fixedDate.endDate);

        if (now >= start && now <= end) {
          ongoing.push({ event, fixedDate });
        } else if (now < start) {
          upcoming.push({ event, fixedDate });
        } else if (now > end) {
          past.push({ event, fixedDate });
        }
      });
    });

    setOngoingEvents(ongoing);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, [packages]);

  const [page] = useState(1);
  const { data: pageData } = useQuery({
    queryKey: ["getPages"],
    queryFn: getPages,
  });

  // Scroll to section function
  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>,
    category: string
  ) => {
    setActiveCategory(category);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const ongoingPosition = ongoingRef.current?.offsetTop ?? Infinity;
      const upcomingPosition = upcomingRef.current?.offsetTop ?? Infinity;
      const pastPosition = pastRef.current?.offsetTop ?? Infinity;

      // Only set as active if the corresponding section exists (has events)
      if (pastEvents.length > 0 && scrollPosition >= pastPosition) {
        setActiveCategory("past");
      } else if (upcomingEvents.length > 0 && scrollPosition >= upcomingPosition) {
        setActiveCategory("upcoming");
      } else if (ongoingEvents.length > 0) {
        setActiveCategory("ongoing");
      } else if (upcomingEvents.length > 0) {
        setActiveCategory("upcoming");
      } else if (pastEvents.length > 0) {
        setActiveCategory("past");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ongoingEvents.length, upcomingEvents.length, pastEvents.length]);

  const eventPage: IPages[] | undefined = pageData?.data.filter(
    (data) => data.slug.toLocaleLowerCase() === "our-events" || "events"
  );

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 lg:grid-cols-9 border-b border-dashed pb-12 gap-4 lg:gap-6 xl:gap-10">
      <div className="flex flex-col w-full lg:w-fit space-y-2 animate-pulse">
        <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-10 sm:h-16 bg-gray-200 rounded w-1/2"></div>
      </div>

      <div className="min-h-[250px] sm:min-h-[300px] aspect-[16/9] lg:pr-8 bg-gray-200 col-span-1 lg:col-span-4 rounded-sm overflow-hidden relative animate-pulse"></div>

      <div className="col-span-1 lg:col-span-4 space-y-4 animate-pulse">
        <div className="h-8 sm:h-12 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 sm:h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-4 sm:h-6 bg-gray-200 rounded w-5/6"></div>

        <div className="mt-6 sm:mt-8">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/3 mb-3 sm:mb-4"></div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-14 w-14 sm:h-16 sm:w-16 lg:h-22 lg:w-22 bg-gray-300 rounded-xl"
              ></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="h-10 sm:h-12 bg-gray-300 rounded-xl w-full sm:w-40"></div>
          <div className="h-10 sm:h-12 bg-gray-200 rounded-xl w-full sm:w-40"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen ">
      <TitleDesc
        img={eventPage ? eventPage[0]?.image : null}
        title={eventPage ? eventPage[0]?.title : "Our Events"}
        desc={
          eventPage
            ? eventPage[0]?.description
            : "Explore our exciting adventure events"
        }
      />
      <div className="flex sm:my-10 flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 lg:gap-14 py-10 sm:py-16 md:py-20 px-0 sm:px-6 md:px-10 lg:px-16">
        <div className="w-full lg:mx-3 md:w-[250px] md:sticky md:top-20 h-auto md:h-52 shrink-0 z-10  md:bg-transparent md:z-auto">
          <ul className="flex flex-row md:flex-col gap-2  font-semibold overflow-x-auto md:overflow-visible pb-2 md:pb-0 whitespace-nowrap">
            <li
              className={`p-2 flex gap-2 items-center rounded-md  transition-colors ${activeCategory === "ongoing"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 hover:bg-blue-200"
                } ${ongoingEvents.length > 0
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
                }`}
              onClick={() => {
                if (ongoingEvents.length > 0)
                  scrollToSection(ongoingRef as any, "ongoing");
              }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q1.6 0 3.075-.6t2.6-1.725L12 12V4Q8.65 4 6.325 6.325T4 12t2.325 5.675T12 20"
                  ></path>
                </svg>
              </span>
              <span className="text-sm md:text-base">Ongoing Events</span>
            </li>
            <li
              className={`p-2 flex gap-2 items-center rounded-md  transition-colors ${activeCategory === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 hover:bg-blue-200"
                }
                ${upcomingEvents.length > 0
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
                }
                `}
              onClick={() => {
                if (upcomingEvents.length > 0)
                  scrollToSection(upcomingRef as any, "upcoming");
              }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"
                  ></path>
                </svg>
              </span>
              <span className="text-sm md:text-base">Upcoming Events</span>
            </li>
            <li
              className={`p-2 flex gap-2 items-center rounded-md  transition-colors ${activeCategory === "past"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 hover:bg-blue-200"
                } ${pastEvents.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
                } `}
              onClick={() => {
                if (pastEvents.length > 0)
                  scrollToSection(pastRef as any, "past");
              }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"
                  ></path>
                </svg>
              </span>
              <span className="text-sm md:text-base">Past Events</span>
            </li>
          </ul>
        </div>

        <div className="flex-grow mr-3">
          {/* Ongoing Events Section */}
          {ongoingEvents.length > 0 && (
            <section ref={ongoingRef} className="pt-4 md:pt-0">
              <div className="text-center">
                <div className="mb-12 md:mb-16 lg:mb-20">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Ongoing{" "}
                    <span className="text-blue-600">Adventure & Events</span>
                  </div>
                </div>

                <div
                  ref={eventsRef}
                  className="grid gap-10 sm:gap-12 md:gap-16 grid-cols-1"
                >
                  {loading ? (
                    [...Array(2)].map((_, index) => (
                      <SkeletonLoader key={`ongoing-skeleton-${index}`} />
                    ))
                  ) : ongoingEvents.length > 0 ? (
                    ongoingEvents.map(({ event, fixedDate }, index) => (
                      <EventCard
                        key={`ongoing-${event.id}-${fixedDate.id || index}`}
                        event={event}
                        fixedDate={fixedDate}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-10">
                      <p className="text-lg sm:text-xl text-gray-600">
                        No ongoing events at the moment
                      </p>
                      <p className="mt-2 text-gray-500">
                        Check back later for new adventures!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <section ref={upcomingRef} className="">
              <div className="text-center">
                <header className="relative z-10 text-left mb-8 px-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4">
                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Upcoming
                    </span>{" "}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
                        Adventures
                      </span>
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transform scale-x-0 animate-scale-x"></div>
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 max-w-2xl  font-medium">
                    Embark on extraordinary journeys that create
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      unforgettable memories
                    </span>
                  </p>
                </header>
                {/* Enhanced Events List */}
                <div className="relative z-10 flex flex-col gap-12 md:gap-16 px-4 md:px-8">
                  {loading ? (
                    [...Array(2)].map((_, index) => (
                      <SkeletonLoader key={`upcoming-skeleton-${index}`} />
                    ))
                  ) : upcomingEvents.length > 0 ? (
                    upcomingEvents.map(({ event, fixedDate }, index) => (
                      <EventCard
                        key={`upcoming-${event.id}-${fixedDate.id || index}`}
                        event={event}
                        fixedDate={fixedDate}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-10">
                      <p className="text-lg sm:text-xl text-gray-600">
                        No upcoming events scheduled
                      </p>
                      <p className="mt-2 text-gray-500">
                        We're planning new adventures - stay tuned!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <section ref={pastRef} className="py-12 md:py-16 lg:py-20">
              <div className="text-center">
                <div className="mb-12 md:mb-16 lg:mb-20">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Past{" "}
                    <span className="text-red-600">Adventure & Events</span>
                  </div>
                </div>

                <div className="grid gap-10 sm:gap-12 md:gap-16 grid-cols-1">
                  {loading ? (
                    [...Array(2)].map((_, index) => (
                      <SkeletonLoader key={`past-skeleton-${index}`} />
                    ))
                  ) : pastEvents.length > 0 ? (
                    pastEvents.map(({ event, fixedDate }, index) => (
                      <EventCard
                        key={`past-${event.id}-${fixedDate.id || index}`}
                        event={event}
                        fixedDate={fixedDate}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-10">
                      <p className="text-lg sm:text-xl text-gray-600">
                        No past events available
                      </p>
                      <p className="mt-2 text-gray-500">
                        Check back after our next adventure!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;