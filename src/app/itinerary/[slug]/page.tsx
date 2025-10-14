"use client";
import { useEffect, useState, useRef } from "react";
import TripGlance from "../../../components/tripGlance/TripGlance";
import SeasonalInfo from "../../../components/tripGlance/SeasonalInfo";
import MajorHighlight from "../../../components/tripGlance/MajorHighlight";
import Cost from "../../../components/tripGlance/Cost";
import Faq from "../../../components/tripGlance/Faq";
import TravellerReview from "../../../components/tripGlance/Review";
import Itinerary from "../../../components/intineryBars/Itinerary";
import DatesAndPrices from "../../../components/intineryBars/DatesAndPrices";
import RelatedTrips from "../../../components/tripGlance/RelatedTrips";
import Requirements from "../../../components/tripGlance/Requirements";
import Insurance from "../../../components/tripGlance/Insurance";
import Gear from "../../../components/tripGlance/Gear";
import WhyLoveThis from "../../../components/tripGlance/WhyLoveThis";
import ImportantNotice from "../../../components/tripGlance/ImportantNotice";
import { useParams, usePathname } from "next/navigation";
import { getPackagesById } from "@/service/packages";
import { useQuery } from "@tanstack/react-query";
import { ITravelPackage } from "@/types/IPackages";
import SkeletonLoader from "./_components/SkeletonLoader";
import { useRouter } from "next/navigation";
import ScrollTracker from "@/components/intineryBars/scroll-tracker";
import GalleryCarousel from "@/components/intineryBars/gallery/gallery-carousel";
import RightBar from "@/components/intineryBars/RightBar";
import OverviewSection from "./_components/OverviewSection";
import RouteMapModal from "./_components/RouteMapModal";
import ImagePreviewModal from "./_components/ImagePreviewModal";
import RouteMap from "@/components/tripGlance/RouteMap";
import Image from "next/image";
import EmblaCarousel from "@/components/ui/embla-carousel";
import VideoReview from "./_components/video-review";
import ContactModal from "@/components/contact-modal";
import BookingModal from "@/components/booking-modal";
import { useBookingStore } from "@/store/booking-store";
import path from "path";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const setIsBookingModalOpen = useBookingStore((state) => state.setIsBookingModalOpen);

  const pathname = usePathname()

  const breadcums = pathname.split("/").filter((p) => p && p !== "itinerary" && p !== params.slug).map((p) => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " "));

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const showAt = heroRef.current.offsetTop + (heroHeight * 0.8);
        setIsStickyVisible(window.scrollY > showAt);
        setIsScrolled(window.scrollY > 0);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      params.slug === undefined ||
      params.slug === null ||
      params.slug === "" ||
      params.slug === "undefined"
    ) {
      router.replace("/");
      return;
    }
  }, [params.slug, router]);

  const { data: packageData, isLoading } = useQuery({
    queryKey: ["packageById"],
    queryFn: () => getPackagesById(params?.slug as string),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg] = useState("/TrekImages/manaslu.png");
  const [showContactModal, setShowContactModal] = useState(false);

  // Use the store state directly instead of local state
  const showBookingModal = useBookingStore((state) => state.isBookingModalOpen);

  // Hide footer and navbar when booking modal is open
  useEffect(() => {
    const footer = document.getElementById("footer");
    const navbar = document.getElementById("navbar");

    if (showBookingModal) {
      if (footer) footer.style.display = "none";
      if (navbar) navbar.style.display = "none";
    }
    else {
      if (footer) footer.style.display = "";
      if (navbar) navbar.style.display = "";
    }

    // Cleanup on unmount
    return () => {
      if (footer) footer.style.display = "";
      if (navbar) navbar.style.display = "";
    };
  }, [showBookingModal]);

  useEffect(() => {
    const footer = document.getElementById("footer");
    const navbar = document.getElementById("navbar");

    if (showContactModal) {
      if (footer) footer.style.display = "none";
      if (navbar) navbar.style.display = "none";
    }
    else {
      if (footer) footer.style.display = "";
      if (navbar) navbar.style.display = "";
    }

    // Cleanup on unmount
    return () => {
      if (footer) footer.style.display = "";
      if (navbar) navbar.style.display = "";
    };
  }, [showContactModal]);

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <>

      {showBookingModal && packageData?.data ? (
        <div className="min-h-screen"
          style={{
            backgroundImage: "url('/screenshot.png')",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div className="h-full min-h-screen w-full bg-black/50 backdrop-blur-lg">
            <BookingModal
              packageData={packageData.data as ITravelPackage}
              onClose={handleCloseBookingModal}
            />
          </div>
        </div>)
        : (
          <>
            {showContactModal ? (
              <div className="min-h-screen"
                style={{
                  backgroundImage: "url('/screenshot.png')",
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              >
                <div className="h-full min-h-screen w-full bg-black/40 backdrop-blur-lg flex items-center justify-center ">
                  <ContactModal onClose={() => setShowContactModal(false)} packageName={packageData?.data?.name || "Real Himalaya Package"} />
                </div>
              </div>
            ) : (
              <div className="w-full relative h-full">

                {isLoading ? (
                  <SkeletonLoader />
                ) : (
                  <>
                    <div ref={heroRef} className="relative h-[60dvh] sm:min-h-screen overflow-hidden  ">
                      <div className="absolute bottom-0 right-0 z-[99] hidden md:flex justify-end items-end w-full h-full">
                        <img src="/man2.png" alt="man" className="scale-110 lg:w-[60%]  translate-y-16 object-cover drop-shadow-black" />
                      </div>

                      {/* <Title data={packageData?.data as ITravelPackage} /> */}
                      <div className="  z-[80]">
                        {packageData?.data?.gallery?.length !== 0 && (
                          <GalleryCarousel slides={packageData?.data?.gallery} />
                        )}

                        {packageData?.data?.gallery?.length === 0 && (
                          <div className="h-dvh w-dvw relative">
                            <Image
                              src={"/EVEREST REGION/NIKOND50001920.JPG"}
                              alt={`No images available`}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        )}
                      </div>
                    </div>



                    <div className={`w-full relative h-auto flex flex-col lg:flex-row justify-between gap-6 lg:gap-0  md:p-6 lg:px-10 ${modalOpen ? "filter blur-2xl" : ""}`}>

                      {/* Left Sidebar - Scroll Tracker */}
                      <div className="hidden lg:block w-full lg:w-[22%] xl:w-[17%]  shrink-0">
                        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
                          <ScrollTracker data={packageData?.data as ITravelPackage} />
                        </div>
                      </div>


                      {/* Breadcrumb */}
                      <nav className="w-full lg:hidden px-4 py-3 " aria-label="Breadcrumb">
                        <ol className="flex items-center  font-medium text-orange-500">
                          <li>
                            <Link
                              href="/"
                              className="hover:text-primary transition-colors duration-200 flex items-center"
                            >

                              Home
                            </Link>
                          </li>

                          <li>
                            <svg
                              className="w-4 h-4 text-gray-400 mx-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </li>


                          <li>
                            <Link
                              href={"/package-list/" + packageData?.data?.categoryId?.slug}
                              className="hover:text-primary transition-colors duration-200 flex items-center"
                            >
                              Packages
                            </Link>
                          </li>

                          <li>
                            <svg
                              className="w-4 h-4 text-gray-400 mx-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </li>

                          <li className="flex items-center">

                            <span className="font-medium truncate">
                              {packageData?.data?.name || "Package Details"}
                            </span>
                          </li>
                        </ol>
                      </nav>

                      <div className="w-full  rounded-xl max-w-lg sm:max-w-full  sm:mx-4 lg:hidden">
                        <RightBar
                          onShowContact={() => setShowContactModal(true)}
                          onShowBooking={handleOpenBookingModal}
                          data={packageData?.data}
                        />
                      </div>

                      {/* Mobile Scroll Tracker - Sticky Top */}
                      <div className="lg:hidden sticky top-0 z-[99999]">
                        <ScrollTracker data={packageData?.data as ITravelPackage} />
                      </div>





                      {/* Center Content */}
                      <div className="w-full lg:border-l border-zinc-200 lg:w-[53%] xl:w-[60%] p-4 xl:px-8 relative  min-w-0">



                        {packageData && <TripGlance data={packageData?.data} />}

                        {packageData && <SeasonalInfo data={packageData.data} />}

                        {packageData?.data?.attraction.length ? (
                          <MajorHighlight data={packageData?.data} />
                        ) : null}

                        {/* add carousel here as well and have autoplay */}
                        {packageData?.data?.gallery && packageData?.data?.gallery.length > 0 ? (
                          <div className="h-[60dvh] w-full relative mb-14">
                            <EmblaCarousel
                              rounded
                              className="h-full w-full"
                              images={packageData.data.gallery.map((g: any) => ({
                                src: g.imageUrl || "/placeholder.png",
                                alt: g.caption || "Gallery image",
                              }))}
                              options={{ loop: true, align: "start" }}
                            />
                          </div>
                        ) : (
                          <div className="h-[60dvh] w-full relative mb-14 rounded-sm overflow-hidden">
                            <Image
                              src={packageData?.data?.coverImage || "/placeholder.png"}
                              alt="Manaslu"
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        )}

                        {/* Overview Section */}
                        <OverviewSection packageData={packageData?.data as ITravelPackage} />

                        {/* <Places data={packageData} /> */}
                        {/* <RouteMap onShow={() => setIsVisible(true)} data={packageData?.data} /> */}
                        {packageData?.data?.itinerary.length ? (
                          <Itinerary data={packageData?.data.itinerary} />
                        ) : null}

                        {packageData?.data.fixedDates?.length ? (
                          <DatesAndPrices
                            onShowBooking={handleOpenBookingModal}
                            pkg={packageData.data}
                            data={packageData?.data?.fixedDates}
                            packageId={packageData?.data._id}
                          />
                        ) : null}

                        {packageData?.data?.inclusion.length ? (
                          <Cost data={packageData?.data} />
                        ) : null}

                        <RouteMap onShow={() => setIsVisible(true)} data={packageData?.data} />
                        {packageData?.data?.requirements.length ? (
                          <Requirements data={packageData?.data} />
                        ) : null}


                        {packageData?.data?.insurance.length ? (
                          <Insurance data={packageData?.data} />
                        ) : null}

                        {/* <Divider images={packageData?.data?.gallery as IGallery[]} /> */}

                        {packageData?.data?.gearInfo.length ? (
                          <Gear data={packageData?.data} />
                        ) : null}
                        {packageData?.data?.whyLoveThisTrek.length ? (
                          <WhyLoveThis data={packageData?.data} />
                        ) : null}
                        {packageData?.data?.importantNotice.length ? (
                          <ImportantNotice data={packageData?.data} />
                        ) : null}

                        {packageData?.data?.faq.length ? (
                          <Faq faq={packageData?.data?.faq} />
                        ) : null}
                        {packageData?.data?.testimonial.length ? (
                          <TravellerReview
                            data={packageData.data}
                          />
                        ) : null}
                        {packageData?.data?.videos?.length ? (
                          <VideoReview data={packageData?.data} />
                        ) : null}
                        <RelatedTrips
                          packageId={packageData?.data?._id as string}
                          category={packageData?.data?.categoryId?.slug as string}
                          subCategory={packageData?.data?.subCategoryId?.slug as string}
                        />

                      </div>

                      {/* Right Sidebar */}
                      <div className="hidden lg:block w-[25%] shrink-0">
                        <div className="lg:sticky top-20 ">
                          <RightBar
                            onShowContact={() => setShowContactModal(true)}
                            onShowBooking={handleOpenBookingModal}
                            data={packageData?.data}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Route Map Modal */}
                    <RouteMapModal
                      isVisible={isVisible}
                      onClose={() => setIsVisible(false)}
                      routeMap={packageData?.data?.routeMap}
                    />

                    {/* Image Preview Modal */}
                    <ImagePreviewModal
                      modalOpen={modalOpen}
                      selectedImg={selectedImg}
                      onClose={() => setModalOpen(false)}
                    />
                  </>
                )}
              </div>
            )}
          </>
        )
      }


    </>
  );
};

export default Page;
