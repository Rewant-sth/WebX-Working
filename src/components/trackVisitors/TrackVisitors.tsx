"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import socket from "../lib/socket";

const VisitTracker = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const pathname = usePathname();
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    // Socket connection handlers
    socket.on("connect", () => {
      // Emit initial page view on connect
      if (pathname) {
        socket.emit("page_view", pathname);
      }
    });

    socket.on("connect_error", (err) => {
      console.log("Connection error:", err.message);
    });

    socket.on("activeUsers", (count: number) => {
      setActiveUsers(count);
    });

    // Track page view when pathname changes
    if (socket.connected) {
      socket.emit("page_view", pathname);
    }

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("activeUsers");
    };
  }, [pathname]);

  useEffect(() => {
    const trackVisit = async () => {
      if (hasTrackedRef.current) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/track-visit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({ path: pathname }),
          }
        );
        if (response.ok) {
          hasTrackedRef.current = true;
        } else {
          throw new Error("Tracking failed");
        }
      } catch (error) {
        console.error("Visit tracking error:", error);
      }
    };

    trackVisit();
  }, [pathname]);

  // For debugging purposes, you can uncomment the line below to see active users
  // return <div>Active users: {activeUsers}</div>;
  return null; // This component doesn't render anything by default
};

export default VisitTracker;
