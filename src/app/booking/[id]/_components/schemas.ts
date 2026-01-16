import z from "zod";

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
    fixedDateId: z.string().min(1, "Fixed date not selected properly"),
    addons: z.array(z.string()).default([]),
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
    path: ["departureDate"],
});
