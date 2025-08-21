"use client";

import {
  MapPin,
  Clock,
  Activity,
  Mountain,
  Users,
  Bus,
  Hotel,
  Utensils,
  TrendingUp,
} from "lucide-react";
import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react/dist/iconify.js";

const TripGlance = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="trip-glance"
      className="border-b border-gray-200 py-10 bg-orange-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-left mb-12">
          Your Trip at a Glance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <MapPin size={20} className="text-orange-500" />,
              title: "Destination",
              value: data?.location,
            },
            {
              icon: <Clock size={20} className="text-orange-500" />,
              title: "Duration",
              value: `${data?.duration} days`,
            },
            {
              icon: <TrendingUp size={20} className="text-orange-500" />,
              title: "Trip Difficulty",
              value: data?.difficulty || "N/A",
            },
            {
              icon: <Activity size={20} className="text-orange-500" />,
              title: "Activities",
              value: data?.activity || "N/A",
            },
            {
              icon: <Icon icon="material-symbols-light:route-outline" width="20" height="20" className="text-orange-500" />,
              title: "Max Elevation",
              value:
                typeof data?.elevation === "number"
                  ? `${data.elevation}m`
                  : "N/A",
            },
            {
              icon: <Icon icon="solar:users-group-two-rounded-outline" width="20" height="20" className="text-orange-500" />,
              title: "Group Size",
              value: data?.groupSize || "N/A",
            },
            {
              icon: <Bus size={20} className="text-orange-500" />,
              title: "Vehicle",
              value: data?.vehicle || "N/A",
            },
            {
              icon: <Hotel size={20} className="text-orange-500" />,
              title: "Accommodation",
              value: data?.accommodation || "N/A",
            },
            {
              icon: <Utensils size={20} className="text-orange-500" />,
              title: "Meals",
              value: data?.meal || "N/A",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl transition-all duration-300 border border-orange-100"
              style={{ backgroundColor: '#FFEDD4' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/80 rounded-lg">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
              </div>
              <div className="pl-12">
                <p className="text-gray-800 text-2xl font-medium">
                  {item.value || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripGlance;
