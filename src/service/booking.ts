import { IBookingData } from "@/types/IBooking";
import api from "./api";


export async function bookTraveller({ bookingData }: { bookingData: IBookingData }): Promise<{}> {
    const req = await api.post(`/booking`,
        bookingData
    )
    return req.data
}