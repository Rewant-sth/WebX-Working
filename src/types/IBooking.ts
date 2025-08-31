export interface IBookingData {
    personalInfo: [{
        fullName: string,
        email: string,
        country: string,
        phoneNumber: string,
        gender: string,
        dateOfBirth: string,
        passportNumber: string,
        passportExpiryDate: string
    }],
    adults: number,
    totalAmount: number,
    fixedDateId: string,
    arrivalDate: string,
    departureDate: string,
    numberOfTravelers: number,
    package: string, // Replace with a valid package ID
    message: string,
    specialRequirements: string,
    termsAccepted: boolean
    createdBy?: string // Optional: User ID if user is logged in
}