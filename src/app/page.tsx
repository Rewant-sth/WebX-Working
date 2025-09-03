"use client";
import ExpeditionPage from "@/components/expedition/ExpeditionPage";
import Hero from "@/components/hero/Hero";
import SnapSections from "@/components/hero/HeroCarousel";
import AboutUs from "@/components/home/aboutus";
import CTA from "@/components/home/cta-with-gallery.tsx";
import Divider from "@/components/home/divider";
import Intro from "@/components/home/intro";
import QuickInfo from "@/components/home/quick-info";
import TestimonialsSections from "@/components/home/testimonial";
import TravellerReview from "@/components/home/travellers-reviews";
import TrekPage from "@/components/trek/TrekPage";

const Page = () => {

  return (
    <main className="relative font-montserrat">
      <Hero />
      <Intro />
      <AboutUs />
      <ExpeditionPage />
      {/* <Divider /> */}
      <TrekPage />
      <TestimonialsSections />
      <CTA />
      <QuickInfo />
      <TravellerReview />
    </main>
  );
};

export default Page;