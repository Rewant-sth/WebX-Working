"use client";
import Footer from "@/components/common/footer/new-footer";
import ExpeditionPage from "@/components/expedition/ExpeditionPage";
import Hero from "@/components/hero/Hero";
import AboutUs from "@/components/home/aboutus";
import CTA from "@/components/home/cta-with-gallery.tsx";
import Intro from "@/components/home/intro";
import QuickInfo from "@/components/home/quick-info";
import TestimonialsSections from "@/components/home/testimonial";
import TravellerReview from "@/components/home/travellers-reviews";
import TrekPage from "@/components/trek/TrekPage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";


const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //   const context = gsap.context(() => {
  //     ScrollTrigger.create({
  //       trigger: containerRef.current,
  //       start: "top top",
  //       end: "bottom bottom",
  //       snap: {
  //         snapTo: 1 / 11, 
  //         duration: 0.5,
  //         ease: "power3.out",
  //       }
  //     })
  //   })
  // })



  return (
    <main ref={containerRef} className="relative font-montserrat">
      <Hero />
      <Intro />
      <AboutUs />
      <ExpeditionPage />
      <TrekPage />
      <TestimonialsSections />
      <CTA />
      <QuickInfo />
      <TravellerReview />
      <Footer />
    </main>
  );
};

export default Page;