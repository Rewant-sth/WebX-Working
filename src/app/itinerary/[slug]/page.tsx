"use client";
import { ArrowRight, LocateIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import Title from "../../../components/intineryBars/Title";
import LeftBar from "../../../components/intineryBars/LeftBar";
import TripGlance from "../../../components/tripGlance/TripGlance";
import MajorHighlight from "../../../components/tripGlance/MajorHighlight";
import RouteMap from "../../../components/tripGlance/RouteMap";
import Cost from "../../../components/tripGlance/Cost";
import Faq from "../../../components/tripGlance/Faq";
import RightBar from "../../../components/intineryBars/RightBar";
import TravellerReview from "../../../components/tripGlance/Review";
import Itinerary from "../../../components/intineryBars/Itinerary";
import DatesAndPrices from "../../../components/intineryBars/DatesAndPrices";
import RelatedTrips from "../../../components/tripGlance/RelatedTrips";
import Requirements from "../../../components/tripGlance/Requirements";
import { useParams } from "next/navigation";
import { getPackagesById } from "@/service/packages";
import GallerySection from "./_components/Gallery";
import { useQuery } from "@tanstack/react-query";
import { ITravelPackage } from "@/types/IPackages";
import SkeletonPackageDetails from "./_components/SkeletonLoader";
import { IGallery } from "@/types/IGallery";
import { useRouter } from "next/navigation";
import ScrollTracker from "@/components/intineryBars/scroll-tracker";
import GalleryCarousel from "@/components/intineryBars/gallery/gallery-carousel";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  // Check for invalid slug immediately and redirect
  useEffect(() => {
    console.log("params", params.slug);

    if (typeof window === "undefined") return;
    if (
      params.slug === undefined ||
      params.slug === null ||
      params.slug === "" ||
      params.slug === "undefined"
    ) {
      // Use replace for 301-like behavior (no back button entry)
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
          <div className="relative min-h-screen overflow-hidden bg-black">
            <Image src={"/ourstory.jpg"} alt="bg" fill className="object-cover z-[20] object-center opacity-70" />
            <Title data={packageData?.data as ITravelPackage} />
            <div className=" px-4 sm:px-6  lg:px-16 mt-8 relative z-[80]">
              {packageData?.data?.gallery?.length !== 0 && (
                <GalleryCarousel slides={packageData?.data?.gallery} />
              )}
            </div>
          </div>

          <ScrollTracker data={packageData?.data as ITravelPackage} />
          <div
            className={`w-full relative h-auto flex flex-col xl:flex-row gap-8 pb-10 px-4 sm:px-6 lg:px-16 mt-8 ${modalOpen ? "filter blur-2xl" : ""
              }`}
          >

            {/* Center Content */}
            <div id="overview" className="max-w-6xl mx-auto relative  rounded-xl">
              {packageData && <TripGlance data={packageData?.data} />}

              {packageData?.data?.attraction.length ? (
                <MajorHighlight data={packageData?.data} />
              ) : null}

              {/* Overview Section */}
              <div className="border-b border-gray-200 mb-8 pb-10">
                <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
                  <span className="w-fit text-2xl font-semibold">
                    Trip Overview
                  </span>
                </h2>
                <p className="text-zinc-600 mt-3 leading-relaxed max-w-2xl mb-8">
                  Get a comprehensive overview of your upcoming adventure and what makes this trip special.
                </p>
                <div
                  className="p-6 rounded-sm bg-gray-25   transition-all duration-200"
                  style={{ backgroundColor: '#fafafa', borderColor: '#f5f5f5' }}
                >
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    style={{ color: '#4b5563' }}
                    dangerouslySetInnerHTML={{
                      __html: packageData?.data?.overview as string,
                    }}
                  />
                </div>
              </div>

              {/* <Places data={packageData} /> */}
              <RouteMap data={packageData?.data} />
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

          <div className="sticky bottom-0 w-full shadow-3xl items-center grid grid-cols-4 py-2 text-zinc-900  bg-orange-100 rounded-sm">
            <div className="w-full flex items-center justify-center gap-4 py-2 border-orange-200 border-r-[2px]">
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
      )}
    </div>
  );
};

export default Page;
