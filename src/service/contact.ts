import api from "./api";

export async function sendContact(data: {
    name: string,
    email: string,
    message: string,
    number: number | string,
    goal: string,
    company: string,
    budget: number | string

}) {
    const res = await api.post("/contact", data);
    return res.data
}