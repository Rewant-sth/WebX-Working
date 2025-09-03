"use client";
import { useEffect, useState, useRef } from "react";
import Title from "../../../components/intineryBars/Title";
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
import { useParams } from "next/navigation";
import { getPackagesById } from "@/service/packages";
import { useQuery } from "@tanstack/react-query";
import { ITravelPackage } from "@/types/IPackages";
import SkeletonPackageDetails from "./_components/SkeletonLoader";
import { useRouter } from "next/navigation";
import ScrollTracker from "@/components/intineryBars/scroll-tracker";
import GalleryCarousel from "@/components/intineryBars/gallery/gallery-carousel";

import RightBar from "@/components/intineryBars/RightBar";
import OverviewSection from "./_components/OverviewSection";
import RouteMapModal from "./_components/RouteMapModal";
import ImagePreviewModal from "./_components/ImagePreviewModal";
import RouteMap from "@/components/tripGlance/RouteMap";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    console.log("params", params.slug);
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
  const [selectedImg, setSelectedImg] = useState("/TrekImages/manaslu.png");

  return (
    <div className="w-full">
      {isLoading ? (
        <SkeletonPackageDetails />
      ) : (
        <>
          <div ref={heroRef} className="relative min-h-screen overflow-hidden  ">
            <div className="absolute bottom-0  z-[99]  ">
              <img src="/man2.png" alt="man" className="w-[80%] max-w- translate-y-16 object-cover drop-shadow-black" />
            </div>

            <Title data={packageData?.data as ITravelPackage} />
            <div className=" px-4 sm:px-6  lg:px-16 mt-8  z-[80]">
              {packageData?.data?.gallery?.length !== 0 && (
                <GalleryCarousel slides={packageData?.data?.gallery} />
              )}
            </div>
          </div>

          <ScrollTracker data={packageData?.data as ITravelPackage} />
          <div className={`w-full relative h-auto flex flex-col xl:flex-row justify-between gap-4 md:gap-10 p-6 lg:px-10 ${modalOpen ? "filter blur-2xl" : ""}`}>

            {/* Center Content */}
            <div className=" w-full max-w-[75%] relative  rounded-xl">
              {packageData && <TripGlance data={packageData?.data} />}

              {packageData && <SeasonalInfo data={packageData.data} />}

              {packageData?.data?.attraction.length ? (
                <MajorHighlight data={packageData?.data} />
              ) : null}

              <div className="h-[60dvh] w-full relative mb-12 rounded-sm overflow-hidden">
                <Image src={packageData?.data?.coverImage || "/placeholder.png"} alt="Manaslu" layout="fill" objectFit="cover" className="object-bottom" />
              </div>

              {/* Overview Section */}
              <OverviewSection packageData={packageData?.data as ITravelPackage} />

              {/* <Places data={packageData} /> */}
              {/* <RouteMap onShow={() => setIsVisible(true)} data={packageData?.data} /> */}
              {packageData?.data?.itinerary.length ? (
                <Itinerary data={packageData?.data.itinerary} />
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
              {packageData?.data.fixedDates?.length ? (
                <DatesAndPrices
                  pkg={packageData.data}
                  data={packageData?.data?.fixedDates}
                  packageId={packageData?.data._id}
                />
              ) : null}
              {packageData?.data?.faq.length ? (
                <Faq faq={packageData?.data?.faq} />
              ) : null}
              {packageData?.data?.testimonial && (
                <TravellerReview
                  data={packageData.data}
                />
              )}
              <RelatedTrips
                packageId={packageData?.data?.id as string}
                category={packageData?.data?.categoryId?.slug as string}
                subCategory={packageData?.data?.subCategoryId?.slug as string}
              />

            </div>
            {/* Right Sidebar */}
            <div className="xl:w-[25%] shrink-0">
              <RightBar data={packageData?.data} />
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
      )
      }
    </div >
  );
};

export default Page;
