"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useQuery } from "@tanstack/react-query";
import { getPackages } from "@/service/packages";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IFixedDate, ITravelPackage } from "@/types/IPackages";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "@/service/api";
import { setPackage } from "@/store/booking-store";

export function EventCardSkeleton() {
  return (
    <div className="h-[35rem] md:h-[45rem] relative event-card overflow-hidden">
      <Skeleton className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#38bdf8]/70 flex justify-center flex-col p-6 md:p-10 lg:p-16 text-white">
        <div className="space-y-4 md:space-y-6">
          <div className="flex gap-4 w-fit rounded-full text-blue-500 items-center text-lg md:text-xl font-semibold">
            <Skeleton width={180} height={24} className="rounded-full" />
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-[3.5rem] 2xl:text-[5rem] font-bold">
            <Skeleton width="80%" />
          </h2>

          <div className="text-xl md:text-2xl lg:text-3xl max-w-4xl line-clamp-2">
            <Skeleton count={2} />
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton width={160} height={20} />
            <div className="flex gap-1 md:gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  height={60}
                  width={70}
                  className="md:h-16 md:w-16 lg:h-20 lg:w-24"
                />
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-12 flex flex-wrap gap-3 sm:gap-4">
            <Skeleton height={48} width={140} className="md:h-14 md:w-40" />
            <Skeleton height={48} width={140} className="md:h-14 md:w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

const getTimeLeft = (endDate: string | Date | null) => {
  if (!endDate) return { total: -1, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const end = new Date(endDate).getTime();
  const now = Date.now();
  const total = end - now;

  if (total <= 0) {
    return { total: -1, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

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

const EventCard = React.memo(function EventCard({
  event,
}: {
  event: ITravelPackage;
}) {
  const fixedDate = useMemo(() => event?.fixedDates?.[0], [event?.fixedDates]);
  const endDate = useMemo(() => fixedDate?.endDate, [fixedDate]);
  const timeLeft = useCountdown(endDate);
  const countdownRef = useRef<HTMLDivElement>(null);

  const dateParts = useMemo(() => {
    if (!endDate) return null;
    const date = new Date(endDate);
    return {
      month: date.toLocaleString("default", { month: "short" }),
      day: date.getDate().toString(),
    };
  }, [endDate]);

  useEffect(() => {
    if (countdownRef.current && timeLeft.total > 0) {
      gsap.fromTo(
        countdownRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [timeLeft]);

  return (
    <div className="min-h-[30rem] sm:min-h-[35rem] md:min-h-[44rem] relative event-card py-16 overflow-hidden">
      {dateParts && (
        <div className="absolute top-0 rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl right-4 md:right-8 lg:right-16 bg-white text-blue-500 text-xl md:text-2xl lg:text-3xl font-semibold z-[40] p-3 md:p-4 lg:px-6 text-center">
          <span className="font-bold">
            {dateParts.month}</span> <br />
          <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {dateParts.day}
          </span>
        </div>
      )}

      <Image
        src={event?.coverImage}
        fill
        alt={event?.name || "Event"}
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />

      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#38bdf8]/70 flex justify-center flex-col p-6 md:p-10  lg:px-16  text-white">
        <div>
          <div className="space-y-2 md:space-y-4 mb-6 md:mb-8">
            <div className="flex gap-4 bg-white w-fit px-4 py-1 md:py-2 rounded-full text-blue-500 items-center text-xs sm:text-base md:text-lg lg:text-xl font-semibold">
              <span>
                "Initiative for Global Solidarity on Climate Justice"
              </span>
            </div>
            <h2 className="text-lg max-w-5xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-[3.1rem] 2xl:text-[5rem] font-bold">
              {event?.name}
            </h2>
            <p
              id="editor" dangerouslySetInnerHTML={{ __html: event?.overview }}
              className="max-w-4xl text-sm sm:text-xl md:text-2xl lg:text-3xl line-clamp-2"
            />
          </div>

          <div className="flex border-b border-dashed pb-6 border-white/10 justify-between items-end gap-6 flex-wrap">
            <div className="mt-4 text-lg font-medium">
              {!endDate ? (
                <span>No event date</span>
              ) : timeLeft.total > 0 ? (
                <div className="space-y-2">
                  <h2 className="text-lg md:text-xl">
                    Hurry up! Event ending soon
                  </h2>
                  <div className="flex gap-1 md:gap-2 items-center flex-wrap">
                    <CountdownBox value={timeLeft.days} label="D" />
                    <CountdownBox value={timeLeft.hours} label="H" />
                    <CountdownBox value={timeLeft.minutes} label="M" />
                    <CountdownBox value={timeLeft.seconds} label="S" />
                  </div>
                </div>
              ) : (
                <span className="text-red-300">Event Ended</span>
              )}
            </div>

            <div className="">
              <div className="flex gap-2 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width={72} height={72} viewBox="0 0 36 36"><path fill="#22408b" d="M27.796 19L8 5v26h19.796L15.918 19z"></path><path fill="#dd2f45" d="M25 18L9 7.196V30h16L13.574 18z"></path><path fill="#fff" d="m14.291 24.041l.586-.816l-1 .098l.1-1l-.817.586l-.414-.916l-.414.916l-.817-.586l.099 1l-1-.098l.586.816l-.916.414l.916.414l-.586.816l1-.098l-.099 1l.817-.586l.414.916l.414-.916l.817.586l-.1-1l1 .098l-.586-.816l.916-.414zm-1.546-7.147l.001.002l.001-.002l.018.002c1.468 0 2.66-1.13 2.784-2.567a3.2 3.2 0 0 1-1.595 1.442l-.175-.244l.611-.276l-.611-.276l.391-.545l-.668.066l.067-.668l-.546.391l-.276-.612l-.276.612l-.546-.391l.067.668l-.668-.066l.391.545l-.611.276l.611.276l-.167.233a3.2 3.2 0 0 1-1.566-1.431a2.795 2.795 0 0 0 2.763 2.565"></path></svg>
                </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width={72} height={72} viewBox="0 0 36 36"><path fill="#138808" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-5H0z"></path><path fill="#f93" d="M36 14V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v5z"></path><path fill="#f7f7f7" d="M0 13.667h36v8.667H0z"></path><circle cx={18} cy={18} r={4} fill="#000080"></circle><circle cx={18} cy={18} r={3.375} fill="#f7f7f7"></circle><path fill="#6666b3" d="m18.1 16.75l-.1.65l-.1-.65l.1-1.95zm-.928-1.841l.408 1.909l.265.602l-.072-.653zm-.772.32l.888 1.738l.412.513l-.238-.613zm-.663.508l1.308 1.45l.531.389l-.389-.531zm-.508.663l1.638 1.062l.613.238l-.513-.412zm-.32.772l1.858.601l.653.072l-.602-.265zM14.8 18l1.95.1l.65-.1l-.65-.1zm.109.828l1.909-.408l.602-.265l-.653.072zm.32.772l1.738-.888l.513-.412l-.613.238zm.508.663l1.45-1.308l.389-.531l-.531.389zm.663.508l1.062-1.638l.238-.613l-.412.513zm.772.32l.601-1.858l.072-.653l-.265.602zM18 21.2l.1-1.95l-.1-.65l-.1.65zm.828-.109l-.408-1.909l-.265-.602l.072.653zm.772-.32l-.888-1.738l-.412-.513l.238.613zm.663-.508l-1.308-1.45l-.531-.389l.389.531zm.508-.663l-1.638-1.062l-.613-.238l.513.412zm.32-.772l-1.858-.601l-.653-.072l.602.265zM21.2 18l-1.95-.1l-.65.1l.65.1zm-.109-.828l-1.909.408l-.602.265l.653-.072zm-.32-.772l-1.738.888l-.513.412l.613-.238zm-.508-.663l-1.45 1.308l-.389.531l.531-.389zm-.663-.508l-1.062 1.638l-.238.613l.412-.513zm-.772-.32l-.601 1.858l-.072.653l.265-.602z"></path><g fill="#000080"><circle cx={17.56} cy={14.659} r={0.2}></circle><circle cx={16.71} cy={14.887} r={0.2}></circle><circle cx={15.948} cy={15.326} r={0.2}></circle><circle cx={15.326} cy={15.948} r={0.2}></circle><circle cx={14.887} cy={16.71} r={0.2}></circle><circle cx={14.659} cy={17.56} r={0.2}></circle><circle cx={14.659} cy={18.44} r={0.2}></circle><circle cx={14.887} cy={19.29} r={0.2}></circle><circle cx={15.326} cy={20.052} r={0.2}></circle><circle cx={15.948} cy={20.674} r={0.2}></circle><circle cx={16.71} cy={21.113} r={0.2}></circle><circle cx={17.56} cy={21.341} r={0.2}></circle><circle cx={18.44} cy={21.341} r={0.2}></circle><circle cx={19.29} cy={21.113} r={0.2}></circle><circle cx={20.052} cy={20.674} r={0.2}></circle><circle cx={20.674} cy={20.052} r={0.2}></circle><circle cx={21.113} cy={19.29} r={0.2}></circle><circle cx={21.341} cy={18.44} r={0.2}></circle><circle cx={21.341} cy={17.56} r={0.2}></circle><circle cx={21.113} cy={16.71} r={0.2}></circle><circle cx={20.674} cy={15.948} r={0.2}></circle><circle cx={20.052} cy={15.326} r={0.2}></circle><circle cx={19.29} cy={14.887} r={0.2}></circle><circle cx={18.44} cy={14.659} r={0.2}></circle><circle cx={18} cy={18} r={0.9}></circle></g></svg>
                </span>
              </div>
              {/* <h2>This independence day</h2> */}
            </div>
          </div>

          <div className="mt-8 md:mt-12 max-w-sm">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
              <EventButton
                onClick={() => {
                  setPackage(event);
                }}
                href={`/booking/${event?.id}`}
                primary={true}
                text="Book Now"
                icon={<ArrowRight size={20} />}
              />
              <EventButton
                href={`/everest-basecamp-trek`}
                primary={false}
                text="View Details"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const CountdownBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white text-blue-500 h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-24 rounded-sm flex justify-center items-center text-xl md:text-2xl lg:text-3xl font-bold">
      {value.toString().padStart(2, "0")} <span className=" pl-2">{label}</span>
    </div>
  </div>
);

const EventButton = ({
  href,
  primary,
  text,
  icon,
  onClick,
}: {
  href: string;
  primary: boolean;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    onClick={onClick}
    href={href}
    className="flex-1 min-w-[140px] max-w-[200px] md:max-w-none"
  >
    <button
      className={`
            w-full group transition-all duration-300 ease-in-out 
            px-6 py-3 md:px-8 md:py-4 text-sm text-nowrap sm:text-base md:text-lg font-medium md:font-semibold 
            rounded-xl shadow-lg flex items-center justify-center gap-2
            ${primary
          ? "bg-blue-600 border-2 border-blue-600 hover:bg-blue-700 text-white"
          : "border-2 border-white/80 hover:border-white hover:bg-white hover:text-blue-600 backdrop-blur-[1px] bg-white/20 text-white"
        }
        `}
    >
      {text}
      {icon && (
        <span className="transition-transform group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </button>
  </Link>
);

// Custom hook for fetching event packages
const useEventPackages = () => {
  return useQuery({
    queryKey: ["eventPackages"],
    queryFn: async () => {
      const response = await api.get("/package/category/event");
      return response.data.data as ITravelPackage[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

const EventsPage = () => {
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use React Query for event packages
  const {
    data: eventPackages = [],
    isLoading: isLoadingEvents,
    isError: isEventError,
    error: eventError,
  } = useEventPackages();

  // Use React Query for regular packages (if still needed)
  const {
    data: regularPackagesData,
    isLoading: isLoadingRegular,
  } = useQuery({
    queryKey: ["getPackages", page],
    queryFn: () => getPackages(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Categorized events with proper memoization
  const categorizedEvents = useMemo(() => {
    if (!eventPackages.length) {
      return {
        ongoing: [],
        upcoming: [],
        past: [],
      };
    }

    const now = new Date();
    const ongoing: { event: ITravelPackage; fixedDate: IFixedDate }[] = [];
    const upcoming: { event: ITravelPackage; fixedDate: IFixedDate }[] = [];
    const past: { event: ITravelPackage; fixedDate: IFixedDate }[] = [];

    eventPackages.forEach((event) => {
      event?.fixedDates?.forEach((fixedDate) => {
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

    return { ongoing, upcoming, past };
  }, [eventPackages]);

  // Animation effect
  useEffect(() => {
    if (eventsRef.current && !isAnimating && !isLoadingEvents) {
      setIsAnimating(true);

      const eventCards = eventsRef.current.querySelectorAll(".event-card");
      if (eventCards.length > 0) {
        const ctx = gsap.context(() => {
          gsap.from(eventCards, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            onComplete: () => setIsAnimating(false),
          });
        }, eventsRef);

        return () => ctx.revert();
      } else {
        setIsAnimating(false);
      }
    }
  }, [isLoadingEvents, categorizedEvents.ongoing.length, isAnimating]);

  // Determine which event to display
  const eventToDisplay = useMemo(() => {
    // Priority: ongoing events first, then upcoming, then past
    if (categorizedEvents.ongoing.length > 0) {
      return categorizedEvents.ongoing[0].event;
    }
    if (categorizedEvents.upcoming.length > 0) {
      return categorizedEvents.upcoming[0].event;
    }
    if (categorizedEvents.past.length > 0) {
      return categorizedEvents.past[0].event;
    }

    // Fallback to regular packages data if available
    if (regularPackagesData?.data?.[0]) {
      const event = regularPackagesData.data[0];
      const lastIndex = event?.fixedDates?.length - 1;
      const lastFixedDate = event?.fixedDates?.[lastIndex];

      if (lastFixedDate?.pricePerPerson) {
        return event;
      }
    }

    return null;
  }, [categorizedEvents, regularPackagesData]);

  // Handle loading states
  const isLoading = isLoadingEvents || isLoadingRegular;

  // Handle error states
  if (isEventError) {
    console.error("Error fetching event packages:", eventError);
  }

  return (
    <div className="">
      <section className="">
        <div className="mx-auto">
          <div ref={eventsRef} className="grid gap-10 md:gap-16 grid-cols-1">
            {isLoading || !eventToDisplay ? (
              <EventCardSkeleton key="skeleton" />
            ) : (
              <EventCard key={eventToDisplay.id || eventToDisplay.slug} event={eventToDisplay} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;