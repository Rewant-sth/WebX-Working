import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/booking-store';
import { ITravelPackage } from '@/types/IPackages';

/**
 * Custom hook to handle booking modal and navigation
 * This provides a unified way to open booking modal from anywhere in the app
 */
export const useBooking = () => {
    const router = useRouter();
    const { openBookingModal, clearBookingData, isBookingModalOpen } = useBookingStore();

    /**
     * Opens booking modal and navigates to itinerary page if not already there
     * @param packageData - The package to book
     * @param dateId - Optional selected fixed date ID
     * @param navigateToItinerary - Whether to navigate to itinerary page (default: true)
     */
    const bookPackage = (
        packageData: ITravelPackage,
        dateId?: string | null,
        navigateToItinerary: boolean = true
    ) => {
        // Open booking modal with package data
        openBookingModal(packageData, dateId || packageData.fixedDates?.[0]?._id || null);

        // Navigate to itinerary page if requested
        if (navigateToItinerary && packageData.slug) {
            router.push(`/itinerary/${packageData.slug}`);
        }
    };

    /**
     * Closes booking modal and clears all booking data
     */
    const closeBooking = () => {
        clearBookingData();
    };

    return {
        bookPackage,
        closeBooking,
        isBookingModalOpen,
    };
};
