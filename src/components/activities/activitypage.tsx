"use client";

import api from "@/service/api";
import { useEffect, useState } from "react";
import ActivityCard from "./activitycard";
import Divider from "../Divider/Divider";
import { useRouter } from "next/navigation";

function ActivityPage() {
  const [packageData, setPackageData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(3);
  const router = useRouter();
  const fetchPackagebyCategory = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/popular/categories/activities");
      setPackageData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackagebyCategory();
  }, []);

  // Function to show more activities
  const handleShowMore = () => {
    router.push("/package-list/activities");
  };

  return (
    <>
      <div className="pb-12 w-full bg-white">
        <div className="w-full bg-white py-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <ActivityCard
            data={packageData || []}
            isLoading={isLoading}
            number={number}
          />
        </div>
      </div>
      {number < packageData.length && (
        <Divider
          heading="Uncover Nepal’s Top Thrills"
          highlight="Popular Activities Await"
          description="From white-water rafting and jungle safaris to scenic paragliding and cultural tours, Nepal offers an unforgettable blend of adventure and tradition. Explore our most popular experiences crafted for thrill-seekers and curious explorers alike."
          imageUrl="https://plus.unsplash.com/premium_photo-1661889971049-6f0a39a3476f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJhZnRpbmd8ZW58MHx8MHx8fDA%3D"
          buttonText="Explore More Activities"
          onButtonClick={handleShowMore}
          remainingCount={packageData.length - number}
          showButton={true}
        />
      )}
    </>
  );
}

export default ActivityPage;
