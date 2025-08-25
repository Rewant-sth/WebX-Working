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

/**
 * Get expedition packages directly from the API endpoint
 * Fetches from package/category/expedition with no parameters
 */
export async function getExpeditionPackagesDirect(): Promise<ITravelPackageResponse> {
    const res = await api.get(`/package/category/expedition`);
    return res.data;
}

/**
 * Get expedition packages with pagination and sorting options
 * Uses the internal API route with ISR for better performance
 */
export async function getExpeditionPackages(params?: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}): Promise<ITravelPackageResponse> {
    return getPackagesByCategory('expedition', params);
}

/**
 * Get packages by category with pagination and sorting options
 * Uses the internal API route with ISR for better performance
 */
export async function getPackagesByCategory(
    categorySlug: string,
    params?: {
        page?: number;
        limit?: number;
        sort?: string;
        order?: 'asc' | 'desc';
    }
): Promise<ITravelPackageResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);

    const queryString = queryParams.toString();
    const url = `/api/package/category/${categorySlug}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${categorySlug} packages: ${response.statusText}`);
    }

    return response.json();
}