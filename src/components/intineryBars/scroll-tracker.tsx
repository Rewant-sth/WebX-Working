"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Eye,
    Compass,
    MapPinned,
    CalendarRange,
    DollarSign,
    CalendarDays,
    Users,
    HelpCircle,
    ClipboardCheck,
    Locate,
    Star,
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
    const [top, setTop] = useState<number>(0);
    const [lastScrollY, setLastScrollY] = useState<number>(0);

    // Update top position based on scroll direction
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = currentScrollY - lastScrollY;

            // If scrolling down, hide navbar (top = 0)
            if (scrollDifference > 0 && currentScrollY > 100) {
                setTop(0);
            }
            // If scrolling up more than 10 pixels, show navbar (top = 64)
            else if (scrollDifference < -10) {
                setTop(64);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

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
            id: "overview",
            label: "Overview",
            icon: <Eye className="w-4 h-4" />,
        },
        {
            id: "trip-glance",
            label: "Trip Info",
            icon: <Compass className="w-4 h-4" />,
        },
        {
            id: "route-map",
            label: "Route",
            icon: <MapPinned className="w-4 h-4" />,
        },
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
        <div
            className={`px-4 sm:px-8 md:px-12 lg:px-16 sticky w-full z-[99] backdrop-blur-sm border-b border-gray-200 bg-white/90 transition-transform duration-300 top-0 `}
        >
            <div className="py-2 flex justify-between items-center">


                {/* Scroll Spy Navigation Tabs */}
                {visibleSections.length > 0 && (
                    <div className="relative">

                        {/* Scrollable tabs container */}
                        <div className="flex overflow-x-auto z-[99] scrollbar-hide gap-2 py-2 ">
                            {visibleSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => handleScrollToSection(section.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-sm whitespace-nowrap text-sm font-medium transition-all duration-300 flex-shrink-0 ${activeSection === section.id
                                        ? "bg-[#01283F] text-white "
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                        }`}
                                >
                                    <span className={`${activeSection === section.id ? "text-white" : "text-gray-500"}`}>
                                        {section.icon}
                                    </span>
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="hidden sm:flex flex-col sm:flex-row  sm:items-center gap-3 sm:gap-6 ">
                    {/* Star Rating */}
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                    >
                        <span className="flex items-center gap-1">

                            <Star size={14} className="" />
                            <p className="text-sm sm:text-base  font-semibold">
                                4.9
                            </p>
                        </span>
                        <span className="text-sm ">(226 reviews)</span>
                    </div>

                    {/* Location */}
                    <span className="flex gap-1 items-center text-sm ">
                        <Locate size={14} className="" />
                        {data?.location}
                    </span>
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
                `}
            </style>
        </div>
    );
};

export default ScrollTracker;
