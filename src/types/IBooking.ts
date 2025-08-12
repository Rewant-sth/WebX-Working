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
    arrivalDate: string,
    departureDate: string,
    numberOfTravelers: 1,
    package: string, // Replace with a valid package ID
    message: string,
    specialRequirements: string,
    termsAccepted: true
    createdBy?: string // Optional: User ID if user is logged in
}