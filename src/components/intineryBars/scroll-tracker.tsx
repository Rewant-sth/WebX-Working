"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    Users,
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
                <Icon icon="lineicons:bulb-4" strokeWidth={4} className="size-5" />
            ),
            condition: (data) => data?.attraction?.length > 0,
        },
        {
            id: "seasonal-info",
            label: "Seasons",
            icon: <Icon icon="ph:snowflake" className="size-5 scale-110" />,
            condition: (data) => Array.isArray(data?.seasonalTrek) && data.seasonalTrek.length > 0,
        },
        {
            id: "overview",
            label: "Overview",
            icon: <Icon icon="si:info-line" className="size-5" />,
        },
        {
            id: "trip-highlight",
            label: "Trip Highlights",
            icon: <Icon icon="mdi:star-circle-outline" className="size-5" />,
            condition: (data) => !!(data?.tripHighlight && data.tripHighlight.length > 0),
        },
        {
            id: "short-itinerary",
            label: "Short Itinerary",
            icon: <Icon icon="mdi:map-marker-path" className="size-5" />,
            condition: (data) => !!((data?.shortItinerary && data.shortItinerary.length > 0) || (data?.itinerary && data.itinerary.length > 0)),
        },
        {
            id: "itinerary",
            label: "Itinerary",
            icon: <Icon icon={"guidance:calendar"} strokeWidth={1.3} className="size-5" />,
            condition: (data) => !!(data?.itinerary?.length && data.itinerary.length > 0),
        },
        {
            id: "date-&-prices",
            label: "Dates & Prices",
            icon: <Icon strokeWidth={0.5} icon={"ph:calendar-dots"} className="size-5 scale-110" />,
            condition: (data) => !!(data?.fixedDates?.length && data.fixedDates.length > 0),
        },
        {
            id: "inclusion-&-exclusion",
            label: "Cost Info",
            icon: <Icon strokeWidth={1} icon={"ep:coin"} className="size-5 " />,
            condition: (data) => data?.inclusion?.length > 0,
        },
        {
            id: "requirements",
            label: "Requirements",
            icon: <Icon icon={"pepicons-pop:list-circle"} className="size-5" />,
            condition: (data) => data?.requirements?.length > 0,
        },
        {
            id: "route-map",
            label: "Route Map",
            icon: <Icon icon={'solar:map-point-linear'} strokeWidth={2} className="size-5" />,
            condition: (data) => !!data?.routeMap && data.routeMap.length > 0,
        },
        {
            id: "gear",
            label: "Gear Info",
            icon: <Icon icon={"streamline-ultimate:chef-gear-gloves"} className="size-5" />,
            condition: (data) => data?.gearInfo?.length > 0,
        },
        {
            id: "insurance",
            label: "Insurance",
            icon: <Icon icon={"fluent-mdl2:health-refresh"} className="size-5" />,
            condition: (data) => data?.insurance?.length > 0,
        },
        {
            id: "why-love-this",
            label: "Why Love This",
            icon: <Icon icon={"solar:smile-circle-linear"} className="size-5" />,
            condition: (data) => data?.whyLoveThisTrek?.length > 0,
        },
        {
            id: "important-notice",
            label: "Important Notice",
            icon: <Icon icon={"hugeicons:alert-square"} className="size-5" />,
            condition: (data) => data?.importantNotice?.length > 0,
        },

        {
            id: "traveller-review",
            label: "Reviews",
            icon: <Users className="size-5" />,
            condition: (data) => data?.testimonial?.length > 0,
        },
        {
            id: "faqs",
            label: "FAQs",
            icon: <Icon icon={"streamline-ultimate:contact-us-faq"} className="size-5" />,
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

    // Auto-scroll active button into view on mobile/tablet
    const scrollActiveButtonIntoView = useCallback((sectionId: string) => {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
            const scrollContainer = scrollContainerRef.current;
            if (!scrollContainer) return;

            // Only auto-scroll on mobile/tablet (when scroll container is visible)
            const isDesktop = window.innerWidth >= 1024; // lg breakpoint
            if (isDesktop) return;

            const activeButton = scrollContainer.querySelector(`[data-section-id="${sectionId}"]`) as HTMLElement;
            if (!activeButton) return;

            const containerRect = scrollContainer.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            // Calculate if button is fully visible with some padding
            const isButtonVisible =
                buttonRect.left >= containerRect.left + 10 &&
                buttonRect.right <= containerRect.right - 10;

            if (!isButtonVisible) {
                // Calculate scroll position to center the button
                const containerWidth = scrollContainer.clientWidth;
                const buttonOffsetLeft = activeButton.offsetLeft;
                const buttonWidth = activeButton.offsetWidth;

                // Center the button in the container
                const targetScrollLeft = buttonOffsetLeft - (containerWidth / 2) + (buttonWidth / 2);

                scrollContainer.scrollTo({
                    left: Math.max(0, targetScrollLeft),
                    behavior: 'smooth'
                });
            }
        }, 150); // Small delay to ensure DOM is ready
    }, []);

    // Auto-scroll to active button when activeSection changes
    useEffect(() => {
        // Always try to auto-scroll when section changes
        // This ensures the mobile tab scrolls to the active section
        scrollActiveButtonIntoView(activeSection);
    }, [activeSection, scrollActiveButtonIntoView]);

    // Optimized scroll spy with throttling
    useEffect(() => {
        let ticking = false;

        const handleScrollSpy = () => {
            if (isScrollingToSection) return; // Don't update active section during manual scroll

            const sectionIds = visibleSections.map((section) => section.id);
            let current = sectionIds[0] || "major-highlights";

            // Find the section that's currently in view
            for (const sectionId of sectionIds) {
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

            if (current !== activeSection) {
                setActiveSection(current);
            }
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
    }, [visibleSections, isScrollingToSection, activeSection]);

    return (
        <div className="w-full ">
            {/* Mobile/Tablet Layout - Horizontal Scroll */}
            <div className="lg:hidden w-full bg-white border-b  border-zinc-200">
                <div className="w-full overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto scrollbar-hide gap-2 py-2 px-2"
                    >
                        {visibleSections.map((section) => (
                            <button
                                key={section.id}
                                data-section-id={section.id}
                                onClick={() => handleScrollToSection(section.id)}
                                className={`flex border items-center gap-2 px-3 py-2 rounded-sm whitespace-nowrap text-sm transition-all duration-300 flex-shrink-0 ${activeSection === section.id
                                    ? "bg-orange-500 text-white"
                                    : " border-transparent bg-zinc-50 hover:bg-orange-500 hover:text-white text-zinc-800 "
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
            </div>

            {/* Desktop Layout - Vertical Sidebar */}
            <div className="hidden lg:block">
                <div className="bg-white  rounded-sm  ">
                    <h3 className=" lg:py-3  uppercase text-orange-500 font-semibold lg:text-xl  mb-4 pb-2 border-b border-zinc-200">
                        Table of Contents
                    </h3>
                    {visibleSections.length > 0 && (
                        <nav className="space-y-1 pr-3">
                            {visibleSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => handleScrollToSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-sm  font-medium transition-all duration-300 text-left ${activeSection === section.id
                                        ? "bg-orange-500 text-white "
                                        : "text-zinc-700 hover:bg-orange-50 hover:text-orange-600"
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
