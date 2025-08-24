export interface Testimonial {
    _id: string;
    fullName: string;
    image?: string; // optional
    isActive: boolean;
    rating: number;
    sortOrder: number;
    comment: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}

export interface Pagination {
    total: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    previousPage: number | null;
}

export interface TestimonialsResponse {
    status: string;
    data: Testimonial[];
    pagination: Pagination;
    message: string;
}
