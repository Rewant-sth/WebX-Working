"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Navbar from "./common/navbar/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  // Hide navbar on pages that start with /booking
  const shouldHideNavbar = pathname.startsWith("/booking") || pathname.startsWith("/customize-trip") || pathname.startsWith("/terms-and-conditions");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {!shouldHideNavbar && <Navbar />}

        {children}
      </QueryClientProvider>
    </>
  );
}
