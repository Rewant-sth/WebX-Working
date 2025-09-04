
// app/layout.tsx
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";
import Providers from "./react-query-provider";
import { Toaster } from "react-hot-toast";
import TrackVisitors from "@/components/trackVisitors/TrackVisitors";
import { SelectedTripProvider } from "@/contexts/SelectedDateContext";
import { Dancing_Script } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Suspense } from "react";
import Footer from "@/components/common/footer/new-footer";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-dancing-script",
  display: "swap"
});


// ✅ Correctly export metadata
export const metadata = {
  title: "Real Himalaya | Your real expedition partner",
  description: "Real Himalaya - Travel Agency Website",
  keywords: "travel, agency, booking, tours, vacations, holidays",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dancingScript.variable}`} suppressHydrationWarning>
        <TrackVisitors />
        <Providers>
          <LayoutWrapper>
            <Suspense fallback={<div></div>}><LenisProvider /></Suspense>
            <SelectedTripProvider>{children}</SelectedTripProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Footer />
          </LayoutWrapper>
        </Providers>


        <div className="fixed bottom-5 md:bottom-10  cursor-pointer right-4 md:right-10 flex flex-col justify-center items-center z-[99999]">
          <Link href={"https://wa.me/1234567890"} target="_blank" rel="noopener noreferrer" className="flex justify-center mx-auto p-2 items-center size-10 lg:size-16 bg-green-500  rounded-full">
            <Icon icon="logos:whatsapp-icon" className="text-white text-3xl animate-pulse" />
          </Link>
          <h2 className="text-black font-bold text-sm sm:text-base">Live Chat</h2>
        </div>

      </body>
    </html >
  );
}
