import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { ReactNode, useEffect, useRef } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    delay?: number;
}

gsap.registerPlugin(ScrollTrigger);


const AnimatedSection = React.memo(function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const animation = gsap.fromTo(
            sectionRef.current,
            {
                x: -200,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                delay: delay / 1000,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            animation.kill();
            if (animation.scrollTrigger) animation.scrollTrigger.kill();
        };
    }, [delay]);

    return (
        <div ref={sectionRef} className="opacity-0 z-[50]">
            {children}
        </div>
    );
});


export default AnimatedSection;