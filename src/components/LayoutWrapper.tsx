"use client";
import { usePathname } from "next/navigation";
import Navbar from "./common/navbar/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide navbar on pages that start with /booking
  const shouldHideNavbar = pathname.startsWith("/booking") || pathname.startsWith("/customize-trip") || pathname.startsWith("/terms-and-conditions");

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}
