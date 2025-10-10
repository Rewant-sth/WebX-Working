"use client";

import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { IFixedDate, ITravelPackage } from "@/types/IPackages";
import Link from "next/link";
import { setPackage, setSelectedFixedDateId } from "@/store/booking-store";

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
                <div className="absolute  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gray-500 flex justify-center items-center w-[60%] h-[1px] ">
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
    <div className="bg-white rounded-sm border border-gray-400 p-4">
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

  };

  return (
    <div className="bg-white rounded-sm border border-gray-200 p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Complete Your Booking</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <Icon icon="mdi:close" width="24" height="24" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded-sm text-gray-800">
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
    </div>
  );
};

const PrivateTripForm: React.FC = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    fullName: '',
    email: '',
    phone: '',
    numberOfTravelers: '',
    country: '',
    howDidYouFind: '',
    comments: '',
    agreeToTerms: false,
    captchaAnswer: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate captcha
    if (formData.captchaAnswer !== '11') {
      alert('Please answer the captcha correctly');
      return;
    }
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="mt-6">
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">
          Looking for personalized experience? We organize privately guided journey which is mainly designed to fit your taste and interest. Please fill out the form below to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 gap-3 grid lg:grid-cols-2">
        {/* Date Field */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Choose your own date*
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none"
            placeholder="MM/DD/YYYY"
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Lead Traveler's Full Name*
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none"
            placeholder="Full Name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none"
            placeholder="Email"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none"
            placeholder="Phone Number"
          />
        </div>

        {/* Number of Travelers */}
        <div>
          <label htmlFor="numberOfTravelers" className="block text-sm font-medium text-gray-700 mb-2">
            No. of Travellers*
          </label>
          <input
            type="number"
            id="numberOfTravelers"
            name="numberOfTravelers"
            value={formData.numberOfTravelers}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none"
            placeholder="No. of Travellers"
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none"
            placeholder="Country"
          />
        </div>

        {/* How did you find us */}
        <div className="col-span-2">
          <label htmlFor="howDidYouFind" className="block text-sm font-medium text-gray-700 mb-2">
            How did you find Ace the Himalaya?*
          </label>
          <select
            id="howDidYouFind"
            name="howDidYouFind"
            value={formData.howDidYouFind}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none bg-white"
          >
            <option value="">How did you find Ace the Himalaya?</option>
            <option value="google">Google Search</option>
            <option value="social-media">Social Media</option>
            <option value="friend">Friend/Family Referral</option>
            <option value="travel-agent">Travel Agent</option>
            <option value="previous-customer">Previous Customer</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Comments */}
        <div className="col-span-2">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
            Place your comments here
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none resize-none"
            placeholder="Any special requirements or questions..."
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            required
            className="mt-1 w-4 h-4 text-[#F05E25] border-gray-300 rounded focus:ring-[#F05E25]"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
            I agree to Ace the Himalaya{' '}
            <a href="/terms-and-conditions" className="text-[#F05E25] hover:underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        {/* Captcha */}
        <div className="col-span-2 flex gap-4 flex-wrap items-center mt-5 mb-3">
          <label htmlFor="captchaAnswer" className="block text-sm font-medium text-gray-700 mb-2">
            Prove your humanity: Ninety5 + twenty2 = *
          </label>
          <input
            type="text"
            id="captchaAnswer"
            name="captchaAnswer"
            value={formData.captchaAnswer}
            onChange={handleInputChange}
            required
            className=" px-4 w-fit py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none"
            placeholder="Answer"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#F05E25] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#01283F] transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:send" width="20" height="20" />
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

