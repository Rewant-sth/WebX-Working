import { IPagesResponse } from "@/types/Ipages";
import api from "./api";

export async function getPages(): Promise<IPagesResponse> {
    const res = await api.get("/pages")
    return res.data
}