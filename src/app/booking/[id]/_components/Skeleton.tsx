import { ArrowLeft } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BookingFormSkeleton = () => {
  return (
    <>
      <div className="h-60 bg-zinc-200 animate-pulse mb-6" />{" "}
      {/* Banner Skeleton */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mx-auto p-4 md:p-6 bg-white">
        <div className="flex items-center text-zinc-400 mb-3">
          <ArrowLeft className="w-6 h-6 mr-2" />
          <span> Back to itenerary</span>
          {/* <Skeleton width={150} height={20} /> */}
        </div>

        <div className="mb-8">
          <Skeleton width={250} height={28} className="mb-2" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Skeleton width={200} height={24} className="mb-4" />

            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-sm shadow-sm mb-6 border border-zinc-200"
              >
                <Skeleton width={150} height={22} className="mb-4" />
                <div className="flex items-center mb-4">
                  <Skeleton width={20} height={20} className="mr-2" circle />
                  <Skeleton width={200} height={18} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Skeleton height={64} />
                  <Skeleton height={64} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Skeleton height={64} />
                  <Skeleton height={64} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Skeleton height={64} />
                  <Skeleton height={64} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton height={64} />
                  <Skeleton height={64} />
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Skeleton width={150} height={40} />
            </div>
          </div>

          {/* Booking Summary Skeleton */}
          <div className="lg:w-96 sticky top-6 self-start">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-blue-100">
              <Skeleton width={200} height={24} className="mb-6" />

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <Skeleton width={100} height={18} />
                  <Skeleton width={40} height={18} />
                </div>
                <div className="flex justify-between">
                  <Skeleton width={100} height={18} />
                  <Skeleton width={40} height={18} />
                </div>
                <div className="flex justify-between">
                  <Skeleton width={140} height={18} />
                  <Skeleton width={40} height={18} />
                </div>
                <div className="flex justify-between">
                  <Skeleton width={140} height={18} />
                  <Skeleton width={60} height={18} />
                </div>
              </div>

              <Skeleton height={1} className="my-4" />

              <div className="flex justify-between mb-6">
                <Skeleton width={100} height={20} />
                <Skeleton width={80} height={24} />
              </div>

              <Skeleton width="100%" height={48} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingFormSkeleton;