const DatesAndPrices = ({
  data,
  packageId,
  pkg
}: {
  data: IFixedDate[] | null;
  packageId: string;
  pkg: ITravelPackage | null;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState<Date | null>(null);
  const [tripType, setTripType] = useState<'group' | 'private'>('group');

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();



  // Calculate which months to display based on current display month or default to current month
  const getDisplayMonths = () => {
    let baseDate: Date;

    if (currentDisplayMonth) {
      // Use the manually navigated month
      baseDate = currentDisplayMonth;
    } else {
      // Default: current month (don't jump to selected date's month)
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

    // Find the matching fixed date and store its ID
    if (data) {
      const matchingFixedDate = data.find(fd => {
        const fixedStart = new Date(fd.startDate);
        return fixedStart.getDate() === date.getDate() &&
          fixedStart.getMonth() === date.getMonth() &&
          fixedStart.getFullYear() === date.getFullYear();
      });

      if (matchingFixedDate) {
        setSelectedFixedDateId(matchingFixedDate._id);
      }
    }
  };

  const handleDateHover = (date: Date | null) => {
    setHoveredDate(date);
  };


  return (
    <div
      id="date-&-prices"
      className=" pb-14"
    >
      <h2 className="text-2xl  text-orange-500 text-left ">
        <span className="w-fit   font-semibold " >
          Bookings & Availability
        </span>
      </h2>

      <div className="flex  items-center mt-6">
        <button
          onClick={() => setTripType('group')}
          className={`border  px-4 py-2 transition-colors duration-200 ${tripType === 'group'
            ? 'border-[#01283F] bg-[#01283F] text-white'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          Group Departure
        </button>
        <button
          onClick={() => setTripType('private')}
          className={`border  px-4 py-2 transition-colors duration-200 ${tripType === 'private'
            ? 'border-[#01283F] bg-[#01283F] text-white'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          Private Trip
        </button>
      </div>

      {tripType === 'group' ? (
        <>
          <p className="text-zinc-600  mt-6   leading-relaxed ">
            Choose your preferred travel date from the calendars below. Dates with a green ring are available fixed departure dates. Select any available date to see the complete trip duration and proceed to booking.
          </p>

          {/* Calendar Section */}
          <div className="mt-8 max-w-4xl">
            <div className="flex justify-between items-center  mb-2">
              <h3 className=" font-semibold text-gray-800 ">Select Your Start Date</h3>

              {/* Navigation arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-sm bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Previous months"
                >
                  <Icon icon="mdi:chevron-left" width="24" height="24" className="text-orange-500" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-sm bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Next months"
                >
                  <Icon icon="mdi:chevron-right" width="24" height="24" className="text-orange-500" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 max-w-4xl lg:grid-cols-2 gap-6 mb-8">
              <Calendar
                month={firstMonth}
                year={firstYear}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                highlightedDates={highlightedDates}
                tripDuration={tripDuration}
                hoveredDate={hoveredDate}
                onDateHover={handleDateHover}
                fixedDates={data || []}
              />

              <Calendar
                month={secondMonth}
                year={secondYear}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                highlightedDates={highlightedDates}
                tripDuration={tripDuration}
                hoveredDate={hoveredDate}
                onDateHover={handleDateHover}
                fixedDates={data || []}
              />
            </div>


            {/* Selected Date Info and Book Button */}
            {selectedDate && (
              <>
                <div className="bg-[#F05E25]/10 rounded-sm p-6 mb-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Selected Trip Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-800 font-medium">Start Date:</span>
                          <p className="text-gray-800">{selectedDate.toDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-800 font-medium">End Date:</span>
                          <p className="text-gray-800">
                            {new Date(selectedDate.getTime() + (tripDuration - 1) * 24 * 60 * 60 * 1000).toDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-800 font-medium">Duration:</span>
                          <p className="text-gray-800">{tripDuration} days</p>
                        </div>
                      </div>
                    </div>

                    <Link onClick={() => setPackage(pkg as ITravelPackage)} href={`/booking/${pkg?.slug}`} >
                      <button
                        className="bg-[#F05E25] text-white px-8 py-3 rounded-sm font-semibold hover:bg-[#01283F] transition-colors duration-200 flex items-center gap-2"
                      >
                        <Icon icon="mdi:calendar-check" width="20" height="20" />
                        Book This Trip
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {/* Booking Form */}
            {showForm && selectedDate && (
              <BookingForm
                selectedDate={selectedDate}
                tripDuration={tripDuration}
                packageId={packageId}
                onClose={() => setShowForm(false)}
              />
            )}
          </div>
        </>
      ) : (
        <PrivateTripForm />
      )}

      {/* Original Fixed Dates Table (for reference) */}

    </div>
  );
};

export default DatesAndPrices;