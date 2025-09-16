"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    Users,
    HelpCircle,
    ClipboardCheck,
    Backpack,
} from "lucide-react";
import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react";

// Define section interfaces for better type safety
interface Section {
    id: string;
    label: string;
    icon: React.ReactNode;
    condition?: (data: ITravelPackage) => boolean;
}

const ScrollTracker = ({ data }: { data: ITravelPackage | null }) => {
    const [activeSection, setActiveSection] = useState<string>("major-highlights");
    const [isScrollingToSection, setIsScrollingToSection] = useState(false);
    const lastScrollY = useRef(0);

    // Handle scroll events for section tracking only
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Define all possible sections with their conditions
    const sections: Section[] = [
        {
            id: "major-highlights",
            label: "Highlights",
            icon: (
                <Icon icon="stash:light-bulb-light" className="size-6" />
            ),
            condition: (data) => data?.attraction?.length > 0,
        },
        {
            id: "seasonal-info",
            label: "Seasons",
            icon: <Icon icon="ph:snowflake-thin" className="size-6 scale-110" />,
            condition: (data) => Array.isArray(data?.seasonalTrek) && data.seasonalTrek.length > 0,
        },
        {
            id: "overview",
            label: "Overview",
            icon: <Icon icon="qlementine-icons:info-32" className="size-6" />,
        },
        // {
        //     id: "trip-glance",
        //     label: "Trip Info",
        //     icon: <Compass className="size-6" />,
        // },
        // {
        //     id: "route-map",
        //     label: "Route",
        //     icon: <MapPinned className="size-6" />,
        // },
        {
            id: "itinerary",
            label: "Itinerary",
            icon: <Icon icon={"guidance:calendar"} className="size-6" />,
            condition: (data) => data?.itinerary?.length > 0,
        },
        {
            id: "inclusion-&-exclusion",
            label: "Cost Info",
            icon: <Icon strokeWidth={2} icon={"streamline-freehand:money-bag-dollar"} className="size-6" />,
            condition: (data) => data?.inclusion?.length > 0,
        },
        {
            id: "requirements",
            label: "Requirements",
            icon: <Icon icon={"streamline-freehand:form-edition-clipboard-check"} className="size-6" />,
            condition: (data) => data?.requirements?.length > 0,
        },
        {
            id: "route-map",
            label: "Route Map",
            icon: <Icon icon={'streamline-cyber:location-pin-1'} className="size-6" />,
            condition: (data) => !!data?.routeMap && data.routeMap.length > 0,
        },
        {
            id: "gear",
            label: "Gear Info",
            icon: <Backpack className="size-6" />,
            condition: (data) => data?.gearInfo?.length > 0,
        },
        {
            id: "insurance",
            label: "Insurance",
            icon: <Icon icon={"ph:hand-arrow-up-thin"} className="size-6" />,
            condition: (data) => data?.insurance?.length > 0,
        },
        {
            id: "why-love-this",
            label: "Why Love This",
            icon: <Icon icon={"ph:heart-thin"} className="size-6" />,
            condition: (data) => data?.whyLoveThisTrek?.length > 0,
        },
        {
            id: "important-notice",
            label: "Important Notice",
            icon: <Icon icon={"guidance:alert-triangle"} className="size-6" />,
            condition: (data) => data?.importantNotice?.length > 0,
        },
        {
            id: "date-&-prices",
            label: "Dates & Prices",
            icon: <Icon icon={"ph:calendar-dots-thin"} className="size-6 scale-110" />,
            condition: (data) => data?.fixedDates?.length > 0,
        },
        {
            id: "traveller-review",
            label: "Reviews",
            icon: <Users className="size-6" />,
            condition: (data) => data?.testimonial?.length > 0,
        },
        {
            id: "faqs",
            label: "FAQs",
            icon: <Icon icon={"qlementine-icons:question-32"} className="size-6" />,
            condition: (data) => data?.faq?.length > 0,
        },
    ];

    // Filter sections based on data availability
    const visibleSections = sections.filter((section) => {
        if (!data) return false;
        return section.condition ? section.condition(data) : true;
    });

    // Smooth scroll to section
    const handleScrollToSection = useCallback((sectionId: string) => {
        setIsScrollingToSection(true);
        const element = document.getElementById(sectionId);
        if (element) {
            const yOffset = -120; // Account for sticky header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setActiveSection(sectionId);

            // Reset scrolling flag after animation
            setTimeout(() => setIsScrollingToSection(false), 1000);
        }
    }, []);

    // Optimized scroll spy with throttling
    useEffect(() => {
        let ticking = false;

        const handleScrollSpy = () => {
            if (isScrollingToSection) return; // Don't update active section during manual scroll

            const sectionIds = visibleSections.map((section) => section.id);
            let current = sectionIds[0] || "major-highlights";

            // Find the section that's currently in view
            for (let sectionId of sectionIds) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if section is in the upper part of viewport
                    if (rect.top <= 200) {
                        current = sectionId;
                    } else {
                        break; // Stop at first section not in view
                    }
                }
            }

            setActiveSection(current);
            ticking = false;
        };

        const throttledScrollSpy = () => {
            if (!ticking) {
                requestAnimationFrame(handleScrollSpy);
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScrollSpy, { passive: true });

        // Initial check
        handleScrollSpy();

        return () => window.removeEventListener("scroll", throttledScrollSpy);
    }, [visibleSections, isScrollingToSection]);

    return (
        <div className="w-full ">
            {/* Mobile/Tablet Layout - Horizontal Scroll */}
            <div className="lg:hidden w-full bg-white border-b border-gray-200">
                <div className="w-full flex justify-start items-center overflow-auto">
                    <div className="py-2 flex justify-start items-center overflow-auto">
                        {visibleSections.length > 0 && (
                            <div className="relative">
                                <div className="flex overflow-x-auto z-[99] scrollbar-hide gap-2 py-2">
                                    {visibleSections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => handleScrollToSection(section.id)}
                                            className={`flex border items-center gap-2 px-3 py-2 rounded-sm whitespace-nowrap text-sm   transition-all duration-300 flex-shrink-0 ${activeSection === section.id
                                                ? "bg-orange-500 text-white"
                                                : " border-transparent bg-gray-50 hover:bg-orange-500 hover:text-white text-gray-800 "
                                                }`}
                                        >
                                            <span className={`${activeSection === section.id ? "text-white" : ""} `}>
                                                {section.icon}
                                            </span>
                                            {section.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Vertical Sidebar */}
            <div className="hidden lg:block">
                <div className="bg-white  rounded-sm  ">
                    <h3 className=" b  uppercase text-orange-500 font-semibold lg:text-xl  mb-4 pb-2 border-b border-gray-200">
                        Table of Contents
                    </h3>
                    {visibleSections.length > 0 && (
                        <nav className="space-y-1 pr-3">
                            {visibleSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => handleScrollToSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm  font-medium transition-all duration-300 text-left ${activeSection === section.id
                                        ? "bg-orange-500 text-white "
                                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                                        }`}
                                >
                                    <span className={`flex-shrink-0 ${activeSection === section.id ? "text-white" : ""}`}>
                                        {section.icon}
                                    </span>
                                    <span className="truncate">{section.label}</span>
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default ScrollTracker;
