// travelPackageStore.ts
import { ITravelPackage } from '@/types/IPackages';
import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';

// Import your interfaces (make sure paths are correct)

interface PackageStoreState {
    package: ITravelPackage | null;
    selectedFixedDateId: string | null;
    isBookingModalOpen: boolean;
    setPackage: (pkg: ITravelPackage) => void;
    setSelectedFixedDateId: (dateId: string) => void;
    setIsBookingModalOpen: (isOpen: boolean) => void;
    removePackage: () => void;
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
            setPackage: (pkg) => set({ package: pkg }),
            setSelectedFixedDateId: (dateId) => set({ selectedFixedDateId: dateId }),
            setIsBookingModalOpen: (isOpen) => set({ isBookingModalOpen: isOpen }),
            removePackage: () => set({ package: null, selectedFixedDateId: null }),
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

export const setSelectedFixedDateId = (dateId: string): void => {
    useBookingStore.getState().setSelectedFixedDateId(dateId);
};

export const removePackage = (): void => {
    useBookingStore.getState().removePackage();
};