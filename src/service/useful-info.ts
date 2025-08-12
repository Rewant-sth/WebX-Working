import { IUsefulInfo } from "@/types/IUsefulInfo";
import api from "./api";

export async function getUsefulInfo():Promise<IUsefulInfo[]>{
    const res = await api.get("/useful-info");
    return res.data
}