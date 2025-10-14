// travelPackageStore.ts
import { ITravelPackage } from '@/types/IPackages';
import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';

// Import your interfaces (make sure paths are correct)

interface PackageStoreState {
    package: ITravelPackage | null;
    selectedFixedDateId: string | null;
    isBookingModalOpen: boolean;
    redirectToItinerary: boolean; // Flag to indicate if we should redirect
    setPackage: (pkg: ITravelPackage) => void;
    setSelectedFixedDateId: (dateId: string | null) => void;
    setIsBookingModalOpen: (isOpen: boolean) => void;
    setRedirectToItinerary: (redirect: boolean) => void;
    openBookingModal: (pkg: ITravelPackage, dateId?: string | null) => void;
    clearBookingData: () => void;
}

// Create a custom storage object to handle localStorage operations
const storage: PersistStorage<PackageStoreState> = {
    getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        return JSON.parse(str) as StorageValue<PackageStoreState>;
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
            isBookingModalOpen: false,
            redirectToItinerary: false,
            setPackage: (pkg) => set({ package: pkg }),
            setSelectedFixedDateId: (dateId) => set({ selectedFixedDateId: dateId }),
            setIsBookingModalOpen: (isOpen) => set({ isBookingModalOpen: isOpen }),
            setRedirectToItinerary: (redirect) => set({ redirectToItinerary: redirect }),
            // Combined action to open booking modal with package data
            openBookingModal: (pkg, dateId = null) => set({
                package: pkg,
                selectedFixedDateId: dateId,
                isBookingModalOpen: true,
                redirectToItinerary: false
            }),
            // Clear all booking data (use on close or success)
            clearBookingData: () => set({
                package: null,
                selectedFixedDateId: null,
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

export const setPackage = (pkg: ITravelPackage): void => {
    useBookingStore.getState().setPackage(pkg);
};

export const setSelectedFixedDateId = (dateId: string | null): void => {
    useBookingStore.getState().setSelectedFixedDateId(dateId);
};

export const openBookingModal = (pkg: ITravelPackage, dateId?: string | null): void => {
    useBookingStore.getState().openBookingModal(pkg, dateId);
};

export const clearBookingData = (): void => {
    useBookingStore.getState().clearBookingData();
};