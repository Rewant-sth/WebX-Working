"use client";

import { ArrowLeft, Trash, Loader2 } from "lucide-react";
import Banner from "@/components/bookingBanner/Banner";
import { useController, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPackagesById } from "@/service/packages";
import { useEffect, useMemo, useState } from "react";
import { bookTraveller } from "@/service/booking";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getPackage } from "@/store/booking-store";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingFormSkeleton from "./_components/Skeleton";
import { Select, SelectOption } from '@highlight-ui/select';

// Zod schemas
const travelerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  country: z.string().min(1, "Country is required"),
  passportNumber: z
    .string()
    .min(6, "Passport number must be at least 6 characters")
    .max(9, "Passport number must not exceed 9 characters")
    .regex(/^[A-Z0-9]+$/, "Passport number must be alphanumeric"),
  passportExpiry: z.date({ required_error: "Passport expiry date is required" }),
  isChild: z.boolean().default(false),
});

const formSchema = z.object({
  personalInfo: z.array(travelerSchema),
  arrivalDate: z.date({ required_error: "Arrival date required" }),
  departureDate: z.date({ required_error: "Departure date required" }),
  numberOfTravelers: z.number().min(1, "Required"),
  package: z.string().min(1, "Package is required"),
  message: z.string().optional(),
  specialRequirements: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val, "You must accept the terms"),
  totalAmount: z.number().min(1, "Total price required"),
  totalPeople: z.number().min(1, "At least one adult required"),
  children: z.number().min(0, "Children count cannot be negative"),
  fixedDateId: z.string().min(1, "Fixed date not selected properly"),
  selectedAddons: z.array(z.string()).default([]), // Add addons field
});

