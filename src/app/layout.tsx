// app/layout.tsx

import LayoutWrapper from "@/components/LayoutWrapper";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";
import Providers from "./react-query-provider";
import { Toaster } from "react-hot-toast";
import TrackVisitors from "@/components/trackVisitors/TrackVisitors";
import { SelectedTripProvider } from "@/contexts/SelectedDateContext";
import Navbar from "@/components/common/navbar/Navbar";
import { Dancing_Script } from "next/font/google";

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
        <Navbar />
        <TrackVisitors />
        <Providers>
          <LenisProvider />
          <SelectedTripProvider>{children}</SelectedTripProvider>
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
