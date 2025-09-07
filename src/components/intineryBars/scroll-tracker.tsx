"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    Eye,
    CalendarRange,
    DollarSign,
    CalendarDays,
    Users,
    HelpCircle,
    ClipboardCheck,
    Shield,
    Backpack,
    Heart,
    AlertTriangle,
} from "lucide-react";
import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

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
                <Icon icon="lineicons:bulb-4" className="w-4 h-4" />
            ),
            condition: (data) => data?.attraction?.length > 0,
        },
        {
            id: "seasonal-info",
            label: "Seasons",
            icon: <Icon icon="carbon:calendar-heat-map" className="w-4 h-4" />,
            condition: (data) => Array.isArray(data?.seasonalTrek) && data.seasonalTrek.length > 0,
        },
        {
            id: "overview",
            label: "Overview",
            icon: <Eye className="w-4 h-4" />,
        },
        // {
        //     id: "trip-glance",
        //     label: "Trip Info",
        //     icon: <Compass className="w-4 h-4" />,
        // },
        // {
        //     id: "route-map",
        //     label: "Route",
        //     icon: <MapPinned className="w-4 h-4" />,
        // },
        {
            id: "itinerary",
            label: "Itinerary",
            icon: <CalendarRange className="w-4 h-4" />,
            condition: (data) => data?.itinerary?.length > 0,
        },
        {
            id: "inclusion-&-exclusion",
            label: "Cost Info",
            icon: <DollarSign className="w-4 h-4" />,
            condition: (data) => data?.inclusion?.length > 0,
        },
        {
            id: "requirements",
            label: "Requirements",
            icon: <ClipboardCheck className="w-4 h-4" />,
            condition: (data) => data?.requirements?.length > 0,
        },
        {
            id: "insurance",
            label: "Insurance",
            icon: <Shield className="w-4 h-4" />,
            condition: (data) => data?.insurance?.length > 0,
        },
        {
            id: "gear",
            label: "Gear Info",
            icon: <Backpack className="w-4 h-4" />,
            condition: (data) => data?.gearInfo?.length > 0,
        },
        {
            id: "why-love-this",
            label: "Why Love This",
            icon: <Heart className="w-4 h-4" />,
            condition: (data) => data?.whyLoveThisTrek?.length > 0,
        },
        {
            id: "important-notice",
            label: "Important Notice",
            icon: <AlertTriangle className="w-4 h-4" />,
            condition: (data) => data?.importantNotice?.length > 0,
        },
        {
            id: "date-&-prices",
            label: "Dates & Prices",
            icon: <CalendarDays className="w-4 h-4" />,
            condition: (data) => data?.fixedDates?.length > 0,
        },
        {
            id: "traveller-review",
            label: "Reviews",
            icon: <Users className="w-4 h-4" />,
            condition: (data) => data?.testimonial?.length > 0,
        },
        {
            id: "faqs",
            label: "FAQs",
            icon: <HelpCircle className="w-4 h-4" />,
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
        <div className="sticky top-0 z-[99999]  w-full  bg-white border-b border-gray-200 ">
            <div className="px-4 sm:px-6 lg:px-10 flex justify-between items-center gap-10 ">
                <div className="py-2 flex justify-start items-center overflow-auto">
                    {/* Scroll Spy Navigation Tabs */}
                    {visibleSections.length > 0 && (
                        <div className="relative">
                            <div className="flex overflow-x-auto z-[99] scrollbar-hide gap-2 py-2">
                                {visibleSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => handleScrollToSection(section.id)}
                                        className={`flex border items-center gap-2 px-3 py-2 rounded-sm whitespace-nowrap text-sm font-medium transition-all duration-300 flex-shrink-0 ${activeSection === section.id
                                            ? "bg-orange-500 text-white"
                                            : " border-transparent bg-gray-50 hover:bg-orange-500 hover:text-white text-gray-800 "
                                            }`}
                                    >
                                        <span className={`${activeSection === section.id ? "text-white" : ""}`}>
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
