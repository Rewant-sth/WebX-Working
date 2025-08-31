import { NextRequest, NextResponse } from 'next/server';
import { ITravelPackageResponse } from '@/types/IPackages';
import { fetchWithISR, buildQueryParams } from '@/lib/utils';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ categorySlug: string }> }
) {
    try {
        // Validate backend URL
        if (!BACKEND_API_URL) {
            throw new Error('Backend API URL is not configured');
        }

        const { categorySlug } = await params;

        // Validate category slug
        if (!categorySlug) {
            return NextResponse.json(
                {
                    status: 'error',
                    message: 'Category slug is required'
                },
                { status: 400 }
            );
        }

        // Get search parameters from URL
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '10';
        const sort = searchParams.get('sort') || 'createdAt';
        const order = searchParams.get('order') || 'desc';

        // Build query parameters for the backend API
        const queryString = buildQueryParams({
            page,
            limit,
            sort,
            order
        });

        // Construct the full URL
        const apiUrl = `${BACKEND_API_URL}/package/category/${categorySlug}${queryString ? `?${queryString}` : ''}`;

        // Fetch data with ISR (30 minutes revalidation)
        const data = await fetchWithISR<ITravelPackageResponse>(apiUrl, 1800);

        // Return the response with proper headers
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
                'Vary': 'Accept-Encoding',
                'X-Category': categorySlug,
            },
        });

    } catch (error) {
        const { categorySlug } = await params;
        console.error(`Error fetching ${categorySlug} packages:`, error);

        return NextResponse.json(
            {
                status: 'error',
                message: `Failed to fetch ${categorySlug} packages`,
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            {
                status: 500,
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                },
            }
        );
    }
}

// Export other HTTP methods if needed
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ categorySlug: string }> }
) {
    return NextResponse.json(
        {
            status: 'error',
            message: 'Method not allowed'
        },
        { status: 405 }
    );
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ categorySlug: string }> }
) {
    return NextResponse.json(
        {
            status: 'error',
            message: 'Method not allowed'
        },
        { status: 405 }
    );
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ categorySlug: string }> }
) {
    return NextResponse.json(
        {
            status: 'error',
            message: 'Method not allowed'
        },
        { status: 405 }
    );
}
