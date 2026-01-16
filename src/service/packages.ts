import { IPackageByIdResponse, ITravelPackageResponse } from "@/types/IPackages";
import api from "./api";

export async function getPackages(page: number): Promise<ITravelPackageResponse> {
    const res = await api.get(`/package?page=${page}`);
    return res.data
}

export async function getPackagesById(id: string): Promise<IPackageByIdResponse> {
    try {
        const res = await api.get(`/package/${id}?populate=tripHighlight`)
        if (!res.data || !res.data.data) {
            throw new Error('Package data not found')
        }
        return res.data
    } catch (error: unknown) {
        const err = error as { response?: { status?: number }; code?: string; message?: string };
        if (err.response?.status === 404) {
            throw new Error('Package not found. It may have been removed or the link is incorrect.')
        }
        if (err.response?.status === 500) {
            throw new Error('Server error. Please try again later.')
        }
        if (err.code === 'ECONNABORTED') {
            throw new Error('Request timeout. Please check your internet connection.')
        }
        throw new Error(err.message || 'Failed to load package details')
    }
}

export async function getSubpackagesBySlug(slug: string): Promise<ITravelPackageResponse> {
    const res = await api.get(`/package/subcategory/${slug}`)
    return res.data
}
export async function getPackagesByCategories(slug: string): Promise<ITravelPackageResponse> {
    const res = await api.get(`/package/category/${slug}`)
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

/**
 * Get trip highlights by package ID
 */
export async function getTripHighlightsByPackageId(packageId: string) {
    try {
        const res = await api.get(`/packages/${packageId}/trip-highlights`);
        return res.data;
    } catch (error: unknown) {
        console.error('Failed to fetch trip highlights:', error);
        return { data: [] };
    }
}