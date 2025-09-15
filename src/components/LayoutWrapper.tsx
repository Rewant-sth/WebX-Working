"use client";
import { usePathname } from "next/navigation";
import Navbar from "./common/navbar/Navbar";
import React, { useEffect } from "react";
import Preloader from "./Preloader";
import AudioConfirmation from "./AudioConfirmation";
import { useMusicPlayerStore } from "@/store/music-player-store";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [notificationCount, setNotificationCount] = React.useState(false);
  const [showAudioConfirmation, setShowAudioConfirmation] = React.useState(false);
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [preloaderVisible, setPreloaderVisible] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Get music player functions from Zustand store
  const { play, initializeAudioElement, cleanupAudioElement, } = useMusicPlayerStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle client-side hydration and initialize music player
  useEffect(() => {
    // Initialize the music player audio element
    initializeAudioElement();

    // Check if audio confirmation has already been shown in this session
    const audioConfirmationShown = sessionStorage.getItem("audio-confirmation-shown");
    const audioWasEnabled = sessionStorage.getItem("audio-enabled") === "true";
    const preloaderShown = sessionStorage.getItem("preloader-shown");

    if (audioConfirmationShown === "true") {
      // Audio confirmation already shown, skip it
      setShowAudioConfirmation(false);
      setAudioEnabled(audioWasEnabled);

      if (preloaderShown === "true") {
        setPreloaderVisible(false);
        setIsVisible(true);
      } else {
        setPreloaderVisible(true);
      }
    } else {
      setShowAudioConfirmation(true);
    }

    setIsInitialized(true);

    // Cleanup on unmount
    return () => {
      cleanupAudioElement();
    };
  }, [initializeAudioElement, cleanupAudioElement]);

  // Handle preloader logic after audio confirmation
  useEffect(() => {
    if (!showAudioConfirmation && preloaderVisible) {
      const preloaderShown = sessionStorage.getItem("preloader-shown");

      if (preloaderShown !== "true") {
        const homeTimer = setTimeout(() => {
          setIsVisible(true);
        }, 10000);

        // Show preloader for 12 seconds, then hide it and mark as shown
        const timer = setTimeout(() => {
          sessionStorage.setItem("preloader-shown", "true");
          setPreloaderVisible(false);
        }, 12000);

        return () => {
          clearTimeout(timer);
          clearTimeout(homeTimer)
        };
      }
    }
  }, [showAudioConfirmation, preloaderVisible]);

  // Handle audio playback - start immediately after confirmation, during preloader
  useEffect(() => {
    if (audioEnabled && !showAudioConfirmation) {
      // Use the Zustand store to play music
      play().catch(console.error);
    }
  }, [audioEnabled, showAudioConfirmation, play]);

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
  };

  const handleSkipPreloader = () => {
    sessionStorage.setItem("preloader-shown", "true");
    setPreloaderVisible(false);
    setIsVisible(true);
  }; useEffect(() => {
    document.title = notificationCount ? "1 New Message" : "Real Himalaya | Your real expedition partner";
  }, [notificationCount]);

  // Hide navbar on pages that start with /booking
  const shouldHideNavbar = pathname.startsWith("/booking") || pathname.startsWith("/customize-trip") || pathname.startsWith("/terms-and-conditions") || pathname.startsWith("/test");

  // Don't render anything until initialization is complete
  if (!isInitialized) {
    return null;
  }

  return (
    <>
      {/* Show audio confirmation first */}
      {showAudioConfirmation && (
        <AudioConfirmation onConfirm={handleAudioConfirmation} />
      )}

      {/* Show preloader after audio confirmation */}
      {preloaderVisible && (
        <Preloader onSkip={handleSkipPreloader} />
      )}

      {/* Show main content only when not showing audio confirmation or preloader */}
      {!showAudioConfirmation && (
        <div style={{ opacity: isVisible ? 1 : 0 }}>
          {!shouldHideNavbar && <Navbar />}
          {children}
        </div>
      )}
    </>
  );
}