"use client";

import React, { useMemo } from "react";
import { IFixedDate } from "@/types/IPackages";

interface CalendarProps {
    month: number;
    year: number;
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
    highlightedDates: Date[];
    tripDuration: number;
    hoveredDate: Date | null;
    onDateHover: (date: Date | null) => void;
    fixedDates: IFixedDate[];
}

const Calendar: React.FC<CalendarProps> = ({
    month,
    year,
    selectedDate,
    onDateSelect,
    highlightedDates,
    hoveredDate,
    onDateHover,
    fixedDates,
}) => {

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const today = new Date();

    // Calculate trip duration in days from a fixed date
    const calculateTripDuration = (fixedDate: IFixedDate) => {
        const start = new Date(fixedDate.startDate);
        const end = new Date(fixedDate.endDate);
        const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        const durationMs = endDate.getTime() - startDate.getTime();
        return Math.ceil(durationMs / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
    };

    // Helper function to check if a date is within any fixed date range
    const isDateInFixedRange = (date: Date) => {
        return fixedDates.some(fd => {
            const fixedStart = new Date(fd.startDate);
            const fixedEnd = new Date(fd.endDate);
            // Set time to midnight for accurate date comparison
            const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const rangeStart = new Date(fixedStart.getFullYear(), fixedStart.getMonth(), fixedStart.getDate());
            const rangeEnd = new Date(fixedEnd.getFullYear(), fixedEnd.getMonth(), fixedEnd.getDate());

            // Check if date is within the range AND the fixed date is available
            const isInRange = checkDate >= rangeStart && checkDate <= rangeEnd;
            const isAvailable = fd.status?.toLowerCase() === 'open' && (fd.availableSeats || 0) > 0;

            return isInRange && isAvailable;
        });
    };

    // Get the fixed date object for a given date (if it falls within the range)
    const getFixedDateForDate = (date: Date) => {
        return fixedDates.find(fd => {
            const fixedStart = new Date(fd.startDate);
            const fixedEnd = new Date(fd.endDate);
            const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const rangeStart = new Date(fixedStart.getFullYear(), fixedStart.getMonth(), fixedStart.getDate());
            const rangeEnd = new Date(fixedEnd.getFullYear(), fixedEnd.getMonth(), fixedEnd.getDate());

            // Check if date is within the range AND the fixed date is available
            const isInRange = checkDate >= rangeStart && checkDate <= rangeEnd;
            const isAvailable = fd.status?.toLowerCase() === 'open' && (fd.availableSeats || 0) > 0;

            return isInRange && isAvailable;
        });
    };

    // Helper function to check if a date is a valid fixed date start date
    const isFixedDateStart = (date: Date) => {
        return fixedDates.some(fd => {
            const fixedStart = new Date(fd.startDate);
            const fixedEnd = new Date(fd.endDate);
            const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const rangeStart = new Date(fixedStart.getFullYear(), fixedStart.getMonth(), fixedStart.getDate());
            const rangeEnd = new Date(fixedEnd.getFullYear(), fixedEnd.getMonth(), fixedEnd.getDate());

            // Check if date is within the range AND the fixed date is available
            const isInRange = checkDate >= rangeStart && checkDate <= rangeEnd;
            const isAvailable = fd.status?.toLowerCase() === 'open' && (fd.availableSeats || 0) > 0;

            return isInRange && isAvailable;
        });
    };

    // Calculate hovered duration dates - from hovered date for the trip duration
    const hoveredDurationDates = useMemo(() => {
        if (!hoveredDate) return [];

        const fixedDate = getFixedDateForDate(hoveredDate);
        if (!fixedDate) return [];

        // Calculate the trip duration from the fixed date
        const tripDurationDays = calculateTripDuration(fixedDate);

        const dates = [];
        const currentDate = new Date(hoveredDate);

        // Generate dates for the trip duration starting from hovered date
        for (let i = 0; i < tripDurationDays; i++) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }, [hoveredDate, fixedDates]);

    const isDateHighlighted = (date: Date) => {
        return highlightedDates.some(d =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );
    };

    const isDateSelected = (date: Date) => {
        if (!selectedDate) return false;
        return selectedDate.getDate() === date.getDate() &&
            selectedDate.getMonth() === date.getMonth() &&
            selectedDate.getFullYear() === date.getFullYear();
    };

    const isDateHovered = (date: Date) => {
        return hoveredDurationDates.some(d =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );
    };

    // Check if date is the first date in the highlighted range
    const isFirstHighlightedDate = (date: Date) => {
        if (highlightedDates.length === 0) return false;
        const firstDate = highlightedDates[0];
        return firstDate.getDate() === date.getDate() &&
            firstDate.getMonth() === date.getMonth() &&
            firstDate.getFullYear() === date.getFullYear();
    };

    // Check if date is the last date in the highlighted range
    const isLastHighlightedDate = (date: Date) => {
        if (highlightedDates.length === 0) return false;
        const lastDate = highlightedDates[highlightedDates.length - 1];
        return lastDate.getDate() === date.getDate() &&
            lastDate.getMonth() === date.getMonth() &&
            lastDate.getFullYear() === date.getFullYear();
    };

    // Check if date is the first date in the hovered range
    const isFirstHoveredDate = (date: Date) => {
        if (hoveredDurationDates.length === 0) return false;
        const firstDate = hoveredDurationDates[0];
        return firstDate.getDate() === date.getDate() &&
            firstDate.getMonth() === date.getMonth() &&
            firstDate.getFullYear() === date.getFullYear();
    };

    // Check if date is the last date in the hovered range
    const isLastHoveredDate = (date: Date) => {
        if (hoveredDurationDates.length === 0) return false;
        const lastDate = hoveredDurationDates[hoveredDurationDates.length - 1];
        return lastDate.getDate() === date.getDate() &&
            lastDate.getMonth() === date.getMonth() &&
            lastDate.getFullYear() === date.getFullYear();
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(year, month, day);
        if (isDateInFixedRange(clickedDate)) {
            onDateSelect(clickedDate);
        }
    };

    const handleDateHover = (day: number) => {
        const hoveredDate = new Date(year, month, day);
        if (isDateInFixedRange(hoveredDate)) {
            onDateHover(hoveredDate);
        }
    };

    const handleDateLeave = () => {
        onDateHover(null);
    };

    const renderCalendarDays = () => {
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isPast = date < today;
            const isSelected = isDateSelected(date);
            const isHighlighted = isDateHighlighted(date);
            const isHovered = isDateHovered(date);
            const isValidFixedDate = isFixedDateStart(date);
            const isFirstHighlighted = isFirstHighlightedDate(date);
            const isLastHighlighted = isLastHighlightedDate(date);
            const isFirstHovered = isFirstHoveredDate(date);
            const isLastHovered = isLastHoveredDate(date);

            // Determine if this date is first or last in range
            // First/last dates should always have full orange background, regardless of selected/highlighted state
            const isFirstOrLastDate = (isFirstHighlighted || isLastHighlighted) ||
                (isFirstHovered || isLastHovered);

            days.push(
                <button
                    key={day}
                    onClick={() => !isPast && isValidFixedDate && handleDateClick(day)}
                    onMouseEnter={() => !isPast && isValidFixedDate && handleDateHover(day)}
                    onMouseLeave={handleDateLeave}
                    disabled={isPast || !isValidFixedDate}
                    className={`p-2 border  relative text-sm group   font-medium rounded-sm transition-all duration-200
                    ${isPast || !isValidFixedDate ? ' cursor-not-allowed   border-zinc-300' : 'hover:cursor-pointer'}
                    ${isFirstOrLastDate ? '!text-white !border-[#F05E25] !bg-[#F05E25] hover:!bg-[#F05E25]/90' : ''}
                    ${isSelected && !isFirstOrLastDate ? 'text-white   hover:opacity-90' : ''}
                    ${isHovered && !isSelected && !isHighlighted && !isFirstOrLastDate ? '!text-[#F05E25] !border-[#F05E25] bg-[#F05E25]/10' : ''}
                    ${isHighlighted && !isSelected && !isFirstOrLastDate ? '!text-[#F05E25]  !border-[#F05E25] bg-[#F05E25]/10' : ''}
                    ${!isHighlighted && !isSelected && !isHovered && !isFirstOrLastDate ? '' : ''}
                    ${isValidFixedDate && !isPast && !isSelected && !isFirstOrLastDate ? 'border-zinc-300 ' : ''}
           
          `}

                    style={{
                        color: isPast || !isValidFixedDate ? '#9CA3AF' :
                            isFirstOrLastDate ? '#FFFFFF' :
                                isSelected || isHighlighted ? '#F05E25' :
                                    isHovered ? '#F05E25' : '#1F2937',
                        borderRadius: isFirstHighlighted || isFirstHovered ? '9999px 0 0 9999px' :
                            isLastHighlighted || isLastHovered ? '0 9999px 9999px 0' :
                                '0',
                        borderColor: isHighlighted || isSelected || isFirstOrLastDate ? '#F05E25' : "",

                    }}
                >
                    {
                        !isValidFixedDate && !isHighlighted && !isHovered && (
                            <>
                                <div className="absolute  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 group-hover:bg-[#F05E25]/80 bg-zinc-400/80 flex justify-center items-center w-[60%] h-[1px] ">
                                </div>
                                {/* <div className="absolute rotate-45 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-red-500 flex justify-center items-center w-[60%] h-[2px] ">
                </div> */}
                            </>
                        )
                    }
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="bg-white rounded-sm border border-zinc-200 p-4">
            <h3 className="text-lg font-semibold text-center mb-4 text-zinc-800">
                {monthNames[month]} {year}
            </h3>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-xs font-medium text-zinc-900 text-center">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
            </div>
        </div>
    );
};

export default Calendar;
