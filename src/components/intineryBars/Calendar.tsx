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
    tripDuration,
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

    // Helper function to check if a date is a valid fixed date start date
    const isFixedDateStart = (date: Date) => {
        return fixedDates.some(fd => {
            const fixedStart = new Date(fd.startDate);
            return fixedStart.getDate() === date.getDate() &&
                fixedStart.getMonth() === date.getMonth() &&
                fixedStart.getFullYear() === date.getFullYear();
        });
    };

    // Calculate hovered duration dates
    const hoveredDurationDates = useMemo(() => {
        if (!hoveredDate || !isFixedDateStart(hoveredDate)) return [];
        const dates = [];
        for (let i = 0; i < tripDuration; i++) {
            const date = new Date(hoveredDate);
            date.setDate(hoveredDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, [hoveredDate, tripDuration]);

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

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(year, month, day);
        if (isFixedDateStart(clickedDate)) {
            onDateSelect(clickedDate);
        }
    };

    const handleDateHover = (day: number) => {
        const hoveredDate = new Date(year, month, day);
        if (isFixedDateStart(hoveredDate)) {
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
            const isToday = today.toDateString() === date.toDateString();
            const isPast = date < today;
            const isSelected = isDateSelected(date);
            const isHighlighted = isDateHighlighted(date);
            const isHovered = isDateHovered(date);
            const isValidFixedDate = isFixedDateStart(date);

            days.push(
                <button
                    key={day}
                    onClick={() => !isPast && isValidFixedDate && handleDateClick(day)}
                    onMouseEnter={() => !isPast && isValidFixedDate && handleDateHover(day)}
                    onMouseLeave={handleDateLeave}
                    disabled={isPast || !isValidFixedDate}
                    className={`
            p-2 border  relative text-sm font-medium rounded-sm transition-all duration-200
            ${isPast || !isValidFixedDate
                            ? ' cursor-not-allowed   border-gray-300'
                            : 'hover:cursor-pointer'
                        }
            ${isSelected ? 'text-white bg-[#F05E25]  hover:opacity-90' : ''}
            ${isHighlighted && !isSelected ? '!text-white  border-[#F05E25] bg-[#F05E25]' : ''}
            ${isHovered && !isSelected && !isHighlighted ? '!text-[#F05E25] !border-[#F05E25] ' : ''}
            ${!isHighlighted && !isSelected && !isHovered ? '' : ''}
            ${isValidFixedDate && !isPast && !isSelected ? ' border-gray-400' : ''}
          `}

                    style={{
                        color: isPast || !isValidFixedDate ? '#9CA3AF' : isSelected || isHighlighted ? '#FFFFFF' : isHovered ? '#F05E25' : '#1F2937',
                    }}
                >
                    {
                        !isValidFixedDate && !isHighlighted && !isHovered && (
                            <>
                                <div className="absolute  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-zinc-400/80 flex justify-center items-center w-[60%] h-[1px] ">
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
        <div className="bg-white rounded-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
                {monthNames[month]} {year}
            </h3>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-xs font-medium text-gray-900 text-center">
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
