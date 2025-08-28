"use client";
import {
  ArrowRight,
  Locate as LocateIcon,
  X,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Title from "../../../components/intineryBars/Title";
import TripGlance from "../../../components/tripGlance/TripGlance";
import MajorHighlight from "../../../components/tripGlance/MajorHighlight";
import RouteMap from "../../../components/tripGlance/RouteMap";
import Cost from "../../../components/tripGlance/Cost";
import Faq from "../../../components/tripGlance/Faq";
import TravellerReview from "../../../components/tripGlance/Review";
import Itinerary from "../../../components/intineryBars/Itinerary";
import DatesAndPrices from "../../../components/intineryBars/DatesAndPrices";
import RelatedTrips from "../../../components/tripGlance/RelatedTrips";
import Requirements from "../../../components/tripGlance/Requirements";
import { useParams } from "next/navigation";
import { getPackagesById } from "@/service/packages";
import { useQuery } from "@tanstack/react-query";
import { ITravelPackage } from "@/types/IPackages";
import SkeletonPackageDetails from "./_components/SkeletonLoader";
import { useRouter } from "next/navigation";
import ScrollTracker from "@/components/intineryBars/scroll-tracker";
import GalleryCarousel from "@/components/intineryBars/gallery/gallery-carousel";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    <div>
      {isLoading ? (
        <SkeletonPackageDetails />
      ) : (
        <>
          <div ref={heroRef} className="relative min-h-screen overflow-hidden  ">
            <div className="absolute bottom-0  z-[999]  ">
              <img src="/man2.png" alt="man" className="w-full max-w-7xl translate-y-16 object-cover drop-shadow-black" />
            </div>

            <Title data={packageData?.data as ITravelPackage} />
            <div className=" px-4 sm:px-6  lg:px-16 mt-8  z-[80]">
              {packageData?.data?.gallery?.length !== 0 && (
                <GalleryCarousel slides={packageData?.data?.gallery} />
              )}
            </div>
          </div>

          <ScrollTracker data={packageData?.data as ITravelPackage} />
          <div className={`w-full relative h-auto flex flex-col xl:flex-row gap-8 pb-10  mt-8 ${modalOpen ? "filter blur-2xl" : ""}`}>

            {/* Center Content */}
            <div id="overview" className=" mx-auto relative  rounded-xl">
              {packageData && <TripGlance data={packageData?.data} />}

              {packageData?.data?.attraction.length ? (
                <MajorHighlight data={packageData?.data} />
              ) : null}

              {/* Overview Section */}
              <div

                style={{
                  backgroundImage: "linear-gradient(rgb(0,0,0,0.7), rgb(0,0,0,0.7)),url('/EVEREST REGION/NIKON D50003007.JPG')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundAttachment: "fixed"
                }}
                className="relative min-h-[70dvh]  py-16 mb-14 bg-[#0d1117] text-white w-screen flex justify-center items-center">

                {
                  isVisible && (
                    <div className="fixed inset-0 flex justify-center items-center  z-[99999] bg-black/70 backdrop-blur-md ">
                      <button onClick={() => setIsVisible(false)} className="absolute top-5 right-5 text-orange-500 text-3xl flex justify-center items-center rounded-full size-14 bg-white">
                        <Icon icon="gridicons:cross" />
                      </button>
                      <div className=" ">
                        <img src={packageData?.data?.routeMap} alt="route map" />
                      </div>
                    </div>
                  )
                }

                <div className=" relative max-w-7xl mx-auto  mb-8 pb-10">
                  <h2 className="text-5xl mb-8 font-semibold  text-center sm:text-left">
                    Trip Overview
                  </h2>
                  <div
                    className=" rounded-sm bg-gray-25   transition-all duration-200"
                  >
                    <div
                      className="prose prose-lg max-w-none text-3xl  leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: packageData?.data?.overview.slice(0, 400) as string,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* <Places data={packageData} /> */}
              <RouteMap onShow={() => setIsVisible(true)} data={packageData?.data} />
              {packageData?.data?.itinerary.length ? (
                <Itinerary data={packageData?.data.itinerary} />
              ) : null}
              {packageData?.data?.inclusion.length ? (
                <Cost data={packageData?.data} />
              ) : null}
              {packageData?.data?.requirements.length ? (
                <Requirements data={packageData?.data} />
              ) : null}
              {packageData?.data.fixedDates?.length ? (
                <DatesAndPrices
                  data={packageData?.data?.fixedDates}
                  packageId={packageData?.data.id}
                />
              ) : null}
              {packageData?.data?.faq.length ? (
                <Faq faq={packageData?.data?.faq} />
              ) : null}
              {packageData?.data?.testimonial && (
                <TravellerReview
                  data={packageData.data}
                  packageId={packageData?.data?.id as string}
                />
              )}
              <RelatedTrips
                packageId={packageData?.data?.id as string}
                category={packageData?.data?.categoryId?.slug as string}
                subCategory={packageData?.data?.subCategoryId?.slug as string}
              />

            </div>



            {/* Right Sidebar */}
            {/* <div className="xl:w-[30%]">
              <RightBar data={packageData?.data} />
            </div> */}
          </div>

          <div
            className={`sticky bottom-0 w-full shadow-3xl items-center grid grid-cols-4 py-2 text-zinc-900 bg-orange-100 rounded-sm transition-all z-[99] duration-300 transform ${isStickyVisible ? 'translate-y-0' : 'translate-y-full'
              } ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
          >
            <div className="w-full flex items-center justify-center gap-2 py-4 border-orange-200 border-r-[2px]">
              <h2 className=" font-bold  uppercase">Starting at - </h2>
              <p className="text-lg font-bold text-orange-500">Rs. {packageData?.data?.fixedDates[0] ? packageData.data.fixedDates[0].pricePerPerson : "N/A"}</p>
            </div>
            <div className=" flex justify-center border-orange-200 border-r-[2px]">
              <div className="">
                <h2 className=" font-semibold">{packageData?.data?.name}</h2>
                <p className="flex items-center gap-0.5"><LocateIcon size={15} />{packageData?.data?.location}</p>
              </div>
            </div>
            <div className="flex justify-center items-center border-orange-200 border-r-[2px]">
              <div className="">
                <h2 className=" font-semibold">Talk to Experts</h2>
                <p>+977-9803556169</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="flex items-center gap-2 border py-2 px-6 uppercase font-semibold text-orange-500 rounded-full">
                Book Now <ArrowRight />
              </button>
            </div>
          </div>

          {/* Modal */}
          {modalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            >
              <div
                className="relative max-w-3xl w-full max-h-[90vh] rounded-sm overflow-hidden shadow-xl mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImg}
                  alt="Preview"
                  className="w-full h-auto object-contain"
                  height={10}
                  width={10}
                />
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                >
                  <X className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          )}
        </>
      )
      }
    </div >
  );
};

export default Page;