// Reusable form components
const FormInput = ({
  register,
  name,
  label,
  error,
  icon,
  type = "text",
  placeholder,
  min,
  required = true,
  onChange
}: any) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1">
      {label} {required && "*"}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        {...register(name, {
          ...(type === "number" && {
            valueAsNumber: true,
            onChange: onChange
          })
        })}
        min={min}
        type={type}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm"
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const FormSelect = ({ register, name, label, error, icon, options, required = true }: any) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1">
      {label} {required && "*"}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        {icon}
      </div>
      <select
        {...register(name)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm appearance-none bg-white"
      >
        <option value="">Select {label}</option>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

interface FormDatePickerProps {
  control: any;
  name: string;
  label: string;
  error?: any;
  minDate?: Date;
  maxDate?: Date;
  validate?: (value: Date) => string | boolean;
  required?: boolean;
  disabled?: boolean;
}

const FormDatePicker = ({
  control,
  name,
  label,
  error,
  minDate,
  maxDate,
  validate,
  required = true,
  disabled = false
}: FormDatePickerProps) => {
  const { field } = useController({
    name,
    control,
    rules: { validate },
  });

  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 mb-1">
        {label} {required && "*"}
      </label>
      <div className="relative w-full">
        <DatePicker
          selected={field.value}
          onChange={field.onChange}
          maxDate={maxDate}
          minDate={new Date(1950, 0, 1)} // 👈 allow past dates
          showYearDropdown // 👈 This enables year dropdown
          scrollableYearDropdown // 👈 Optional: makes year list scrollable
          yearDropdownItemNumber={100} // 👈 Optional: number of years to show
          dateFormat="yyyy-MM-dd"
          wrapperClassName="w-full"
          className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          disabled={disabled}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default function BookingForm() {
  const params = useParams();
  const router = useRouter();
  const [pricePerPerson, setPricePerPerson] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const selectedPackage = getPackage();

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
      arrivalDate: null as unknown as Date,
      departureDate: null as unknown as Date,
      numberOfTravelers: 1,
      package: selectedPackage?._id,
      message: "",
      specialRequirements: "",
      termsAccepted: false,
      totalPeople: 1,
      children: 0,
      totalAmount: 0,
      fixedDateId: "",
      selectedAddons: [], // Add default for addons
    }
  });

  const { fields } = useFieldArray({ control, name: "personalInfo" });

  // Watch form values for real-time updates
  const personalInfo = useWatch({ control, name: "personalInfo" });
  const arrivalDate = useWatch({ control, name: "arrivalDate" });
  const departureDate = useWatch({ control, name: "departureDate" });
  const fixedDateId = useWatch({ control, name: "fixedDateId" });
  const selectedAddons = useWatch({ control, name: "selectedAddons" });
  const numberOfTravelers = useWatch({ control, name: "numberOfTravelers" });

  // Function to calculate pax discount based on number of travelers
  const calculatePaxDiscount = (totalTravelers: number, paxData: any[]) => {
    if (!paxData || paxData.length === 0) return 0;

    // Find the applicable pax discount based on number of travelers
    const applicablePax = paxData.find(pax =>
      totalTravelers >= pax.min && totalTravelers <= pax.max
    );

    return applicablePax ? applicablePax.discount : 0;
  };

  // Fetch package data
  const { data: packageData } = useQuery({
    queryKey: ["packageById", params.id],
    queryFn: () => getPackagesById(params?.id as string),
    enabled: !!params.id,
  });

  // Handle package data when fetched
  useEffect(() => {
    if (packageData?.data?.fixedDates?.length) {
      const firstDate = packageData.data.fixedDates[0];
      const price = firstDate?.pricePerPerson || 0;
      const dateId = firstDate?.id || "";

      setPricePerPerson(price);
      setValue("fixedDateId", dateId);

      // Set dates from fixedDate selection
      if (firstDate) {
        setValue("arrivalDate", new Date(firstDate.startDate));
        setValue("departureDate", new Date(firstDate.endDate));
      }
    }
  }, [packageData, setValue]);

  // Update price when selected date changes
  useEffect(() => {
    if (packageData?.data?.fixedDates && fixedDateId) {
      const selectedDate = packageData.data.fixedDates.find(
        (date: any) => date._id === fixedDateId
      );
      if (selectedDate) {
        setPricePerPerson(selectedDate.pricePerPerson);

        // Update dates when fixedDate changes
        setValue("arrivalDate", new Date(selectedDate.startDate));
        setValue("departureDate", new Date(selectedDate.endDate));
      }
    }
  }, [fixedDateId, packageData, setValue]);

  // Calculate counts and totals
  const { totalPeopleCount, childrenCount, totalAmount, originalAmount, discountPercentage, discountAmount } = useMemo(() => {
    // Use numberOfTravelers field instead of counting from personalInfo
    const totalTravelers = numberOfTravelers || 1;
    const totalPeople = totalTravelers; // For now, assume all are adults
    const children = 0; // For now, set to 0

    // Calculate base price
    const basePrice = pricePerPerson * totalTravelers;

    // Calculate add-ons total
    const addonsTotal = packageData?.data?.addons
      ?.filter((addon: any) => selectedAddons?.includes(addon._id))
      ?.reduce((sum: number, addon: any) => sum + addon.price, 0) || 0;

    // Calculate pax discount
    const paxDiscountPercentage = calculatePaxDiscount(totalTravelers, packageData?.data?.pax || []);
    const discountAmount = (basePrice * paxDiscountPercentage) / 100;
    const discountedBasePrice = basePrice - discountAmount;

    // Total amount includes discounted base price + addons
    const finalAmount = discountedBasePrice + addonsTotal;

    return {
      totalPeopleCount: totalPeople,
      childrenCount: children,
      totalAmount: finalAmount,
      originalAmount: basePrice + addonsTotal,
      discountPercentage: paxDiscountPercentage,
      discountAmount: discountAmount
    };
  }, [numberOfTravelers, pricePerPerson, selectedAddons, packageData]);  // Update form values when counts change
  useEffect(() => {
    setValue("package", selectedPackage?._id as string);
    setValue("totalPeople", numberOfTravelers || 1);
    setValue("children", childrenCount);
    setValue("totalAmount", totalAmount);
  }, [numberOfTravelers, childrenCount, totalAmount, setValue, selectedPackage]);

  const { mutate } = useMutation({
    mutationFn: bookTraveller,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      toast.success("Booking successful!");
      sessionStorage.removeItem("selectedDate");
      router.push("/booking/success");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error occurred during booking");
    },
    onSettled: () => setIsLoading(false)
  });

  const onSubmit = (data: any) => {
    // Only send addon IDs to backend
    const bookingData = {
      ...data,
      selectedAddons: data.selectedAddons || [],
      // Add discount information for backend processing
      discountInfo: {
        originalAmount: originalAmount,
        discountPercentage: discountPercentage,
        discountAmount: discountAmount,
        finalAmount: totalAmount
      }
    };
    mutate({ bookingData });
  };



  // Validation functions
  const validateBirthDate = (dob: Date, isChild: boolean) => {
    if (!dob) return "Date of birth is required";

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    // Adjust for month/day not passed
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (isChild && age >= 18) return "Child must be under 18 years";
    if (!isChild && age < 18) return "Adult must be at least 18 years";
    return true;
  };

  const validatePassportExpiry = (expiry: Date) => {
    if (!expiry) return "Passport expiry is required";
    if (!departureDate) return true;

    const expiryDate = new Date(expiry);
    const depDate = new Date(departureDate);

    if (expiryDate < depDate) return "Passport expires before departure";

    const sixMonthsAfter = new Date(depDate);
    sixMonthsAfter.setMonth(sixMonthsAfter.getMonth() + 6);

    if (expiryDate < sixMonthsAfter) {
      return "Passport must be valid for at least 6 months after departure";
    }
    return true;
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
        <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-orange-500 transition mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </button>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Book Your Expedition</h1>
          <p className="text-gray-600 mt-1">
            {packageData?.data?.name} · ${pricePerPerson}/traveler
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit, (errors) => {
          const errorMessages = getAllErrorMessages(errors);
          console.log("Form errors:", errors);
          toast.error(errorMessages[0] || "Please fill all required fields correctly");
        })}>
          <input type="hidden" {...register("package")} />
          <input type="hidden" {...register("fixedDateId")} />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Traveler Info */}
            <div className="flex-1">

              {/* Single Traveler Information Form */}
              {fields.length > 0 && (
                <div className="bg-white sm:p-6 rounded-sm sm:border border-gray-200 mb-6">
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
                      register={register}
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

                    <FormDatePicker
                      control={control}
                      name={`personalInfo.0.dateOfBirth`}
                      label="Date of Birth"
                      minDate={new Date(1900, 0, 1)}
                      maxDate={new Date()}
                      error={errors.personalInfo?.[0]?.dateOfBirth}
                      validate={(dob: Date) =>
                        validateBirthDate(dob, personalInfo[0]?.isChild as boolean)
                      }
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

                    <FormDatePicker
                      control={control}
                      name={`personalInfo.0.passportExpiry`}
                      label="Passport Expiry Date"
                      minDate={new Date()}
                      error={errors.personalInfo?.[0]?.passportExpiry}
                      validate={validatePassportExpiry}
                    />

                    <FormInput
                      min={1}
                      max={20}
                      register={register}
                      name="numberOfTravelers"
                      label="Number of Travelers"
                      placeholder="Enter number of travelers"
                      type="number"
                      error={errors.numberOfTravelers}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="size-5"><circle cx={9.001} cy={6} r={4} fill="currentColor"></circle><ellipse cx={9.001} cy={17.001} fill="currentColor" rx={7} ry={4}></ellipse><path fill="currentColor" d="M21 17c0 1.657-2.036 3-4.521 3c.732-.8 1.236-1.805 1.236-2.998c0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.7 5.7 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001"></path></svg>}
                    />
                  </div>
                </div>
              )}

              {/* <div className="flex justify-end mb-8">
                <button
                  type="button"
                  onClick={addTraveler}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-sm flex items-center gap-2 transition"
                >
                  Add Traveler
                </button>
              </div> */}

              {/* Trip Dates Section */}
              <div className="bg-white sm:p-6 rounded-sm sm:border border-gray-200 mb-6">
                <h3 className="text-orange-600 text-lg font-medium">Trip Dates</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormDatePicker
                    control={control}
                    name="arrivalDate"
                    label="Arrival Date"
                    disabled
                    error={errors.arrivalDate}
                  />

                  <FormDatePicker
                    control={control}
                    name="departureDate"
                    label="Departure Date"
                    disabled
                    error={errors.departureDate}
                  />

                  <div className="mb-4 relative">
                    <label className="block text-gray-700 mb-1">Select Package Date *</label>
                    <Select
                      triggerLabel="Select a date"
                      className="border border-gray-300 rounded-sm w-full h p-2"
                      closeOnSelect={true}
                      listClassName="cursor-pointer hover:bg-orange-500 hover:text-white bg-orange-100 p-2 m-0 mt-2 rounded-sm -translate-x-2 w-full"
                      selectedOptions={packageData?.data?.fixedDates?.filter((date: any) => date._id === fixedDateId).map((date: any) => ({
                        label: `${new Date(date.startDate).toLocaleDateString()} - ${new Date(date.endDate).toLocaleDateString()} ($${date.pricePerPerson})`,
                        value: date._id
                      })) || []}
                      onSelect={(selectedOptions: SelectOption[]) => {
                        const selectedValue = selectedOptions[0]?.value || '';
                        setValue("fixedDateId", selectedValue as string);
                      }}
                      options={packageData?.data?.fixedDates?.map((dateOption: any) => {
                        const startDate = new Date(dateOption.startDate).toLocaleDateString();
                        const endDate = new Date(dateOption.endDate).toLocaleDateString();
                        return {
                          label: `${startDate} - ${endDate} ($${dateOption.pricePerPerson})`,
                          value: dateOption._id
                        };
                      }) || []}
                    />
                    {errors.fixedDateId && (
                      <p className="text-red-500 text-sm mt-1">{errors.fixedDateId.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Add-ons Section */}
              {packageData?.data?.addons && packageData.data.addons.length > 0 && (
                <div className="sm:border border-gray-200 sm:p-6 rounded-sm mb-6">
                  <h3 className="text-orange-600 text-lg font-medium">Choose Add-ons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packageData.data.addons.map((addon: any) => (
                      <div key={addon._id} className="flex flex-wrap items-center  bg-white md:gap-4 border border-gray-200 rounded-sm hover:border-orange-300 transition-colors">
                        <input
                          type="checkbox"
                          id={`addon-${addon._id}`}
                          {...register("selectedAddons")}
                          value={addon._id}
                          className="mt-2 hidden accent-orange-500"
                        />
                        <label
                          style={{
                            backgroundColor: watch("selectedAddons")?.includes(addon._id) ? '#F54A00' : 'transparent',
                            color: watch("selectedAddons")?.includes(addon._id) ? 'white' : ''
                          }}
                          htmlFor={`addon-${addon._id}`} className=" flex gap-4 items-center  cursor-pointer p-4 w-full">
                          <div className="">
                            {/* {addon.image && (
                              <div className=" relative shrink-0 size-14 lg:size-20 ">
                                <Image
                                  src={addon.image}
                                  alt={addon.name}
                                  fill
                                  className="object-cover object-center rounded-"
                                />
                              </div>
                            )} */}
                          </div>
                          <div className="flex justify-between w-full items-center">
                            <div className="">
                              <span className="font-medium   lg:text-lg">{addon.name}</span>
                              <div className=" text-sm " dangerouslySetInnerHTML={{ __html: addon.description }}></div>
                            </div>
                            <h2>
                              <span
                                style={{
                                  color: watch("selectedAddons")?.includes(addon._id) ? 'white' : ''
                                }}
                                className="text-green-600 font-bold">+${addon.price}</span>
                            </h2>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              <div className="bg-white sm:p-6 rounded-sm sm:border border-gray-200 mb-6">
                <h3 className="text-orange-600 text-lg font-medium">Additional Notes</h3>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Special Requests</label>
                  <textarea
                    {...register("specialRequirements")}
                    placeholder="Dietary needs, accessibility requirements, etc."
                    className="w-full p-3 border border-gray-300 rounded-sm min-h-[120px]"
                  />
                </div>

                {/* <div>
                  <label className="block text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    {...register("message")}
                    placeholder="Additional information or questions..."
                    className="w-full p-3 border border-gray-300 rounded-sm min-h-[120px]"
                  />
                </div> */}
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white sm:p-6 rounded-sm sm:border border-gray-200 mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    {...register("termsAccepted")}
                    className="mt-1 w-5 h-5 accent-orange-600"
                  />
                  <label htmlFor="termsAccepted" className="ml-2 text-gray-700">
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
            <div className="lg:w-96">
              <div className="sticky top-6 bg-white lg:p-6   rounded-sm lg:border border-gray-200 ">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package:</span>
                    <span className="font-medium">{packageData?.data?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Travelers:</span>
                    <span className="font-medium">{numberOfTravelers || 1}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per traveler:</span>
                    <span className="font-medium">${pricePerPerson}</span>
                  </div>

                  {/* Show discount information if applicable */}
                  {discountPercentage > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium line-through text-gray-500">${originalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Group Discount ({discountPercentage}%):</span>
                        <span className="font-medium text-green-600">-${discountAmount.toFixed(2)}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Arrival Date:</span>
                    <span className="font-medium">{watch("arrivalDate")?.toLocaleDateString()}</span>
                  </div>

                  {/* Selected Add-ons */}
                  {selectedAddons && selectedAddons.length > 0 && (
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <h4 className="font-medium text-gray-800 mb-2">Add-ons:</h4>
                      {packageData?.data?.addons
                        ?.filter((addon: any) => selectedAddons.includes(addon._id))
                        ?.map((addon: any) => (
                          <div key={addon._id} className="flex justify-between text-sm mb-1">
                            <span>{addon.name}</span>
                            <span>+${addon.price}</span>
                          </div>
                        ))}
                    </div>
                  )}

                  <div className={`flex justify-between text-lg font-bold pt-3 border-t border-gray-200 ${discountPercentage > 0 ? 'text-green-600' : ''}`}>
                    <span>Total:</span>
                    <span className={discountPercentage > 0 ? 'text-green-600' : 'text-orange-600'}>
                      ${totalAmount.toFixed(2)}
                      {discountPercentage > 0 && (
                        <span className="text-sm font-normal ml-1">(Discounted)</span>
                      )}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-sm font-medium transition flex items-center justify-center ${isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                    }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Processing...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form >
      </div >
    </>
  );
}