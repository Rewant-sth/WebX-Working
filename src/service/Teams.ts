import { TeamMemberResponse, TeamMemberResponseByID } from "@/types/ITeams";
import api from "./api";

export async function getTeams(): Promise<TeamMemberResponse> {
    const res = await api.get("/teamMember");
    return res.data;
}

export async function getTeamMember(id: string): Promise<TeamMemberResponseByID> {
    const res = await api.get(`/teamMember/${id}`);
    return res.data;
}