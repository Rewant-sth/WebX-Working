"use client";
import { usePathname } from "next/navigation";
import Navbar from "./common/navbar/Navbar";
import React, { useEffect } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [notificationCount, setNotificationCount] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = notificationCount ? "1 New Message" : "Real Himalaya | Your real expedition partner";
  }, [notificationCount]);

  // Hide navbar on pages that start with /booking
  const shouldHideNavbar = pathname.startsWith("/booking") || pathname.startsWith("/customize-trip") || pathname.startsWith("/terms-and-conditions");

  return (
    <>

      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}
