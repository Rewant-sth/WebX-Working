"use client";

import { ArrowLeft, Minus, Plus } from "lucide-react";
import Banner from "@/components/bookingBanner/Banner";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPackagesById } from "@/service/packages";
import { useEffect, useMemo, useRef, useState } from "react";
import { bookTraveller } from "@/service/booking";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getSelectedFixedDateId, useBookingStore } from "@/store/booking-store";
import Link from "next/link";
import BookingFormSkeleton from "./_components/Skeleton";
import { IFixedDate } from "@/types/IPackages";
import Image from "next/image";
import { formSchema, FormDateInput, FormInput, FormSelect } from "./_components/utils";
import PaymentInfoDialog from "./_components/PaymentInfoDialog";
import BookingResultModal from "./_components/BookingResultModal";
import InclusionExclusionDialog from "./_components/InclusionExclusionDialog";
import BookingSummary from "./_components/BookingSummary";


export default function BookingForm() {
  const params = useParams();
  const router = useRouter();
  const [pricePerPerson, setPricePerPerson] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const storedFixedDateId = getSelectedFixedDateId();
  const [showResultModal, setShowResultModal] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; message: string }>({ success: false, message: '' });
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clearBookingData = useBookingStore((state) => state.clearBookingData);
  const [travelerCount, setTravelerCount] = useState(1);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [showInclusionExclusion, setShowInclusionExclusion] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: [{
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: null as unknown as Date,
        country: "",
        passportNumber: "",
        passportExpiry: null as unknown as Date,
        isChild: false,
      }],
      arrivalDate: "",
      departureDate: "",
      numberOfTravelers: 1,
      package: params.id as string || "",
      message: "",
      specialRequirements: "",
      termsAccepted: false,
      totalPeople: 1,
      totalAmount: 0,
      fixedDateId: "",
      addons: [], // Add default for addons,
      createdBy: "user_12345", // Static value as specified
      customizedBooking: false,// Static value as specified,
    }
  });

  const { fields } = useFieldArray({ control, name: "personalInfo" });

  // Watch form values for real-time updates
  const arrivalDate = useWatch({ control, name: "arrivalDate" });
  const departureDate = useWatch({ control, name: "departureDate" });
  const fixedDateId = useWatch({ control, name: "fixedDateId" });
  const selectedAddons = useWatch({ control, name: "addons" });
  const numberOfTravelers = useWatch({ control, name: "numberOfTravelers" });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
      }
    };
  }, []);


  // Fetch package data
  const { data: packageData } = useQuery({
    queryKey: ["packageById", params.id],
    queryFn: () => getPackagesById(params?.id as string),
    enabled: !!params.id,
  });

  // Handle package data when fetched
  useEffect(() => {
    if (packageData?.data?.fixedDates?.length) {
      // Try to use the stored fixed date ID first, otherwise use the first date
      let selectedDate = packageData.data.fixedDates[0];

      if (storedFixedDateId) {
        const foundDate = packageData.data.fixedDates.find(
          (date: IFixedDate) => date._id === storedFixedDateId
        );
        if (foundDate) {
          selectedDate = foundDate;
        }
      }

      const price = selectedDate?.pricePerPerson || 0;
      const dateId = selectedDate?._id || "";

      setPricePerPerson(price);
      setValue("fixedDateId", dateId);

      // Set dates from fixedDate selection - format as YYYY-MM-DD
      if (selectedDate) {
        const arrivalDateFormatted = new Date(selectedDate.startDate).toISOString().split('T')[0];
        const departureDateFormatted = new Date(selectedDate.endDate).toISOString().split('T')[0];
        setValue("arrivalDate", arrivalDateFormatted);
        setValue("departureDate", departureDateFormatted);
      }
    }
  }, [packageData, setValue, storedFixedDateId]);

  // Update price when selected date changes
  useEffect(() => {
    if (packageData?.data?.fixedDates && fixedDateId) {
      const selectedDate = packageData.data.fixedDates.find(
        (date: IFixedDate) => date._id === fixedDateId
      );
      if (selectedDate) {
        setPricePerPerson(selectedDate.pricePerPerson);

        // Only set dates if they haven't been manually set
        // Update dates when fixedDate changes - format as YYYY-MM-DD
        const arrivalDateFormatted = new Date(selectedDate.startDate).toISOString().split('T')[0];
        const departureDateFormatted = new Date(selectedDate.endDate).toISOString().split('T')[0];

        // Only update if current values are empty
        if (!arrivalDate) {
          setValue("arrivalDate", arrivalDateFormatted);
        }
        if (!departureDate) {
          setValue("departureDate", departureDateFormatted);
        }
      }
    }
  }, [fixedDateId, packageData, setValue]);

  // Calculate counts and totals
  const { childrenCount, totalAmount,  appliedPax } = useMemo(() => {
    // Use traveler count from state
    const totalTravelers = travelerCount;

    // Update numberOfTravelers field to match
    if (totalTravelers !== numberOfTravelers) {
      setValue("numberOfTravelers", totalTravelers);
    }

    const totalPeople = totalTravelers;
    const children = 0;

    let totalPrice = 0;
    let appliedPaxInfo = null;
    const breakdown: Array<{ paxId: string; min: number; max: number; count: number; pricePerPerson: number; total: number; label: string }> = [];

    // Find applicable pax based on traveler count
    const applicablePax = packageData?.data?.pax?.find((p: any) =>
      totalTravelers >= p.min && totalTravelers <= p.max
    );

    // Get the selected fixed date to use its price
    const selectedFixedDate = packageData?.data?.fixedDates?.find(
      (date: IFixedDate) => date._id === fixedDateId
    );
    const fixedDatePrice = selectedFixedDate?.pricePerPerson || pricePerPerson;

    // Apply pax price if within range, otherwise use fixed date price
    if (applicablePax) {
      const pricePerPersonForPax = applicablePax.discount;
      totalPrice = pricePerPersonForPax * totalTravelers;

      appliedPaxInfo = {
        paxId: applicablePax._id,
        min: applicablePax.min,
        max: applicablePax.max,
        count: totalTravelers,
        pricePerPerson: pricePerPersonForPax,
        total: totalPrice,
        label: 'Pax Price'
      };

      breakdown.push(appliedPaxInfo);
    } else {
      // Use fixed date price
      totalPrice = fixedDatePrice * totalTravelers;

      appliedPaxInfo = {
        paxId: 'fixed-price',
        min: 0,
        max: 0,
        count: totalTravelers,
        pricePerPerson: fixedDatePrice,
        total: totalPrice,
        label: 'Fixed Price'
      };

      breakdown.push(appliedPaxInfo);
    }

    // Calculate add-ons total
    const addonsTotal = packageData?.data?.addons
      ?.filter((addon: any) => selectedAddons?.includes(addon._id))
      ?.reduce((sum: number, addon: any) => sum + addon.price, 0) || 0;

    const finalAmount = totalPrice + addonsTotal;

    return {
      totalPeopleCount: totalPeople,
      childrenCount: children,
      totalAmount: finalAmount,
      originalAmount: totalPrice + addonsTotal,
      discountPercentage: 0,
      discountAmount: 0,
      paxBreakdown: breakdown,
      appliedPax: applicablePax
    };
  }, [travelerCount, numberOfTravelers, pricePerPerson, selectedAddons, packageData, setValue, fixedDateId]);  // Update form values when counts change


  useEffect(() => {
    setValue("package", params.id as string);
    setValue("totalPeople", numberOfTravelers || 1);
    setValue("totalAmount", totalAmount);
  }, [numberOfTravelers, childrenCount, totalAmount, setValue, params.id]);

  const { mutate } = useMutation({
    mutationFn: bookTraveller,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setBookingResult({ success: true, message: 'Booking successful! Please check your email for confirmation.' });
      setShowResultModal(true);
      clearBookingData();
      sessionStorage.removeItem("selectedDate");

      // Clear any existing timeout
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
      }

      // Auto-close after 3 seconds
      autoCloseTimeoutRef.current = setTimeout(() => {
        setShowResultModal(false);
        router.back();
      }, 3000);

      toast.success('Booking successful! Please check your email for confirmation.', {
        position: 'bottom-right',
        duration: 4000,
        style: {
          backgroundColor: 'green',
          color: 'white'
        }
      });
    },
    onError: (error: any) => {
      setBookingResult({ success: false, message: error?.response?.data?.message || 'Booking failed. Please try again.' });
      setShowResultModal(true);

      // Clear any existing timeout
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
      }

      // Auto-close after 3 seconds
      autoCloseTimeoutRef.current = setTimeout(() => {
        setShowResultModal(false);
      }, 3000);

      toast.error(error?.response?.data?.message || "Error occurred during booking", {
        position: 'bottom-right',
        duration: 4000,
        style: {
          backgroundColor: 'red',
          color: 'white'
        }
      });
    },
    onSettled: () => setIsLoading(false)
  });



  const onSubmit = (data: any) => {
    console.log("onSubmit called with data:", data);

    // Validate number of travelers doesn't exceed available seats
    const selectedFixedDate = packageData?.data?.fixedDates?.find(
      (date: IFixedDate) => date._id === data.fixedDateId
    );
    const availableSeats = selectedFixedDate?.availableSeats || 0;

    const totalTravelers = travelerCount;

    if (totalTravelers > availableSeats) {
      toast.error(`Cannot book ${totalTravelers} travelers. Only ${availableSeats} seats available.`);
      return;
    }

    if (totalTravelers === 0) {
      toast.error('Please select at least one traveler.');
      return;
    }

    // Format personal info with correct date format and field names
    const formattedPersonalInfo = data.personalInfo.map((person: any) => ({
      fullName: person.fullName,
      email: person.email,
      country: person.country,
      phoneNumber: person.phoneNumber,
      gender: person.gender,
      dateOfBirth: person.dateOfBirth instanceof Date
        ? person.dateOfBirth.toISOString().split('T')[0]
        : person.dateOfBirth,
      passportNumber: person.passportNumber,
      passportExpiryDate: person.passportExpiry instanceof Date
        ? person.passportExpiry.toISOString().split('T')[0]
        : person.passportExpiry,
      isChild: false

    }));

    // Prepare booking data according to the specified format
    const bookingData = {
      personalInfo: formattedPersonalInfo,
      adults: 1, // Static value as specified
      totalAmount: totalAmount,
      fixedDateId: data.fixedDateId,
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
      numberOfTravelers: totalTravelers,
      package: packageData?.data?._id as any,
      message: data.message || "",
      specialRequirements: "N/A", // Static value as specified
      termsAccepted: data.termsAccepted,
      addons: data.selectedAddons || [], // Send addon IDs as selectedAddons
      totalPeople: totalTravelers,
      createdBy: "user_12345", // Static value as specified
      customizedBooking: false // Static value as specified
    };

    console.log("Booking data to be sent:", bookingData);
    mutate({ bookingData });
  };


  // Function to extract all error messages
  const getAllErrorMessages = (errors: any): string[] => {
    const messages: string[] = [];

    // Top-level errors
    if (errors.arrivalDate?.message) messages.push(errors.arrivalDate.message);
    if (errors.departureDate?.message) messages.push(errors.departureDate.message);
    if (errors.termsAccepted?.message) messages.push(errors.termsAccepted.message);
    if (errors.fixedDateId?.message) messages.push(errors.fixedDateId.message);
    if (errors.totalPeople?.message) messages.push(errors.totalPeople.message);

    // Personal info errors
    if (errors.personalInfo) {
      errors.personalInfo.forEach((traveler: any, index: number) => {
        if (!traveler) return;

        Object.keys(traveler).forEach(field => {
          if (traveler[field]?.message) {
            messages.push(`Traveler ${index + 1}: ${field === "dateOfBirth" ? "Birth Date" : field === "passportExpiry" ? "Passport Expiry" : field} - ${traveler[field].message}`);
          }
        });
      });
    }

    return messages;
  };

  if (!packageData) return <BookingFormSkeleton />;

  return (
    <>
      <Banner />
      <div className="w-full lg:p-20 mx-auto p-4 md:p-6 bg-white">
        <button onClick={() => router.back()} className="flex items-center text-zinc-600 hover:text-orange-500 transition mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </button>



        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-800">Book Your Expedition</h1>
          <p className="text-zinc-600 mt-1">
            {packageData?.data?.name} · ${pricePerPerson}/traveler
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("Form validation failed!");
          console.log("Raw errors object:", errors);
          const errorMessages = getAllErrorMessages(errors);
          console.log("Validation Errors:", errorMessages);
          if (errorMessages.length > 0) {
            toast.error(errorMessages[0]);
          } else {
            console.log("No error messages extracted but validation failed");
            toast.error("Please check all required fields");
          }
        })}>
          <input type="hidden" {...register("package")} />
          <input type="hidden" {...register("fixedDateId")} />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Traveler Info */}
            <div className="flex-1">

              {/* Pax Selection Section - Always Show */}
              <div className="bg-white sm:p-6 rounded-sm sm:border border-zinc-200 mb-6">
                <h3 className="text-orange-600 text-lg font-medium mb-">Select Package</h3>

                <div className=" mb-6">
                  {packageData?.data?.pax && packageData.data.pax.length > 0 ? (
                    // Show actual pax options if available
                    packageData.data.pax.map((pax: any) => {
                      const isApplied = appliedPax?._id === pax._id;

                      return (
                        <div
                          key={pax._id}
                          className={` transition-all max-w-sm  ${isApplied
                            ? 'text-orange-500'
                            : 'text-zinc-800'
                            }`}
                        >
                          <div className="flex gap-1 justify-between items-center">
                            <div className="flex shrink-0 items-center gap-3">
                              <h4 className=" font-semibold">
                                {pax.min} - {pax.max} Pax
                              </h4>
                            </div>
                            <div className="w-full border border-dashed"></div>
                            <h4 className={`font-bold shrink-0 ${isApplied ? '' : ''}`}>
                              US$ {pax.discount}
                            </h4>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    // Show static fixed date price when no pax available
                    <div className="transition-all max-w-sm text-orange-500">
                      <div className="flex gap-1 justify-between items-center">
                        <div className="flex shrink-0 items-center gap-3">
                          <h4 className="font-semibold">
                            Fixed Price
                          </h4>
                        </div>
                        <div className="w-full border border-dashed"></div>
                        <h4 className="font-bold shrink-0">
                          US$ {pricePerPerson}
                        </h4>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-zinc-700 font-medium">Number of Travelers</label>
                  <div className="flex  w-fit items-center  ">
                    <button
                      type="button"
                      onClick={() => setTravelerCount(prev => Math.max(1, prev - 1))}
                      className="size-8 lg:size-10 rounded-full shrink-0  border-r bg-orange-100 border-orange-200 text-orange-500 hover:bg-orange-500 hover:text-white flex justify-center items-center text-sm transition-colors"
                    >
                      <Minus className="size-4" />
                    </button>
                    <input
                      type="number"
                      value={travelerCount}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 1 && value <= 100) {
                          setTravelerCount(value);
                        }
                      }}
                      min={1}
                      max={100}
                      className="w-20 text-center text-xl text-orange-500 outline-none px-2"
                    />
                    <button
                      type="button"
                      onClick={() => setTravelerCount(prev => Math.min(100, prev + 1))}
                      className="size-8 lg:size-10 rounded-full shrink-0  border-l border-orange-200 bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-white flex justify-center items-center text-sm transition-colors"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Single Traveler Information Form */}
              {fields.length > 0 && (
                <div className="bg-white sm:p-6 rounded-sm sm:border border-zinc-200 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-orange-600 text-lg font-medium">Traveller Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormInput
                      register={register}
                      name={`personalInfo.0.fullName`}
                      label="Full Name"
                      placeholder="Full Name"
                      error={errors.personalInfo?.[0]?.fullName}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      }
                    />

                    <FormInput
                      register={register}
                      name={`personalInfo.0.email`}
                      label="Email"
                      placeholder="Email Address"
                      type="email"
                      error={errors.personalInfo?.[0]?.email}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      }
                    />

                    <FormInput
                      register={register}
                      name={`personalInfo.0.phoneNumber`}
                      label="Phone Number"
                      placeholder="Phone Number"
                      type="tel"
                      error={errors.personalInfo?.[0]?.phoneNumber}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      }
                    />

                    <FormSelect
                      control={control}
                      name={`personalInfo.0.gender`}
                      label="Gender"
                      error={errors.personalInfo?.[0]?.gender}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.58 1a1 1 0 00-.868.504l-1.414 2.121a1 1 0 00.217 1.284L8.938 6 6.1 8.838a1 1 0 000 1.414l.932.932a1 1 0 001.414 0L11 8.414l1.121 1.121a1 1 0 001.284.217l2.121-1.414a1 1 0 00.504-.868V5.414a1 1 0 00-.293-.707L13.293 2.293A1 1 0 0012.586 2H9.58z" clipRule="evenodd" />
                          <path d="M3 17a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" />
                        </svg>
                      }
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" }
                      ]}
                    />

                    <FormDateInput
                      register={register}
                      name={`personalInfo.0.dateOfBirth`}
                      label="Date of Birth"
                      min="1900-01-01"
                      max={new Date().toISOString().split('T')[0]}
                      error={errors.personalInfo?.[0]?.dateOfBirth}
                      asDateObject={true}
                    />

                    <FormInput
                      register={register}
                      name={`personalInfo.0.country`}
                      label="Country"
                      placeholder="Country"
                      error={errors.personalInfo?.[0]?.country}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                      }
                    />

                    <FormInput
                      register={register}
                      name={`personalInfo.0.passportNumber`}
                      label="Passport Number"
                      placeholder="Passport Number"
                      error={errors.personalInfo?.[0]?.passportNumber}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      }
                    />

                    <FormDateInput
                      register={register}
                      name={`personalInfo.0.passportExpiry`}
                      label="Passport Expiry Date"
                      min={new Date().toISOString().split('T')[0]}
                      error={errors.personalInfo?.[0]?.passportExpiry}
                      asDateObject={true}
                    />
                  </div>
                </div>
              )}

              {/* Trip Dates Section */}
              <div className="bg-white sm:p-6 rounded-sm sm:border border-zinc-200 mb-6">
                <h3 className="text-orange-600 text-lg font-medium">Trip Dates</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormDateInput
                    register={register}
                    name="arrivalDate"
                    label="Arrival Date"
                    min={new Date().toISOString().split('T')[0]}
                    error={errors.arrivalDate}
                  />


                  <FormDateInput
                    register={register}
                    name="departureDate"
                    label="Departure Date"
                    min={arrivalDate || new Date().toISOString().split('T')[0]}
                    error={errors.departureDate}
                  />

                  <FormSelect
                    control={control}
                    name="fixedDateId"
                    label="Select Package Date"
                    error={errors.fixedDateId}
                    placeholder="Select a date"
                    options={packageData?.data?.fixedDates?.map((dateOption: IFixedDate) => {
                      const startDate = new Date(dateOption.startDate).toLocaleDateString();
                      const endDate = new Date(dateOption.endDate).toLocaleDateString();
                      return {
                        label: `${startDate} - ${endDate} ($${dateOption.pricePerPerson})`,
                        value: dateOption._id
                      };
                    }) || []}
                  />
                </div>
              </div>

              {/* Add-ons Section */}
              {packageData?.data?.addons && packageData.data.addons.length > 0 && (
                <div className="bg-white sm:p-6 rounded-sm sm:border border-zinc-200 mb-6">
                  <h3 className="text-orange-600 text-lg font-medium ">Add-ons & Extras</h3>
                  <p className="text-zinc-600 text-sm mb-4">Enhance your experience with these optional add-ons</p>

                  <div className="space-y-4 lg:space-y-0 lg:grid grid-cols-2 gap-4">
                    {packageData.data.addons.map((addon: any) => {
                      const isSelected = watch("addons")?.includes(addon._id);

                      return (
                        <div
                          key={addon._id}
                          className={`border rounded-md transition-all ${isSelected
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-zinc-200 hover:border-orange-300'
                            }`}
                        >
                          <input
                            type="checkbox"
                            id={`addon-${addon._id}`}
                            {...register("addons")}
                            value={addon._id}
                            className="hidden"
                          />
                          <label
                            htmlFor={`addon-${addon._id}`}
                            className="flex items-start gap-4 cursor-pointer p-4 w-full"
                          >


                            {/* Addon image (if available) */}
                            {addon.image && (
                              <div className="relative shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                <Image
                                  src={addon.image}
                                  alt={addon.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}

                            {/* Addon info */}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h4 className={`font-semibold text-base mb-1 ${isSelected ? 'text-orange-900' : 'text-zinc-800'}`}>
                                    {addon.name}
                                  </h4>
                                  {addon.description && (
                                    <div
                                      className={`text-sm leading-relaxed ${isSelected ? 'text-orange-800' : 'text-zinc-600'}`}
                                      dangerouslySetInnerHTML={{ __html: addon.description }}
                                    />
                                  )}
                                </div>

                                {/* Price tag */}
                                <div className={`flex-shrink-0 px-3 py-1 rounded-full font-bold text-sm ${isSelected
                                  ? 'bg-orange-600 text-white'
                                  : 'bg-green-50 text-green-600'
                                  }`}>
                                  +${addon.price}
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              <div className="bg-white sm:p-6 rounded-sm sm:border border-zinc-200 mb-6">
                <h3 className="text-orange-600 text-lg font-medium">Additional Notes</h3>

                <div className="mb-4">
                  <label className="block text-zinc-700 mb-2">Special Requests</label>
                  <textarea
                    {...register("specialRequirements", {
                      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        if (!e.isTrusted) {
                          e.preventDefault();
                          e.target.value = '';
                        }
                      }
                    })}
                    placeholder="Dietary needs, accessibility requirements, etc."
                    autoComplete="off"
                    data-form-type="other"
                    className="w-full p-3 border border-zinc-300 rounded-sm min-h-[120px]"
                  />
                </div>

                {/* <div>
                  <label className="block text-zinc-700 mb-2">Message (Optional)</label>
                  <textarea
                    {...register("message")}
                    placeholder="Additional information or questions..."
                    className="w-full p-3 border border-zinc-300 rounded-sm min-h-[120px]"
                  />
                </div> */}
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white sm:p-6 rounded-sm sm:border border-zinc-200 mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    {...register("termsAccepted")}
                    className="mt-1 w-5 h-5 accent-orange-600"
                  />
                  <label htmlFor="termsAccepted" className="ml-2 text-zinc-700">
                    I accept the{" "}
                    <Link target="_blank" href="/terms-and-conditions" className="text-orange-600 hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-red-500 text-sm mt-2">{errors.termsAccepted.message}</p>
                )}
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <BookingSummary
              packageName={packageData?.data?.name}
              travelerCount={travelerCount}
              pricePerPerson={pricePerPerson}
              arrivalDate={arrivalDate}
              departureDate={departureDate}
              selectedAddons={selectedAddons || []}
              addons={packageData?.data?.addons || []}
              totalAmount={totalAmount}
              appliedPax={appliedPax}
              isLoading={isLoading}
              onPaymentInfoClick={() => setShowPaymentInfo(true)}
              onInclusionExclusionClick={() => setShowInclusionExclusion(true)}
              inclusions={packageData?.data?.inclusion?.map(item => item.description) || []}
              exclusions={packageData?.data?.exclusion?.map(item => item.description) || []}
            />

          </div>
        </form >
      </div >

      {/* Modals */}
      <BookingResultModal
        isOpen={showResultModal}
        success={bookingResult.success}
        message={bookingResult.message}
        onClose={() => {
          if (autoCloseTimeoutRef.current) {
            clearTimeout(autoCloseTimeoutRef.current);
          }
          setShowResultModal(false);
          if (bookingResult.success) {
            router.push("/");
          }
        }}
      />

      <PaymentInfoDialog
        isOpen={showPaymentInfo}
        onClose={() => setShowPaymentInfo(false)}
      />

      <InclusionExclusionDialog
        isOpen={showInclusionExclusion}
        onClose={() => setShowInclusionExclusion(false)}
        inclusions={packageData?.data?.inclusion?.map(item => item.description) || []}
        exclusions={packageData?.data?.exclusion?.map(item => item.description) || []}
      />
    </>
  );
}





