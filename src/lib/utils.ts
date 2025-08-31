import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges Tailwind class names intelligently.
 * Usage: cn("bg-red-500", isActive && "text-white")
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Fetch data with ISR (Incremental Static Regeneration)
 * @param url - The URL to fetch from
 * @param revalidateSeconds - Revalidation time in seconds (default: 1800 = 30 minutes)
 * @returns Promise with the response
 */
export async function fetchWithISR<T>(
    url: string,
    revalidateSeconds: number = 1800
): Promise<T> {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            revalidate: revalidateSeconds
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Build query parameters from an object
 * @param params - Object with query parameters
 * @returns URLSearchParams string
 */
export function buildQueryParams(params: Record<string, string | number | undefined>): string {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });

    return queryParams.toString();
}
