"use client";
import { usePathname } from "next/navigation";
import Navbar from "./common/navbar/Navbar";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Preloader from "./Preloader";
import AudioConfirmation from "./AudioConfirmation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [notificationCount, setNotificationCount] = React.useState(false);
  const [showAudioConfirmation, setShowAudioConfirmation] = React.useState(true);
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [preloaderVisible, setPreloaderVisible] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);

    // Check if audio confirmation has already been shown in this session
    const audioConfirmationShown = sessionStorage.getItem("audio-confirmation-shown");
    const audioWasEnabled = sessionStorage.getItem("audio-enabled") === "true";

    if (audioConfirmationShown === "true") {
      // Audio confirmation already shown, skip it
      setShowAudioConfirmation(false);
      setAudioEnabled(audioWasEnabled);

      // Check if preloader has already been shown
      const preloaderShown = sessionStorage.getItem("preloader-shown");
      if (preloaderShown === "true") {
        setPreloaderVisible(false);
      } else {
        setPreloaderVisible(true);
      }
    }
  }, []);

  // Handle preloader logic after audio confirmation
  useEffect(() => {
    if (!showAudioConfirmation && preloaderVisible) {
      const preloaderShown = sessionStorage.getItem("preloader-shown");

      if (preloaderShown !== "true") {
        // Show preloader for 12 seconds, then hide it and mark as shown
        const timer = setTimeout(() => {
          sessionStorage.setItem("preloader-shown", "true");
          setPreloaderVisible(false);
        }, 12000);

        return () => clearTimeout(timer);
      }
    }
  }, [showAudioConfirmation, preloaderVisible]);

  // Handle audio playback - start immediately after confirmation, during preloader
  useEffect(() => {
    if (audioEnabled && audioRef.current && !showAudioConfirmation) {
      audioRef.current.play().catch(console.error);
    }
  }, [audioEnabled, showAudioConfirmation]);

  const handleAudioConfirmation = (allowAudio: boolean) => {
    setAudioEnabled(allowAudio);
    setShowAudioConfirmation(false);
    sessionStorage.setItem("audio-confirmation-shown", "true");
    sessionStorage.setItem("audio-enabled", allowAudio.toString());

    // Start preloader after audio confirmation
    const preloaderShown = sessionStorage.getItem("preloader-shown");
    if (preloaderShown !== "true") {
      setPreloaderVisible(true);
    }
  }; useEffect(() => {
    document.title = notificationCount ? "1 New Message" : "Real Himalaya | Your real expedition partner";
  }, [notificationCount]);

  // Hide navbar on pages that start with /booking
  const shouldHideNavbar = pathname.startsWith("/booking") || pathname.startsWith("/customize-trip") || pathname.startsWith("/terms-and-conditions") || pathname.startsWith("/test");

  return (
    <>
      {/* Audio element - controlled by user confirmation */}
      <audio
        ref={audioRef}
        src="/Audio/cumb.mp3"
        loop
        style={{ display: 'none' }}
      />

      {/* Show audio confirmation first */}
      {isClient && showAudioConfirmation && (
        <AudioConfirmation onConfirm={handleAudioConfirmation} />
      )}

      {/* Show preloader after audio confirmation */}
      {isClient && !showAudioConfirmation && preloaderVisible && (
        <Preloader />
      )}

      {/* Show main content after preloader */}
      {!showAudioConfirmation && !preloaderVisible && (
        <>
          {!shouldHideNavbar && <Navbar />}
          {children}
        </>
      )}
    </>
  );
}
