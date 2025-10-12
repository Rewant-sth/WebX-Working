
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
import FooterWrapper from "@/components/FooterWrapper";
import WhatsappBtn from "@/components/awesome-btn";
import Footer from "@/components/common/footer/new-footer";

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


        <WhatsappBtn />

      </body>
    </html >
  );
}
