
// app/layout.tsx
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";
import Providers from "./react-query-provider";
import { Toaster } from "react-hot-toast";
import TrackVisitors from "@/components/trackVisitors/TrackVisitors";
import { SelectedTripProvider } from "@/contexts/SelectedDateContext";
import { Inter, Montserrat } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Suspense } from "react";
import FooterWrapper from "@/components/FooterWrapper";
import WhatsappBtn from "@/components/awesome-btn";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
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
      <body className={`${inter.variable} ${montserrat.variable} font-sans max-w-[2000px] mx-auto`} suppressHydrationWarning>
        <TrackVisitors />
        <Providers>
          <LayoutWrapper>
            <Suspense fallback={<div></div>}><LenisProvider /></Suspense>
            <SelectedTripProvider>{children}</SelectedTripProvider>
            <Toaster position="top-center" containerClassName="z-[9999999999999]" reverseOrder={false} />
            <FooterWrapper />
          </LayoutWrapper>
        </Providers>


        <WhatsappBtn />

      </body>
    </html >
  );
}
