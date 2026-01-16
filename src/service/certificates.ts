import api from "./api";
import { CertificatesResponse } from "@/app/certificate/page";

export async function getCertificates(): Promise<CertificatesResponse> {
    const req = await api.get("/certificate");
    return req.data
}

