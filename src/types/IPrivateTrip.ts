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
}

export interface IPrivateTripResponse {
    success: boolean;
    message: string;
    data?: any;
}
