"use client";

import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { IFixedDate, ITravelPackage } from "@/types/IPackages";
import Link from "next/link";
import { useBookingStore } from "@/store/booking-store";

interface FixedDatesTableProps {
    data: IFixedDate[] | null;
    packageId: string;
    pkg: ITravelPackage | null;
}

// Helper function to format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    // Add ordinal suffix
    const suffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${suffix(day)} ${month} ${year}`;
};

const MONTHS = [
    { value: 0, label: 'January', short: 'Jan' },
    { value: 1, label: 'February', short: 'Feb' },
    { value: 2, label: 'March', short: 'Mar' },
    { value: 3, label: 'April', short: 'Apr' },
    { value: 4, label: 'May', short: 'May' },
    { value: 5, label: 'June', short: 'Jun' },
    { value: 6, label: 'July', short: 'Jul' },
    { value: 7, label: 'August', short: 'Aug' },
    { value: 8, label: 'September', short: 'Sep' },
    { value: 9, label: 'October', short: 'Oct' },
    { value: 10, label: 'November', short: 'Nov' },
    { value: 11, label: 'December', short: 'Dec' },
];

const FixedDatesTable: React.FC<FixedDatesTableProps> = ({ data, packageId, pkg }) => {
    const { setPackage, setSelectedFixedDateId, setArrivalDate, setDepartureDate } = useBookingStore();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

    // Get available years from the data
    const availableYears = useMemo(() => {
        if (!data || data.length === 0) return [currentYear];

        const years = new Set<number>();
        data.forEach(fd => {
            const startYear = new Date(fd.startDate).getFullYear();
            const endYear = new Date(fd.endDate).getFullYear();
            years.add(startYear);
            years.add(endYear);
        });

        return Array.from(years).sort((a, b) => a - b);
    }, [data, currentYear]);

    // Get months that have data for the selected year
    const availableMonths = useMemo(() => {
        if (!data || data.length === 0) return [];

        const months = new Set<number>();
        data.forEach(fd => {
            const startDate = new Date(fd.startDate);
            const endDate = new Date(fd.endDate);

            // Add all months between start and end date for the selected year
            if (startDate.getFullYear() === selectedYear || endDate.getFullYear() === selectedYear) {
                const monthToAdd = startDate.getFullYear() === selectedYear ? startDate.getMonth() : endDate.getMonth();
                months.add(monthToAdd);
            }
        });

        const sortedMonths = Array.from(months).sort((a, b) => a - b);

        // Auto-select first available month if current selection is not available
        if (sortedMonths.length > 0 && !sortedMonths.includes(selectedMonth)) {
            setSelectedMonth(sortedMonths[0]);
        }

        return sortedMonths;
    }, [data, selectedYear, selectedMonth]);

    // Filter data based on selected year and month
    const filteredData = useMemo(() => {
        if (!data || data.length === 0) return [];

        return data.filter(fd => {
            const startDate = new Date(fd.startDate);
            const endDate = new Date(fd.endDate);

            // Check if the date range includes the selected year
            const yearMatch = startDate.getFullYear() === selectedYear || endDate.getFullYear() === selectedYear;

            if (!yearMatch) return false;

            // Filter by the selected month
            const monthMatch =
                (startDate.getFullYear() === selectedYear && startDate.getMonth() === selectedMonth) ||
                (endDate.getFullYear() === selectedYear && endDate.getMonth() === selectedMonth) ||
                // Or if the date range spans across the selected month
                (startDate <= new Date(selectedYear, selectedMonth + 1, 0) && endDate >= new Date(selectedYear, selectedMonth, 1));

            return monthMatch;
        }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }, [data, selectedYear, selectedMonth]);

    const handlePreviousYear = () => {
        const currentIndex = availableYears.indexOf(selectedYear);
        if (currentIndex > 0) {
            setSelectedYear(availableYears[currentIndex - 1]);
            // Don't reset month - it will auto-adjust if not available
        }
    };

    const handleNextYear = () => {
        const currentIndex = availableYears.indexOf(selectedYear);
        if (currentIndex < availableYears.length - 1) {
            setSelectedYear(availableYears[currentIndex + 1]);
            // Don't reset month - it will auto-adjust if not available
        }
    };

    const handleBookNow = (fixedDate: IFixedDate) => {
        if (pkg) {
            setPackage(pkg);
            setSelectedFixedDateId(fixedDate._id);

            // Set arrival and departure dates from the fixed date
            const arrival = new Date(fixedDate.startDate);
            const departure = new Date(fixedDate.endDate);
            setArrivalDate(new Date(arrival.getFullYear(), arrival.getMonth(), arrival.getDate()));
            setDepartureDate(new Date(departure.getFullYear(), departure.getMonth(), departure.getDate()));

            console.log('🚀 Navigating to booking page with:', {
                packageId: pkg._id,
                fixedDateId: fixedDate._id,
                arrivalDate: arrival.toDateString(),
                departureDate: departure.toDateString(),
                pricePerPerson: fixedDate.pricePerPerson
            });
        }
    };

    if (!data || data.length === 0) {
        return (
            <div className="border rounded-lg p-8 text-center">
                <Icon icon="mdi:calendar-alert" className="size-12 mx-auto mb-4 text-zinc-400" />
                <p className="text-zinc-600 text-lg">No fixed departure dates available at the moment.</p>
                <p className="text-zinc-500 text-sm mt-2">Please check back later or book a private trip.</p>
            </div>
        );
    }

    const canGoPrevious = availableYears.indexOf(selectedYear) > 0;
    const canGoNext = availableYears.indexOf(selectedYear) < availableYears.length - 1;

    return (
        <div className="w-full  ">
            <div className="divide-y rounded-sm overflow-hidden divide-zinc-200 border border-zinc-300">

                {/* Year & Month Navigation */}
                <div className="flex items-center justify-between  bg-white   border-gray-300 ">
                    <button
                        onClick={handlePreviousYear}
                        disabled={!canGoPrevious}
                        className={`p-2 rounded-md transition-colors ${canGoPrevious
                            ? 'hover:bg-zinc-100 text-zinc-700'
                            : 'text-zinc-300 cursor-not-allowed'
                            }`}
                        aria-label="Previous Year"
                    >
                        <Icon icon="mdi:chevron-left" className="size-6" />
                    </button>

                    <div className="text-center">
                        <h3 className="text-md font-bold text-zinc-700">
                            {MONTHS[selectedMonth].label} {selectedYear}
                        </h3>
                    </div>

                    <button
                        onClick={handleNextYear}
                        disabled={!canGoNext}
                        className={`p-2 rounded-md transition-colors ${canGoNext
                            ? 'hover:bg-zinc-100 text-zinc-700'
                            : 'text-zinc-300 cursor-not-allowed'
                            }`}
                        aria-label="Next Year"
                    >
                        <Icon icon="mdi:chevron-right" className="size-6" />
                    </button>
                </div>

                {/* Month Tabs */}
                <div className="py-2 shrink-0">
                    <div className="flex  justify-center items-center  gap-2">
                        {/* Individual Month Tabs */}
                        {MONTHS.map((month) => {
                            const hasData = availableMonths.includes(month.value);
                            const isCurrentMonth = currentYear === selectedYear && currentMonth === month.value;

                            return (
                                <button
                                    key={month.value}
                                    onClick={() => hasData && setSelectedMonth(month.value)}
                                    disabled={!hasData}
                                    className={`px-3  rounded-full font-medium transition-colors relative ${selectedMonth === month.value
                                        ? 'bg-[#F05E25] text-white'
                                        : hasData
                                            ? 'text-zinc-500'
                                            : 'text-zinc-500'
                                        }`}
                                >
                                    <span className="hidden sm:inline">{month.short}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>


            {/* Fixed Dates Table */}
            {filteredData.length === 0 ? (
                <div className="border rounded-sm p-8 text-center bg-zinc-50">
                    <Icon icon="mdi:calendar-blank" className="size-12 mx-auto mb-4 text-zinc-400" />
                    <p className="text-zinc-600 text-lg">
                        No departures available for {MONTHS[selectedMonth].label} {selectedYear}
                    </p>
                    <p className="text-zinc-500 text-sm mt-2">Try selecting a different month or year.</p>
                </div>
            ) : (
                <div className="w-full border border-zinc-300 mt-4 rounded-sm overflow-hidden bg-white">
                    {/* Scrollable container for mobile */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px]">
                            <tbody className="divide-y divide-zinc-200">
                                {filteredData.map((fixedDate, index) => {
                                    const isAvailable = fixedDate.status?.toLowerCase() === 'open' && (fixedDate.availableSeats || 0) > 0;
                                    const isExpired = new Date(fixedDate.startDate) < new Date();

                                    return (
                                        <tr key={fixedDate._id || index} className="hover:bg-zinc-50 group transition-colors">
                                            <td className="p-3 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-zinc-500 mb-1">Start Date</span>
                                                    <span className="font-bold text-zinc-800">{formatDate(fixedDate.startDate)}</span>
                                                </div>
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-zinc-500 mb-1">End Date</span>
                                                    <span className="font-bold text-zinc-800">{formatDate(fixedDate.endDate)}</span>
                                                </div>
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    {isExpired ? (
                                                        <span className="flex items-center gap-2 text-zinc-500">
                                                            <Icon icon="mdi:clock-outline" className="size-5" />
                                                            <span className="text-sm font-medium">Expired</span>
                                                        </span>
                                                    ) : isAvailable ? (
                                                        <>
                                                            <span className="flex items-center gap-2 text-green-600 font-semibold">
                                                                <Icon icon="lets-icons:check-fill" className="size-6" />
                                                                <span>Available</span>
                                                            </span>
                                                            <span className="text-xs text-zinc-600">
                                                                {fixedDate.availableSeats} seat{fixedDate.availableSeats !== 1 ? 's' : ''} left
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="flex items-center gap-2 text-red-500 font-medium">
                                                            <Icon icon="mdi:close-circle" className="size-5" />
                                                            <span className="text-sm">Fully Booked</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-lg text-[#F05E25]">US$ {fixedDate.pricePerPerson}</span>
                                                    <span className="text-xs text-zinc-600">Per Person</span>
                                                </div>
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {isExpired ? (
                                                    <button
                                                        disabled
                                                        className="border border-zinc-300 bg-zinc-100 text-zinc-400 px-4 rounded-md py-1.5 cursor-not-allowed text-sm font-medium"
                                                    >
                                                        Expired
                                                    </button>
                                                ) : isAvailable ? (
                                                    <Link
                                                        href={`/booking/${packageId}`}
                                                        onClick={() => handleBookNow(fixedDate)}
                                                        className="border border-[#F05E25] text-[#F05E25] group-hover:bg-[#F05E25] group-hover:text-white px-4 rounded-md py-1.5 transition-colors duration-200 inline-block text-sm font-medium whitespace-nowrap"
                                                    >
                                                        Book Now
                                                    </Link>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="border border-zinc-300 bg-zinc-100 text-zinc-400 px-4 rounded-md py-1.5 cursor-not-allowed text-sm font-medium"
                                                    >
                                                        Sold Out
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            )}
            <p className="md:hidden mt-3 text-sm">Slide to see more</p>
        </div>
    );
};

export default FixedDatesTable;
