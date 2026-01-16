export interface IPrivateTripData {
    date: string;
    leadTravellerName: string;
    email: string;
    phone: string;
    numberOfTraveller: number;
    country: string;
    howDidYouReachUs: string;
    message: string;
    termsAndAgreement: boolean;
    captchaToken: string;
    captchaAnswer: number;
    packageId: string;
}

export interface IPrivateTripResponse {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
}
