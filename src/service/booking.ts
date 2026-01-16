import { IBookingData } from "@/types/IBooking";
import { IPrivateTripData, IPrivateTripResponse } from "@/types/IPrivateTrip";
import api from "./api";


export async function bookTraveller({ bookingData }: { bookingData: IBookingData }): Promise<Record<string, unknown>> {
    const req = await api.post(`/booking`,
        bookingData
    )
    return req.data
}

export async function bookPrivateTrip(privateTripData: IPrivateTripData): Promise<IPrivateTripResponse> {
    const req = await api.post(`/private-trip`, privateTripData);
    return req.data;
}