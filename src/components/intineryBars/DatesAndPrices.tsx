"use client";

import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { IFixedDate } from "@/types/IPackages";
import { useSelectedTrip } from "@/contexts/SelectedDateContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CalendarProps {
  month: number;
  year: number;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  highlightedDates: Date[];
  tripDuration: number;
}

const Calendar: React.FC<CalendarProps> = ({
  month,
  year,
  selectedDate,
  onDateSelect,
  highlightedDates,
  tripDuration,
}) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const today = new Date();

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

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    onDateSelect(clickedDate);
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

      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateClick(day)}
          disabled={isPast}
          className={`
            p-2 border   text-sm font-medium rounded-sm transition-all duration-200
            ${isPast
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:cursor-pointer'
            }
            ${isSelected ? 'text-[#F05E25] border-[#F05E25]  hover:opacity-90' : ''}
            ${isHighlighted && !isSelected ? 'text-[#F05E25] border border-[#F05E25]' : ''}
            ${!isHighlighted && !isSelected ? 'border-white' : ''}
          `}
          style={{

            // borderColor: isSelected
            //   ? '#F05E25'
            //   : isHighlighted && !isSelected
            //     ? '#F05E25'
            //     : isPast
            //       ? 'transparent'
            //       : '',
            // borderColor: isToday ? '#F05E25' : 'transparent',
            // ...((!isPast && !isSelected && !isHighlighted) && {
            //   ':hover': { backgroundColor: 'rgba(240, 94, 37, 0.1)' }
            // })
          }}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
        {monthNames[month]} {year}
      </h3>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-xs font-medium text-gray-500 text-center">
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

