"use client";

import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { IFixedDate, ITravelPackage } from "@/types/IPackages";
import Link from "next/link";
import { setPackage, setSelectedFixedDateId } from "@/store/booking-store";
import Select from "react-select";
import { bookPrivateTrip } from "@/service/booking";
import SuccessModal from "@/components/common/SuccessModal";
import Calendar from "./Calendar";
import { useQuery } from "@tanstack/react-query";
import { fetchCaptchaToken } from "@/service/captcha";

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
    <div className="bg-white rounded-sm border border-zinc-200 p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-zinc-800">Complete Your Booking</h3>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-700"
        >
          <Icon icon="mdi:close" width="24" height="24" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-zinc-100 rounded-sm text-zinc-800">
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

const PrivateTripForm: React.FC<{ packageId: string }> = ({ packageId }) => {


  const { data, isLoading } = useQuery({
    queryKey: ['captcha'],
    queryFn: fetchCaptchaToken
  })

  const [formData, setFormData] = useState({
    startDate: '',
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+977',
    numberOfTravelers: '',
    country: '',
    howDidYouFind: '',
    comments: '',
    agreeToTerms: false,
    captchaToken: data?.data.token || "",
    captchaAnswer: '',
    packageId: packageId
  });

  // Country codes for phone dropdown
  const countryCodeOptions = [
    { value: '+1', label: 'US/Canada', flag: '🇺🇸' },
    { value: '+44', label: 'UK', flag: '🇬🇧' },
    { value: '+91', label: 'India', flag: '🇮🇳' },
    { value: '+977', label: 'Nepal', flag: '🇳🇵' },
    { value: '+86', label: 'China', flag: '🇨🇳' },
    { value: '+81', label: 'Japan', flag: '🇯🇵' },
    { value: '+82', label: 'South Korea', flag: '🇰🇷' },
    { value: '+61', label: 'Australia', flag: '🇦🇺' },
    { value: '+49', label: 'Germany', flag: '🇩🇪' },
    { value: '+33', label: 'France', flag: '🇫🇷' },
    { value: '+39', label: 'Italy', flag: '🇮🇹' },
    { value: '+34', label: 'Spain', flag: '🇪🇸' },
    { value: '+31', label: 'Netherlands', flag: '🇳🇱' },
    { value: '+41', label: 'Switzerland', flag: '🇨🇭' },
    { value: '+46', label: 'Sweden', flag: '🇸🇪' },
    { value: '+47', label: 'Norway', flag: '🇳🇴' },
    { value: '+45', label: 'Denmark', flag: '🇩🇰' },
    { value: '+65', label: 'Singapore', flag: '🇸🇬' },
    { value: '+852', label: 'Hong Kong', flag: '🇭🇰' },
    { value: '+64', label: 'New Zealand', flag: '🇳🇿' },
  ];

  // Options for "How did you find us"
  const howDidYouFindOptions = [
    { value: 'Google Search', label: 'Google Search' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Friend/Family Referral', label: 'Friend/Family Referral' },
    { value: 'Travel Agent', label: 'Travel Agent' },
    { value: 'Previous Customer', label: 'Previous Customer' },
    { value: 'Other', label: 'Other' },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Generate random captcha values
  const [captcha] = useState(() => {
    const num1 = Math.floor(Math.random() * 50) + 10;
    const num2 = Math.floor(Math.random() * 50) + 10;
    return { num1, num2, answer: num1 + num2 };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user types
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setErrorMessage('Please agree to the Terms and Conditions');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Prepare data according to API schema
      const privateTripData = {
        date: formData.startDate,
        leadTravellerName: formData.fullName,
        email: formData.email,
        phone: `${formData.countryCode}${formData.phone}`, // Combine country code and phone
        numberOfTraveller: parseInt(formData.numberOfTravelers),
        country: formData.country,
        howDidYouReachUs: formData.howDidYouFind,
        message: formData.comments,
        termsAndAgreement: formData.agreeToTerms,
        captchaToken: data?.data.token || "",
        captchaAnswer: parseInt(formData.captchaAnswer),
        packageId: formData.packageId || packageId
      };

      // Call API
      const response = await bookPrivateTrip(privateTripData);

      // Show success modal
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        startDate: '',
        fullName: '',
        email: '',
        phone: '',
        countryCode: '+977',
        numberOfTravelers: '',
        country: '',
        howDidYouFind: '',
        comments: '',
        agreeToTerms: false,
        captchaToken: "",
        captchaAnswer: '',
        packageId: packageId // Preserve packageId on reset
      });
    } catch (error: any) {
      console.error('Error submitting private trip request:', error);
      setErrorMessage(
        error.response?.data?.message || error.response?.data?.msg ||
        'Failed to submit your request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-6">
        <p className="text-zinc-700 leading-relaxed">
          Looking for personalized experience? We organize privately guided journey which is mainly designed to fit your taste and interest. Please fill out the form below to get started.
        </p>
      </div>


      <form onSubmit={handleSubmit} className="bg-white rounded-lg sm:border border-zinc-200 sm:p-6 gap-3 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2">
        {/* Error Message */}
        {errorMessage && (
          <div className="col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2">
            <Icon icon="mdi:alert-circle" width="20" height="20" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Date Field */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-zinc-700 mb-2">
            Choose your own date*
          </label>
          <div className="relative">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 pl-10 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
              placeholder="MM/DD/YYYY"
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 mb-2">
            Lead Traveler's Full Name*
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
            placeholder="Full Name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
            placeholder="Email"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-2">
            Phone*
          </label>
          <div className="flex gap-2">
            <Select
              value={countryCodeOptions.find(opt => opt.value === formData.countryCode)}
              onChange={(option) => {
                if (option) {
                  setFormData(prev => ({ ...prev, countryCode: option.value }));
                }
              }}
              options={countryCodeOptions}
              isDisabled={isSubmitting}
              className="min-w-[100px]"
              classNamePrefix="react-select"
              formatOptionLabel={(option) => (
                <div className="">
                  <span>{option.value}</span>
                </div>
              )}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#d1d5db',
                  '&:hover': { borderColor: '#F05E25' },
                  boxShadow: 'none',
                  minHeight: '42px'
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#F05E25' : state.isFocused ? '#FEF3EF' : 'white',
                  color: state.isSelected ? 'white' : '#1f2937',
                  '&:active': { backgroundColor: '#F05E25' }
                })
              }}
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Number of Travelers */}
        <div>
          <label htmlFor="numberOfTravelers" className="block text-sm font-medium text-zinc-700 mb-2">
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
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
            placeholder="No. of Travellers"
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-zinc-700 mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
            placeholder="Country"
          />
        </div>

        {/* How did you find us */}
        <div className="col-span-2">
          <label htmlFor="howDidYouFind" className="block text-sm font-medium text-zinc-700 mb-2">
            How did you find Real Himalaya?*
          </label>
          <Select
            value={howDidYouFindOptions.find(opt => opt.value === formData.howDidYouFind)}
            onChange={(option) => {
              if (option) {
                setFormData(prev => ({ ...prev, howDidYouFind: option.value }));
              }
            }}
            options={howDidYouFindOptions}
            isDisabled={isSubmitting}
            placeholder="How did you find Real Himalaya?"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#d1d5db',
                '&:hover': { borderColor: '#F05E25' },
                boxShadow: 'none',
                minHeight: '42px'
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#F05E25' : state.isFocused ? '#FEF3EF' : 'white',
                color: state.isSelected ? 'white' : '#1f2937',
                '&:active': { backgroundColor: '#F05E25' }
              })
            }}
          />
        </div>

        {/* Comments */}
        <div className="col-span-2">
          <label htmlFor="comments" className="block text-sm font-medium text-zinc-700 mb-2">
            Place your comments here
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows={4}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none resize-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="mt-1 w-4 h-4 text-[#F05E25] border-zinc-300 rounded focus:ring-[#F05E25] disabled:cursor-not-allowed"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-zinc-700">
            I agree to Real Himalaya{' '}
            <a href="/terms-and-conditions" className="text-[#F05E25] hover:underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        {/* Captcha */}
        <div className="col-span-2 flex gap-4 flex-wrap items-center mt-5 mb-3">
          <label htmlFor="captchaAnswer" className="flex gap-4 items-center flex-wrap text-sm  font-medium text-zinc-700 mb-2">
            <span>Prove your humanity: </span><span className="text-orange-500">{isLoading ? 'Loading...' : data?.data.question} = *</span>
          </label>
          <input
            type="text"
            id="captchaAnswer"
            name="captchaAnswer"
            value={formData.captchaAnswer}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="px-4 w-fit py-2 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
            placeholder="Answer"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full col-span-2 mt-6 md:mt-0 md:flex justify-end items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-fit bg-[#F05E25] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#01283F] transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Icon icon="mdi:loading" className="animate-spin" width="20" height="20" />
                Submitting...
              </>
            ) : (
              <>
                <Icon icon="mdi:send" width="20" height="20" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Booking Request Submitted!"
        message="Thank you for your interest! We have received your private trip request and our team will get back to you shortly with a customized itinerary."
      />
    </div>
  );
};

