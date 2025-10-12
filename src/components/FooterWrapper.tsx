"use client";
import { usePathname } from "next/navigation";
import Footer from "./common/footer/new-footer";
import { useBookingStore } from "@/store/booking-store";

export default function FooterWrapper() {
    const pathname = usePathname();
    const isBookingModalOpen = useBookingStore((state) => state.isBookingModalOpen);

    // Hide footer on pages that start with /booking or when booking modal is open
    const shouldHideFooter = pathname.startsWith("/booking") || pathname.startsWith("/customize-trip") || pathname.startsWith("/test") || isBookingModalOpen;

    if (shouldHideFooter) {
        return null;
    }

    return <Footer />;
}
