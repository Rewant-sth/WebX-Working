import api from "./api";

export async function postTestimonial(data: { packageId: string, fullName: string, rating: number, comment: string, image: File | string | null }) {
    const res = await api.post("/testimonial", data)
    return res.data
}