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
      className="border-b border-gray-200 pb-10"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left mb-8">
        <span className="w-fit text-2xl font-semibold">
          Your Trip at a Glance
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Grouped card */}
        {[
          {
            icon: <MapPin size={24} style={{ color: '#f05e25' }} />,
            title: "Destination",
            value: data?.location,
          },
          {
            icon: <Clock size={24} style={{ color: '#f05e25' }} />,
            title: "Duration",
            value: `${data?.duration} days`,
          },
          {
            icon: <TrendingUp size={24} style={{ color: '#f05e25' }} />,
            title: "Trip Difficulty",
            value: data?.difficulty || "N/A",
          },
          {
            icon: <Activity size={24} style={{ color: '#f05e25' }} />,
            title: "Activities",
            value: data?.activity || "N/A",
          },
          {
            icon: <Icon icon="material-symbols-light:route-outline" width="24" height="24" style={{ color: '#f05e25' }} />,
            title: "Max Elevation",
            value:
              typeof data?.elevation === "number"
                ? `${data.elevation}m`
                : "N/A",
          },
          {
            icon: <Icon icon="solar:users-group-two-rounded-outline" width="24" height="24" style={{ color: '#f05e25' }} />,
            title: "Group Size",
            value: data?.groupSize || "N/A",
          },
          {
            icon: <Bus size={24} style={{ color: '#f05e25' }} />,
            title: "Vehicle",
            value: data?.vehicle || "N/A",
          },
          {
            icon: <Hotel size={24} style={{ color: '#f05e25' }} />,
            title: "Accommodation",
            value: data?.accommodation || "N/A",
          },
          {
            icon: <Utensils size={24} style={{ color: '#f05e25' }} />,
            title: "Meals",
            value: data?.meal || "N/A",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-6 rounded-sm  border-gray-100  transition-all duration-200"
            style={{
              backgroundColor: '#fafafa',
              borderColor: '#f0f0f0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f05e25';
              e.currentTarget.style.backgroundColor = '#fcfcfc';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#f0f0f0';
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
          >
            <div className="shrink-0 mt-1 p-2 rounded-md" style={{ backgroundColor: '#fff' }}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold mb-1" style={{ color: '#3A3A3A' }}>
                {item.title}
              </h3>
              <p className="text-sm font-medium" style={{ color: '#6b7280' }}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripGlance;
