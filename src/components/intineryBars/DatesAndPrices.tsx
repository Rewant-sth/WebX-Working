"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { IFixedDate, ITravelPackage } from "@/types/IPackages";
import Select from "react-select";
import { bookPrivateTrip } from "@/service/booking";
import SuccessModal from "@/components/common/SuccessModal";
import { useQuery } from "@tanstack/react-query";
import { fetchCaptchaToken } from "@/service/captcha";
import FixedDatesTable from "./FixedDatesTable";


const PrivateTripForm: React.FC<{ packageId: string }> = ({ packageId }) => {


  const { data, isLoading, refetch } = useQuery({
    queryKey: ['captcha'],
    queryFn: fetchCaptchaToken
  })

  const [formData, setFormData] = useState({
    startDate: 'N/A',
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+977',
    numberOfTravelers: '',
    country: 'N/A',
    howDidYouFind: 'N/A',
    comments: '',
    agreeToTerms: true,
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
        date: "2022-01-01", // Placeholder date for private trips
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
    <div id="date-and-price" className="mt-6">
      <div className="mb-6">
        <p className="text-zinc-800 sm:text-lg leading-relaxed">
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



        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 mb-2">
            Full Name*
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

        {/* Captcha */}
        <div className="col-span-2 flex gap-4 flex-wrap items-center m mb-5">
          <label htmlFor="captchaAnswer" className="flex gap-4 items-center flex-wrap   font-medium text-zinc-700 ">
            <span>Prove your humanity: </span><span className="text-orange-500">{isLoading ? 'Loading...' : data?.data.question} = *</span>
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="captchaAnswer"
              name="captchaAnswer"
              value={formData.captchaAnswer}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="px-4 w-fit py-2 border border-zinc-300 rounded-r-none border-r-0 rounded-sm focus:ring-2 focus:ring-[#F05E25] focus:border-transparent outline-none disabled:bg-zinc-100 disabled:cursor-not-allowed"
              placeholder="Answer"
            />
            <button type="button" disabled={isLoading} onClick={() => refetch()} className="px-4 w-fit py-2 border text-gray-500 hover:text-black border-zinc-300">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className={`${isLoading ? 'animate-spin' : ''}`}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16h5v5M10 8H5V3m14.418 6.003A8 8 0 0 0 5.086 7.976m-.504 7.021a8 8 0 0 0 14.331 1.027"></path></svg>
            </button>
          </div>
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
  const [tripType, setTripType] = useState<'group' | 'private'>('group');


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
          <p className="text-zinc-800  mt-6 sm:text-lg   leading-relaxed ">
            Choose your preferred travel date from the calendars below. Dates with a green ring are available fixed departure dates. Select any available date to see the complete trip duration and proceed to booking.
          </p>

          {/* Calendar Section */}
          <div className="mt-8 max-w-6xl">
            <FixedDatesTable
              data={data}
              packageId={packageId}
              pkg={pkg}
            />
          </div>
        </>
      ) : (
        <PrivateTripForm packageId={packageId} />
      )}
    </div>
  );
};

export default DatesAndPrices;