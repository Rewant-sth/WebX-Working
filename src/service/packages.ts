import { IPackageByIdResponse, ITravelPackageResponse } from "@/types/IPackages";
import api from "./api";

export async function getPackages(page: number): Promise<ITravelPackageResponse> {
    const res = await api.get(`/package?page=${page}`);
    return res.data
}

export async function getPackagesById(id: string): Promise<IPackageByIdResponse> {
    const res = await api.get(`/package/${id}`)
    return res.data

}

export async function getSubpackagesBySlug(slug: string): Promise<ITravelPackageResponse> {
    const res = await api.get(`/package/subcategory/${slug}`)
    return res.data
}