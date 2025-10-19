import z from "zod";
import Select from "react-select";
import { Controller } from "react-hook-form";

// Zod schemas
export const travelerSchema = z.object({
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


export const formSchema = z.object({
    personalInfo: z.array(travelerSchema),
    arrivalDate: z.string().min(1, "Arrival date required").refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
        return selectedDate >= today;
    }, "Arrival date cannot be in the past"),
    departureDate: z.string().min(1, "Departure date required"),
    numberOfTravelers: z.number().min(1, "At least 1 traveler required"),
    package: z.string().min(1, "Package is required"),
    message: z.string().optional(),
    specialRequirements: z.string().optional(),
    termsAccepted: z.boolean().refine((val) => val, "You must accept the terms"),
    totalAmount: z.number().min(1, "Total price required"),
    totalPeople: z.number().min(1, "At least one adult required"),
    // children: z.number().min(0, "Children count cannot be negative"),
    fixedDateId: z.string().min(1, "Fixed date not selected properly"),
    addons: z.array(z.string()).default([]), // Add addons field
    createdBy: z.string().min(1, "Created by is required"),
    customizedBooking: z.boolean().default(false),

}).refine((data) => {
    // Validate that departure date is after arrival date
    if (data.arrivalDate && data.departureDate) {
        const arrival = new Date(data.arrivalDate);
        const departure = new Date(data.departureDate);
        return departure > arrival;
    }
    return true;
}, {
    message: "Departure date must be after arrival date",
    path: ["departureDate"], // This will show the error on the departureDate field
});


// Reusable form components
export const FormInput = ({
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
}: any) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only accept input if it's from a trusted user event

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-zinc-700 mb-1">
                {label} {required && "*"}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
                    {icon}
                </div>
                <input
                    {...register(name, {
                        ...(type === "number" && {
                            valueAsNumber: true,
                        }),
                        onChange: handleInputChange
                    })}
                    min={min}
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    data-form-type="other"
                    className="w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-sm"
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export interface FormDateInputProps {
    register: any;
    name: string;
    label: string;
    error?: any;
    min?: string;
    max?: string;
    required?: boolean;
    disabled?: boolean;
    asDateObject?: boolean; // New prop to control if value should be a Date object
}

export const FormDateInput = ({
    register,
    name,
    label,
    error,
    min,
    max,
    required = true,
    disabled = false,
    asDateObject = false, // Default to false (keep as string)
}: FormDateInputProps) => {
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only accept input if it's from a trusted user event

    };

    return (
        <div className="mb-4 w-full">
            <label className="block text-zinc-700 mb-1">
                {label} {required && "*"}
            </label>
            <div className="relative w-full">
                <input
                    type="date"
                    {...register(name, asDateObject ? {
                        setValueAs: (value: string) => value ? new Date(value) : null,
                        onChange: handleDateChange
                    } : {
                        onChange: handleDateChange
                    })}
                    min={min}
                    max={max}
                    disabled={disabled}
                    autoComplete="off"
                    data-form-type="other"
                    className={`w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-sm ${disabled ? 'bg-zinc-100 cursor-not-allowed' : ''}`}
                />

            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export interface FormSelectProps {
    control: any;
    name: string;
    label: string;
    error?: any;
    icon?: React.ReactNode;
    options: Array<{ value: string; label: string }>;
    required?: boolean;
    placeholder?: string;
    isMulti?: boolean;
}

export const FormSelect = ({
    control,
    name,
    label,
    error,
    icon,
    options,
    required = true,
    placeholder,
    isMulti = false
}: FormSelectProps) => {
    return (
        <div className="mb-4">
            <label className="block text-zinc-700 mb-1">
                {label} {required && "*"}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400 z-10">
                        {icon}
                    </div>
                )}
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={options}
                            isMulti={isMulti}
                            placeholder={placeholder || `Select ${label}`}
                            value={isMulti
                                ? options.filter(option => field.value?.includes(option.value))
                                : options.find(option => option.value === field.value) || null
                            }
                            onChange={(selected) => {
                                if (isMulti) {
                                    field.onChange((selected as any)?.map((item: any) => item.value) || []);
                                } else {
                                    field.onChange((selected as any)?.value || '');
                                }
                            }}
                            className={`${icon ? 'react-select-with-icon' : ''}`}
                            classNamePrefix="react-select"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    paddingLeft: icon ? '2rem' : '0.5rem',
                                    minHeight: '42px',
                                    borderColor: '#d4d4d8',
                                    borderRadius: '0.125rem',
                                    '&:hover': {
                                        borderColor: '#a1a1aa'
                                    }
                                }),
                                valueContainer: (base) => ({
                                    ...base,
                                    paddingLeft: icon ? '0.25rem' : '0.5rem',
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: '#a1a1aa'
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 50
                                })
                            }}
                        />
                    )}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};