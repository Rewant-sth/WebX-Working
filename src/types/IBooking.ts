export interface IBookingData {
    personalInfo: Array<{
        fullName: string,
        email: string,
        country: string,
        phoneNumber: string,
        gender: string,
        dateOfBirth: string,
        passportNumber: string,
        passportExpiryDate: string,
        isChild?: boolean
    }>,
    adults: number,
    totalAmount: number,
    fixedDateId: string,
    arrivalDate: string,
    departureDate: string,
    numberOfTravelers: number,
    package: string, // Replace with a valid package ID
    message: string,
    specialRequirements: string,
    termsAccepted: boolean,
    addons: string[], // Array of addon IDs
    totalPeople?: number,
    createdBy?: string, // Optional: User ID if user is logged in
    customizedBooking?: boolean // Optional: Flag for customized booking

}