const BookingForm: React.FC<{
  selectedDate: Date;
  tripDuration: number;
  packageId: string;
  onClose: () => void;
}> = ({ selectedDate, tripDuration, packageId, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    numberOfTravelers: 1,
    specialRequests: ''
  });

  const endDate = new Date(selectedDate);
  endDate.setDate(selectedDate.getDate() + tripDuration - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Booking form submitted:', {
      ...formData,
      startDate: selectedDate,
      endDate,
      tripDuration
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Complete Your Booking</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <Icon icon="mdi:close" width="24" height="24" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg text-gray-800">
        <h4 className="font-semibold  mb-2">Selected Trip Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className=" font-medium">Start Date:</span>
            <p className="">{selectedDate.toDateString()}</p>
          </div>
          <div>
            <span className=" font-medium">End Date:</span>
            <p className="">{endDate.toDateString()}</p>
          </div>
          <div>
            <span className=" font-medium">Duration:</span>
            <p className="">{tripDuration} days</p>
          </div>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none"
              onFocus={(e) => {
                e.target.style.borderColor = '#F05E25';
                e.target.style.boxShadow = '0 0 0 2px rgba(240, 94, 37, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none"
              onFocus={(e) => {
                e.target.style.borderColor = '#F05E25';
                e.target.style.boxShadow = '0 0 0 2px rgba(240, 94, 37, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none"
              onFocus={(e) => {
                e.target.style.borderColor = '#F05E25';
                e.target.style.boxShadow = '0 0 0 2px rgba(240, 94, 37, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Travelers
            </label>
            <select
              value={formData.numberOfTravelers}
              onChange={(e) => setFormData({ ...formData, numberOfTravelers: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none"
              onFocus={(e) => {
                e.target.style.borderColor = '#F05E25';
                e.target.style.boxShadow = '0 0 0 2px rgba(240, 94, 37, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            rows={4}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none"
            placeholder="Any dietary restrictions, accessibility needs, or special requests..."
            onFocus={(e) => {
              e.target.style.borderColor = '#F05E25';
              e.target.style.boxShadow = '0 0 0 2px rgba(240, 94, 37, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D1D5DB';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div className="flex gap-4 w-full pt-4 justify-end items-center">
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 py-3 w-fit px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="shrink-0 w-fit py-3 px-4 text-white rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: '#F05E25'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D44A1F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F05E25';
            }}
          >
            Book Now
          </button>
        </div>
      </form> */}
    </div>
  );
};

const DatesAndPrices = ({
  data,
  packageId,
}: {
  data: IFixedDate[] | null;
  packageId: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState<Date | null>(null);
  const { setSelectedTrip } = useSelectedTrip();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate which months to display based on selected date or current display month
  const getDisplayMonths = () => {
    let baseDate: Date;

    if (currentDisplayMonth) {
      // Use the manually navigated month
      baseDate = currentDisplayMonth;
    } else if (selectedDate) {
      // Use the month containing the selected date
      baseDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    } else {
      // Default: current month
      baseDate = new Date(currentYear, currentMonth, 1);
    }

    const firstMonth = baseDate.getMonth();
    const firstYear = baseDate.getFullYear();

    const secondMonth = firstMonth === 11 ? 0 : firstMonth + 1;
    const secondYear = firstMonth === 11 ? firstYear + 1 : firstYear;

    return {
      firstMonth,
      firstYear,
      secondMonth,
      secondYear
    };
  };

  const { firstMonth, firstYear, secondMonth, secondYear } = getDisplayMonths();

  const handlePrevMonth = () => {
    const currentFirstDate = new Date(firstYear, firstMonth, 1);
    const prevMonth = new Date(currentFirstDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDisplayMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const currentFirstDate = new Date(firstYear, firstMonth, 1);
    const nextMonth = new Date(currentFirstDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDisplayMonth(nextMonth);
  };

  // Calculate trip duration from first fixed date (assuming all trips have same duration)
  const tripDuration = useMemo(() => {
    if (!data || data.length === 0) return 10; // Default to 10 days
    const firstTrip = data[0];
    const start = new Date(firstTrip.startDate);
    const end = new Date(firstTrip.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }, [data]);

  // Calculate highlighted dates based on selected date and trip duration
  const highlightedDates = useMemo(() => {
    if (!selectedDate) return [];
    const dates = [];
    for (let i = 0; i < tripDuration; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [selectedDate, tripDuration]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowForm(false); // Reset form visibility
    // Reset manual navigation when a date is selected
    setCurrentDisplayMonth(null);
  };



  return (
    <div
      id="date-&-prices"
      className="mt-6 mb-8 pb-10"
    >
      <h2 className="text-2xl  font-semibold text-gray-800 text-center sm:text-left ">
        <span className="w-fit text-2xl  font-semibold " >
          Dates & Prices
        </span>
      </h2>

      <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl">
        Choose your preferred travel date from the calendars below. Select any available date and we'll show you the complete trip duration.
      </p>

      <div className="mt-6">
        <table className="w-full">
          <tr className="bg-[#01283F]/5  rounded-sm">
            <th className="text-left px-4 py-3 ">
              <h2 className="uppercase text-zinc-800">Trip Dates</h2>
              <p className="font-normal text-sm">Arrival - Departure</p>
            </th>
            <th className="text-left px-4 py-3">
              <h2 className="uppercase text-zinc-800">Availability</h2>
              <p className="font-normal text-sm">Spots</p>
            </th>
            <th className="text-left px-4 py-3">
              <h2 className="uppercase text-zinc-800">Price</h2>
              <p className="font-normal text-sm">Per Person</p>
            </th>
            <th className="text-left px-4 py-3">
              <h2 className="uppercase text-zinc-800">Enquiry</h2>
              <p className="font-normal text-sm">Arrival - Departure</p>
            </th>
          </tr>
          {
            data?.map((trip, index) => {
              const startDate = new Date(trip.startDate);
              const endDate = new Date(trip.endDate);

              return (
                <tr key={index} className="border-b   border-gray-200 hover:bg-gray-50 transition-colors items-center duration-200">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="">
                        <h3 className="font-semibold text-gray-800">{startDate.toDateString().split(" ")[0]}</h3>
                        <p className="font-normal text-sm">{startDate.toDateString().split(" ")[1]}-{startDate.toDateString().split(" ")[2]}-{startDate.toDateString().split(" ")[3]}</p>
                      </div>
                      <Icon icon={"icon-park-outline:arrow-up"} rotate={45} />
                      <div className="">
                        <h3 className="font-semibold text-gray-800">{endDate.toDateString().split(" ")[0]}</h3>
                        <p className="font-normal text-sm">{endDate.toDateString().split(" ")[1]}-{endDate.toDateString().split(" ")[2]}-{endDate.toDateString().split(" ")[3]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4  h-full py-6 flex gap-4 items-center">
                    <p className="font-normal text-sm">{trip.availableSeats} spots left</p>
                    {trip.availableSeats > 0 ? trip.status.toLowerCase() == "open" ? (
                      <button className="bg-green-100 text-green-500 hover:underline text-sm tracking-wider font-semibold px-3 py-1 rounded-full uppercase">Available</button>
                    ) : (
                      <button className="bg-gray-100 text-gray-500 cursor-not-allowed px-3 py-1 rounded-full uppercase text-sm font-semibold" disabled>Not Available</button>
                    ) : (
                      <button className="bg-gray-100 text-gray-500 cursor-not-allowed px-3 py-1 rounded-full uppercase text-sm font-semibold" disabled>Not Available</button>
                    )
                    }
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-normal font-semibold">US ${trip.pricePerPerson}</p>
                  </td>
                  <td className="px-4 py-3">
                    {trip.status.toLowerCase() == "open" ? (
                      <button className="bg-orange-100 cursor-pointer hover:bg-orange-500 hover:text-white text-orange-500  tracking-wider font-semibold px-5 py-2 rounded-full uppercase">Book Now</button>
                    ) : (
                      <button className="bg-gray-100 text-gray-500 cursor-not-allowed  tracking-wider font-semibold px-5 py-2 rounded-full uppercase">Sold Out</button>
                    )}
                  </td>
                </tr>
              )
            })
          }
        </table>
      </div>


    </div >
  );
};

export default DatesAndPrices;
