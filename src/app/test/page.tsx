"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger)

export default function Page() {

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".trigger",
                    start: "top top",
                    end: "+=800",
                    pin: true,
                    scrub: 0.5,
                }
            });

            timeline.fromTo(
                "#content",
                { attr: { startOffset: "0%" } },
                { attr: { startOffset: "100%" } },
                0
            );

        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="h-screen trigger flex justify-center items-center">
            {/* <svg width="1100" height={500} className="m-3" viewBox="-50 -50 2992 1579" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="path" d="M46 1429.5L24.7092 756M24.7092 756L1 5.99999C240.333 -22.6667 693 50.3 589 571.5C555.473 655.5 395.677 810 24.7092 756ZM24.7092 756L782.5 1429.5C668.667 850.167 667.3 -205.2 1572.5 208C1541.17 502.667 1339.3 1032.8 782.5 796C727.167 1146.33 833.8 1746.4 1703 1344L2075.5 122.5L2453 1344C2628.17 1064 2958.7 427.7 2879.5 122.5C2653.33 366.5 2359.1 945.2 2991.5 1308" stroke="" />
                <text fontSize="80" fontWeight="bold" fill="black">
                    <textPath id="content" href="#path" fill="black">
                        Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real HimalayaReal Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real HimalayaReal Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real HimalayaReal Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya
                    </textPath>
                </text>
            </svg> */}

            <svg width="1100" height="900" viewBox="0 0 404 259" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="path" d="M71.5 80L383.5 40.5L76.5 231.5L168 2L348.5 249.5L140.5 122L272.5 16L238 225L0.5 145.5L402.5 142L346 6L210 113L44.5 95L236 16.5L184 257L103 19L369.5 116L298.5 242.5L66.5 116L309 2" stroke="" />

                <text fontSize="12" fontWeight="bold" fill="black">
                    <textPath id="content" href="#path" fill="black">
                        Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real HimalayaReal Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real HimalayaReal Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya Real HimalayaReal Himalaya Real Himalaya Real Himalaya Real Himalaya Real Himalaya
                    </textPath>
                </text>


            </svg>


        </section>
    );
}
