// app/layout.tsx

import LayoutWrapper from "@/components/LayoutWrapper";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";
import Providers from "./react-query-provider";
import { Toaster } from "react-hot-toast";
import TrackVisitors from "@/components/trackVisitors/TrackVisitors";
import { SelectedTripProvider } from "@/contexts/SelectedDateContext";


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
      <body className={""} suppressHydrationWarning>
        <TrackVisitors />
        <Providers>

          <LenisProvider />

          <LayoutWrapper>
            <SelectedTripProvider>{children}</SelectedTripProvider>
          </LayoutWrapper>

          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
