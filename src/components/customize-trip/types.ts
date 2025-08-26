export interface PersonalInfo {
    fullName: string;
    email: string;
    country: string;
    phoneNumber: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    passportNumber: string;
    passportExpiryDate: string;
}

export interface CustomizeTripFormData {
    personalInfo: PersonalInfo[];
    adults: number;
    totalAmount: number;
    fixedDateId: string;
    arrivalDate: string;
    departureDate: string;
    numberOfTravelers: number;
    package: string;
    groupSize: string;
    budget: string;
    customBudget: number;
    message: string;
    specialRequirements: string;
    termsAccepted: boolean;
    createdBy?: string;
}