const DatesAndPrices = ({
  data,
  packageId,
  pkg,
  onShowBooking
}: {
  data: IFixedDate[] | null;
  packageId: string;
  pkg: ITravelPackage | null;
  onShowBooking: () => void;
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
            : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
        >
          Group Departure
        </button>
        <button
          onClick={() => setTripType('private')}
          className={`border  px-4 py-2 transition-colors duration-200 ${tripType === 'private'
            ? 'border-[#01283F] bg-[#01283F] text-white'
            : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
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
            <div className="flex justify-between items-center mb-2 gap-4 flex-wrap">
              <h3 className="font-semibold text-zinc-800">Select Your Start Date</h3>

              {/* Navigation dropdowns */}
              <div className="flex items-center gap-2">
                <Select
                  value={{ value: firstMonth, label: new Date(firstYear, firstMonth).toLocaleString('default', { month: 'long' }) }}
                  onChange={(option) => {
                    if (option) {
                      setCurrentDisplayMonth(new Date(firstYear, option.value, 1));
                    }
                  }}
                  options={Array.from({ length: 12 }, (_, i) => ({
                    value: i,
                    label: new Date(2000, i).toLocaleString('default', { month: 'long' })
                  }))}
                  className="min-w-[140px]"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#F05E25' },
                      boxShadow: 'none'
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#F05E25' : state.isFocused ? '#FEF3EF' : 'white',
                      color: state.isSelected ? 'white' : '#1f2937',
                      '&:active': { backgroundColor: '#F05E25' }
                    })
                  }}
                />
                <Select
                  value={{ value: firstYear, label: firstYear.toString() }}
                  onChange={(option) => {
                    if (option) {
                      setCurrentDisplayMonth(new Date(option.value, firstMonth, 1));
                    }
                  }}
                  options={Array.from({ length: 5 }, (_, i) => {
                    const year = currentYear + i;
                    return { value: year, label: year.toString() };
                  })}
                  className="min-w-[100px]"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#F05E25' },
                      boxShadow: 'none'
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#F05E25' : state.isFocused ? '#FEF3EF' : 'white',
                      color: state.isSelected ? 'white' : '#1f2937',
                      '&:active': { backgroundColor: '#F05E25' }
                    })
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 max-w-4xl md:grid-cols-2 gap-6 mb-8">
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
                      <h4 className="text-lg font-semibold text-zinc-800 mb-2">
                        Selected Trip Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-800 font-medium">Start Date:</span>
                          <p className="text-zinc-800">{selectedDate.toDateString()}</p>
                        </div>
                        <div>
                          <span className="text-zinc-800 font-medium">End Date:</span>
                          <p className="text-zinc-800">
                            {new Date(selectedDate.getTime() + (tripDuration - 1) * 24 * 60 * 60 * 1000).toDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-zinc-800 font-medium">Duration:</span>
                          <p className="text-zinc-800">{tripDuration} days</p>
                        </div>
                      </div>
                    </div>

                    <Link onClick={() => {
                      setPackage(pkg as ITravelPackage);
                      onShowBooking();
                    }} href={`#booking-modal`} >
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
        <PrivateTripForm packageId={packageId} />
      )}

      {/* Original Fixed Dates Table (for reference) */}

    </div>
  );
};

export default DatesAndPrices;