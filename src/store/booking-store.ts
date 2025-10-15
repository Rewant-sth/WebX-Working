// travelPackageStore.ts
import { ITravelPackage } from '@/types/IPackages';
import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';

// Import your interfaces (make sure paths are correct)

interface PackageStoreState {
    package: ITravelPackage | null;
    selectedFixedDateId: string | null;
    arrivalDate: Date | null;
    departureDate: Date | null;
    isBookingModalOpen: boolean;
    redirectToItinerary: boolean; // Flag to indicate if we should redirect
    setPackage: (pkg: ITravelPackage) => void;
    setSelectedFixedDateId: (dateId: string | null) => void;
    setArrivalDate: (date: Date | null) => void;
    setDepartureDate: (date: Date | null) => void;
    setIsBookingModalOpen: (isOpen: boolean) => void;
    setRedirectToItinerary: (redirect: boolean) => void;
    openBookingModal: (pkg: ITravelPackage, dateId?: string | null, arrivalDate?: Date | null, departureDate?: Date | null) => void;
    clearBookingData: () => void;
}

// Create a custom storage object to handle localStorage operations
const storage: PersistStorage<PackageStoreState> = {
    getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        const parsed = JSON.parse(str) as StorageValue<PackageStoreState>;

        // Convert date strings back to Date objects without timezone issues
        if (parsed.state) {
            if (parsed.state.arrivalDate && typeof parsed.state.arrivalDate === 'string') {
                const dateStr = parsed.state.arrivalDate;
                // Parse as local date to avoid timezone shift
                const date = new Date(dateStr);
                // Create a new date using local timezone components to avoid UTC conversion
                parsed.state.arrivalDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }
            if (parsed.state.departureDate && typeof parsed.state.departureDate === 'string') {
                const dateStr = parsed.state.departureDate;
                // Parse as local date to avoid timezone shift
                const date = new Date(dateStr);
                // Create a new date using local timezone components to avoid UTC conversion
                parsed.state.departureDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }
        }

        return parsed;
    },
    setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name) => localStorage.removeItem(name),
};

export const useBookingStore = create<PackageStoreState>()(
    persist(
        (set) => ({
            package: null,
            selectedFixedDateId: null,
            arrivalDate: null,
            departureDate: null,
            isBookingModalOpen: false,
            redirectToItinerary: false,
            setPackage: (pkg) => set({ package: pkg }),
            setSelectedFixedDateId: (dateId) => set({ selectedFixedDateId: dateId }),
            setArrivalDate: (date) => set({ arrivalDate: date }),
            setDepartureDate: (date) => set({ departureDate: date }),
            setIsBookingModalOpen: (isOpen) => set({ isBookingModalOpen: isOpen }),
            setRedirectToItinerary: (redirect) => set({ redirectToItinerary: redirect }),
            // Combined action to open booking modal with package data
            openBookingModal: (pkg, dateId = null, arrivalDate = null, departureDate = null) => set({
                package: pkg,
                selectedFixedDateId: dateId,
                arrivalDate,
                departureDate,
                isBookingModalOpen: true,
                redirectToItinerary: false
            }),
            // Clear all booking data (use on close or success)
            clearBookingData: () => set({
                package: null,
                selectedFixedDateId: null,
                arrivalDate: null,
                departureDate: null,
                isBookingModalOpen: false,
                redirectToItinerary: false
            }),
        }),
        {
            name: 'travel-package-storage',
            storage,
        }
    )
);

// Utility functions for direct access
export const getPackage = (): ITravelPackage | null => {
    return useBookingStore.getState().package;
};

export const getSelectedFixedDateId = (): string | null => {
    return useBookingStore.getState().selectedFixedDateId;
};

export const getArrivalDate = (): Date | null => {
    return useBookingStore.getState().arrivalDate;
};

export const getDepartureDate = (): Date | null => {
    return useBookingStore.getState().departureDate;
};

export const setPackage = (pkg: ITravelPackage): void => {
    useBookingStore.getState().setPackage(pkg);
};

export const setSelectedFixedDateId = (dateId: string | null): void => {
    useBookingStore.getState().setSelectedFixedDateId(dateId);
};

export const setArrivalDate = (date: Date | null): void => {
    useBookingStore.getState().setArrivalDate(date);
};

export const setDepartureDate = (date: Date | null): void => {
    useBookingStore.getState().setDepartureDate(date);
};

export const openBookingModal = (pkg: ITravelPackage, dateId?: string | null, arrivalDate?: Date | null, departureDate?: Date | null): void => {
    useBookingStore.getState().openBookingModal(pkg, dateId, arrivalDate, departureDate);
};

export const clearBookingData = (): void => {
    useBookingStore.getState().clearBookingData();
};