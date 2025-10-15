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
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Get all booking store state and actions
  const {
    isBookingModalOpen,
    package: storePackage,
    clearBookingData,
    openBookingModal
  } = useBookingStore();



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
  const showBookingModal = isBookingModalOpen;

  // Check if we need to open modal on mount (when redirected from another page)
  useEffect(() => {
    if (storePackage && isBookingModalOpen) {
      // Modal should already be open from the store
      // We can scroll to a specific section if needed
      const bookingSection = document.getElementById('date-and-price');
      if (bookingSection) {
        setTimeout(() => {
          bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [storePackage, isBookingModalOpen]);

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
    if (packageData?.data) {
      // Get the current selected dates from the store
      const { arrivalDate, departureDate, selectedFixedDateId } = useBookingStore.getState();

      // Open modal with package and preserve any already-selected dates
      openBookingModal(
        packageData.data,
        selectedFixedDateId || packageData.data.fixedDates?.[0]?._id || null,
        arrivalDate,
        departureDate
      );
    }
  };

  const handleCloseBookingModal = () => {
    clearBookingData(); // Clear store on close
  };

  return (
    <div className="h-full min-h-screen overflow-auto">

      {showBookingModal && (storePackage || packageData?.data) ? (
        <div className="min-h-screen h-full"
          style={{
            backgroundImage: "url('/screenshot.png')",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div className="h-full   w-full bg-black/50 backdrop-blur-lg">
            <BookingModal
              packageData={(storePackage || packageData?.data) as ITravelPackage}
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

                    {/* Breadcrumb */}
                    <div className="px-4 md:px-6 bg-gray-100   flex items-center lg:px-10">
                      <nav className="w-full  lg:px-0  py-2 " aria-label="Breadcrumb">
                        <ol className="flex items-center shrink-0  font-medium  text-zinc-700 space-x-1 md:space-x-3  overflow-x-auto">
                          <li>
                            <Link
                              href="/"
                              className="hover:text-[#FF6A00]  transition-colors duration-200 flex items-center"
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
                              className="hover:text-[#FF6A00]   !w-fit shrink-0 transition-colors duration-200 flex items-center"
                            >
                              <button className="!shrink-0 w-max">{packageData?.data?.categoryId?.name || "Packages"}</button>
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
                              className="hover:text-[#FF6A00] flex !w-fit shrink-0 transition-colors duration-200 "
                            >
                              <button className="!shrink-0 w-max"> {packageData?.data?.subCategoryId?.name || "Packages"}</button>
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
                    </div>



                    <div className={`w-full relative  h-auto flex flex-col lg:flex-row justify-between gap-6 lg:gap-0  md:px-6 lg:px-10 ${modalOpen ? "filter blur-2xl" : ""}`}>

                      {/* Left Sidebar - Scroll Tracker */}
                      <div className="hidden lg:block w-full lg:w-[22%] xl:w-[17%]  shrink-0">
                        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
                          <ScrollTracker data={packageData?.data as ITravelPackage} />
                        </div>
                      </div>




                      {/* Mobile Scroll Tracker - Sticky Top */}
                      <div className="lg:hidden sticky top-0 z-[99999]">
                        <ScrollTracker data={packageData?.data as ITravelPackage} />
                      </div>





                      {/* Center Content */}
                      <div className="w-full lg:border-l lg:mt-4 border-zinc-200 lg:w-[53%] xl:w-[60%] px-4 xl:px-8 relative  min-w-0">



                        <div className="w-full  rounded-xl max-w-lg sm:max-w-full  sm:mx-4 lg:hidden">
                          <RightBar
                            onShowContact={() => setShowContactModal(true)}
                            onShowBooking={handleOpenBookingModal}
                            data={packageData?.data}
                          />
                        </div>

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

                        {packageData?.data?.note && (
                          <div className="bg-orange-50 rounded-md  p-4 mb-6">
                            <h3 className=" flex gap-2 items-center text-lg font-semibold mb-2">
                              <span className="text-[#f05e25]"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" className="size-7"><path fill="currentColor" fillRule="evenodd" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20m3-28.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-1.879 6.344A2 2 0 0 1 26 23.5v7.764l1.894-.947l1.79 3.577l-4.79 2.395A2 2 0 0 1 22 34.5v-8.046l-1.614.646l-1.486-3.714l4.357-1.743a2 2 0 0 1 1.864.2" clipRule="evenodd"></path></svg></span>
                              Note</h3>
                            <div className="text-zinc-800" dangerouslySetInnerHTML={{ __html: packageData.data.note }}>{ }</div>
                          </div>
                        )}


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
                          onshowBooking={() => {
                            if (packageData?.data) {
                              openBookingModal(packageData.data, packageData.data.fixedDates?.[0]?._id || null);
                            }
                          }}

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


    </div>
  );
};

export default Page;
