import { IBlog } from "@/types/IBlogs";
import api from "./api";

export async function getBlogs():Promise<{
    status: string,
    msg: string,
    data: IBlog[]
}> {
    const res = await api.get("/blog");
    return res.data;
}

export async function getBlogsById(id: string):Promise<{
    msg:string;
    data:IBlog,
    status:string
}> {
    const res = await api.get(`/blog/${id}`);
    return res.data
}