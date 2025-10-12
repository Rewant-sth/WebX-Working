import api from "./api"

export async function fetchCaptchaToken(): Promise<{
    status: string;
    data: { token: string; question: string };
}> {
    const response = await api.get("/captcha")
    return response.data
}