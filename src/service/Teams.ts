import { TeamMemberResponse } from "@/types/ITeams";
import api from "./api";

export async function getTeams():Promise<TeamMemberResponse>{
    const res = await api.get("/teamMember");
    return res.data
}