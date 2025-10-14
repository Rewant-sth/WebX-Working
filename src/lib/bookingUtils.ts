/**
 * Booking Utilities
 * Helper functions and constants for the booking system
 */

import { ITravelPackage } from '@/types/IPackages';

/**
 * Get the first available fixed date from a package
 */
export const getFirstAvailableDate = (pkg: ITravelPackage): string | null => {
    if (!pkg.fixedDates || pkg.fixedDates.length === 0) {
        return null;
    }

    const today = new Date();
    const normalizedToday = new Date(Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    ));

    const availableDate = pkg.fixedDates.find((date: any) => {
        const isOpen = date.status?.toLowerCase() === 'open';
        const startDateObj = new Date(date.startDate);
        const startDate = new Date(Date.UTC(
            startDateObj.getUTCFullYear(),
            startDateObj.getUTCMonth(),
            startDateObj.getUTCDate()
        ));
        const isFutureOrToday = startDate >= normalizedToday;
        const hasSeats = (date.availableSeats || 0) > 0;

        return isOpen && isFutureOrToday && hasSeats;
    });

    return availableDate?._id || pkg.fixedDates[0]?._id || null;
};

/**
 * Check if a package has available dates for booking
 */
export const hasAvailableDates = (pkg: ITravelPackage): boolean => {
    if (!pkg.fixedDates || pkg.fixedDates.length === 0) {
        return false;
    }

    const today = new Date();
    const normalizedToday = new Date(Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    ));

    return pkg.fixedDates.some((date: any) => {
        const isOpen = date.status?.toLowerCase() === 'open';
        const startDateObj = new Date(date.startDate);
        const startDate = new Date(Date.UTC(
            startDateObj.getUTCFullYear(),
            startDateObj.getUTCMonth(),
            startDateObj.getUTCDate()
        ));
        const isFutureOrToday = startDate >= normalizedToday;
        const hasSeats = (date.availableSeats || 0) > 0;

        return isOpen && isFutureOrToday && hasSeats;
    });
};

/**
 * Get booking button text based on package availability
 */
export const getBookingButtonText = (pkg: ITravelPackage): string => {
    if (!hasAvailableDates(pkg)) {
        return 'No Dates Available';
    }
    return 'Book Now';
};

/**
 * Check if booking button should be disabled
 */
export const isBookingDisabled = (pkg: ITravelPackage): boolean => {
    return !hasAvailableDates(pkg);
};

/**
 * Get the package price display
 */
export const getPackagePrice = (pkg: ITravelPackage): string => {
    if (!pkg.fixedDates || pkg.fixedDates.length === 0) {
        return 'Pricing Coming Soon';
    }

    const firstDate = pkg.fixedDates[0];
    if (firstDate?.pricePerPerson) {
        return `$${firstDate.pricePerPerson}`;
    }

    return 'Contact Us';
};

/**
 * Format date for display
 */
export const formatBookingDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Calculate trip duration in days
 */
export const calculateTripDuration = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end day
};

/**
 * Booking analytics event
 * Send analytics event when user initiates booking
 */
export const trackBookingInitiated = (pkg: ITravelPackage) => {
    // Add your analytics tracking here
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'begin_checkout', {
            currency: 'USD',
            value: pkg.fixedDates?.[0]?.pricePerPerson || 0,
            items: [{
                item_id: pkg._id,
                item_name: pkg.name,
                item_category: pkg.categoryId?.name,
            }]
        });
    }
};

/**
 * Booking success analytics event
 */
export const trackBookingCompleted = (pkg: ITravelPackage, totalAmount: number) => {
    // Add your analytics tracking here
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
            currency: 'USD',
            value: totalAmount,
            items: [{
                item_id: pkg._id,
                item_name: pkg.name,
                item_category: pkg.categoryId?.name,
            }]
        });
    }
};
