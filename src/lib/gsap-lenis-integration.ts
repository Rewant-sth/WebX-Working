import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Setup GSAP ScrollTrigger to work with Lenis smooth scroll
 * This function should be called after Lenis is initialized
 */
export const setupGSAPWithLenis = () => {
    // Update ScrollTrigger when Lenis updates
    const updateScrollTrigger = () => {
        ScrollTrigger.update();
    };

    // Listen for Lenis scroll events if Lenis is available
    if (typeof window !== 'undefined') {
        // Try to get Lenis instance from global scope or from the component
        const checkLenis = () => {
            // Check if lenis is available on window (you might need to adjust this based on your Lenis setup)
            const lenis = (window as any).lenis;
            if (lenis) {
                // Update ScrollTrigger on Lenis scroll
                lenis.on('scroll', updateScrollTrigger);
                return true;
            }
            return false;
        };

        // Try to connect to Lenis with retries
        let attempts = 0;
        const maxAttempts = 10;
        const connectToLenis = () => {
            if (checkLenis() || attempts >= maxAttempts) {
                return;
            }
            attempts++;
            setTimeout(connectToLenis, 100);
        };

        connectToLenis();
    }

    // Refresh ScrollTrigger after a short delay to ensure proper initialization
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
};

/**
 * Create a scroll-triggered animation with snap functionality
 */
export const createSnapScrollAnimation = (
    trigger: HTMLElement,
    timeline: gsap.core.Timeline,
    options: {
        start?: string;
        end?: string;
        scrub?: number | boolean;
        pin?: boolean;
        pinSpacing?: boolean;
        snap?: ScrollTrigger.SnapVars;
        onUpdate?: (self: ScrollTrigger) => void;
    } = {}
) => {
    const defaultOptions = {
        start: "top top",
        end: "+=100vh",
        scrub: 1,
        pin: false,
        pinSpacing: false,
        snap: {
            snapTo: [0, 1],
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power2.inOut"
        },
        ...options
    };

    return ScrollTrigger.create({
        trigger,
        animation: timeline,
        ...defaultOptions,
        invalidateOnRefresh: true,
        anticipatePin: 1
    });
};

/**
 * Cleanup all ScrollTrigger instances
 */
export const cleanupScrollTrigger = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.clearMatchMedia();
};
