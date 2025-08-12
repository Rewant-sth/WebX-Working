import api from "./api";

export async function postTestimonial(data: { packageId: string, fullName: string, rating: number, comment: string, image: any }) {
    const res = await api.post("/testimonial", data)
    return res.data
}