"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
import Link from "next/link";

// Register the Draggable plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(Draggable);
}

const WhatsappBtn = () => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        const button = buttonRef.current;
        const container = containerRef.current;

        if (!button || !container) return;

        // Calculate initial bottom-left position
        const calcInitialPosition = () => {
            const padding = 20; // Padding from edges
            return {
                x: padding - container.offsetLeft,
                y: window.innerHeight - button.offsetHeight - padding - container.offsetTop
            };
        };

        // Get stored position from localStorage or use bottom-left position
        const storedPosition = localStorage.getItem('whatsappBtnPosition');
        const initialPosition = storedPosition ? JSON.parse(storedPosition) : calcInitialPosition();

        // Set initial position with animation
        gsap.fromTo(button,
            {
                x: initialPosition.x,
                y: window.innerHeight, // Start from bottom
                opacity: 0
            },
            {
                x: initialPosition.x,
                y: initialPosition.y,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => setIsLoaded(true)
            }
        );

        // Initialize draggable
        const draggable = Draggable.create(button, {
            type: "x,y",
            bounds: container,
            inertia: true,
            onClick: function () {
                if (!isDragging) {
                    // Handle click when not dragging
                    const link = button.querySelector('a');
                    if (link) link.click();
                }
            },
            onDragStart: () => {
                setIsDragging(true);
                gsap.to(button, { scale: 0.95, duration: 0.2 });
            },
            onDragEnd: function () {
                // Save position to localStorage
                localStorage.setItem('whatsappBtnPosition', JSON.stringify({
                    x: this.x,
                    y: this.y,
                }));

                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "elastic.out(1, 0.5)",
                    onComplete: () => setIsDragging(false)
                });
            },
            onDrag: function () {
                // Optional: Add boundaries check here if needed
                const bounds = this.getBounds();
                if (bounds) {
                    const { minX, maxX, minY, maxY } = bounds;
                    this.x = Math.max(minX, Math.min(maxX, this.x));
                    this.y = Math.max(minY, Math.min(maxY, this.y));
                }
            }
        })[0];

        // Handle window resize
        const handleResize = () => {
            if (button) {
                const newPos = calcInitialPosition();
                gsap.to(button, {
                    x: newPos.x,
                    y: newPos.y,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        localStorage.setItem('whatsappBtnPosition', JSON.stringify(newPos));
                    }
                });
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            draggable.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed h-screen w-full inset-0 pointer-events-none z-[99999]">
            <div
                title="Adjust position by dragging"
                ref={buttonRef}
                className={`pointer-events-auto w-fit cursor-grab opacity-0 ${isDragging ? 'cursor-grabbing' : ''
                    }`}
                style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
            >
                {/* <div className="h-full w-full relative">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-max text-center text-xs bg-white  px-2 py-1 rounded-md opacity-80">
                        <button>Chat on WhatsApp</button>
                    </div>
                </div> */}
                <Link
                    href={"https://wa.me/9851026840"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    onClick={(e) => isDragging && e.preventDefault()}
                    className="group flex flex-col items-center"
                >
                    <div className="flex justify-center p-2 items-center size-8 lg:size-16 relative bg-[#FF6900] text-white rounded-full transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute top-0 right-0 size-4 sm:size-5 text-[9px] sm:text-xs animate-pulse bg-white text-[#FF6900] border flex justify-center items-center rounded-full">1</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="lg:size-7"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18h-.75a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75m15.75 0h-.75a.75.75 0 0 1-.75-.75v-7.5A.75.75 0 0 1 19.5 9h.75a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3M3.75 9a8.25 8.25 0 1 1 16.5 0M15 21.75h2.25a3 3 0 0 0 3-3V18"></path><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 23.25H12a1.5 1.5 0 1 1 0-3h1.5a1.5 1.5 0 1 1 0 3M9 8.25a3 3 0 0 1 5.753-1.192c.218.505.294 1.06.218 1.605A3 3 0 0 1 13 11.079a1.5 1.5 0 0 0-1 1.415v.256"></path><path d="M12 16.5a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75"></path></g></svg>
                    </div>

                </Link>
            </div>
        </div>
    );
};

export default WhatsappBtn;