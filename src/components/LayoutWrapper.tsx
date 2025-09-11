"use client";
import { usePathname } from "next/navigation";
import Navbar from "./common/navbar/Navbar";
import React, { useEffect } from "react";
import Preloader from "./Preloader";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [notificationCount, setNotificationCount] = React.useState(false);
  const [preloaderVisible, setPreloaderVisible] = React.useState(true);
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle client-side hydration and preloader logic
  useEffect(() => {
    setIsClient(true);

    // Check if preloader has already been shown in this session
    const preloaderShown = sessionStorage.getItem("preloader-shown");

    if (preloaderShown === "true") {
      // Preloader already shown in this session, hide it immediately
      setPreloaderVisible(false);
    } else {
      // Show preloader for 10 seconds, then hide it and mark as shown
      const timer = setTimeout(() => {
        sessionStorage.setItem("preloader-shown", "true");
        setPreloaderVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.title = notificationCount ? "1 New Message" : "Real Himalaya | Your real expedition partner";
  }, [notificationCount]);

  // Hide navbar on pages that start with /booking
  const shouldHideNavbar = pathname.startsWith("/booking") || pathname.startsWith("/customize-trip") || pathname.startsWith("/terms-and-conditions") || pathname.startsWith("/test");

  return (
    <>
      {preloaderVisible ? (
        <Preloader />
      ) : (
        <>

        </>
      )
      }

      {!shouldHideNavbar && <Navbar />}
      {children}

    </>
  );
}
