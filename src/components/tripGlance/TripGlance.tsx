import { ITravelPackage } from "@/types/IPackages";

const TripGlance = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="trip-glance"
      className="pb-14 "
    >
      <div className=" mx-auto ">
        <h2 className="text-2xl font-bold text-orange-500 text-left mb-6">
          Your Trip at a Glance
        </h2>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2  sm:gap-3">
          {[
            {
              icon: "/icons/destination.png",
              title: "Destination",
              value: data?.location,
            },
            {
              icon: "/icons/time.png",
              title: "Duration",
              value: `${data?.duration} days`,
            },
            {
              icon: "/icons/speedometer.png",
              title: "Trip Difficulty",
              value: data?.difficulty || "N/A",
            },
            {
              icon: "/icons/jogging.png",
              title: "Activities",
              value: data?.activity || "N/A",
            },
            {
              icon: "/icons/mountain.png",
              title: "Max Elevation",
              value:
                typeof data?.elevation === "number"
                  ? `${data.elevation} Meters`
                  : "N/A",
            },
            {
              icon: "/icons/group.png",
              title: "Group Size",
              value: data?.groupSize ? data.groupSize + " Peoples" : "N/A",
            },
            {
              icon: "/icons/bus-school.png",
              title: "Transportation",
              value: data?.vehicle || "N/A",
            },
            {
              icon: "/icons/mansion.png",
              title: "Accommodation",
              value: data?.accommodation || "N/A",
            },
            {
              icon: "/icons/bibimbap.png",
              title: "Meals",
              value: data?.meal || "N/A",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-2 xl:p-4 flex gap-3 xl:gap-4 rounded-sm transition-all duration-300 border border-orange-100"
            >
              <div className="p-2 size-9 sm:size-12  shrink-0 bg-white/80 rounded-sm">
                <img src={item.icon} alt="Real Himalaya" className="" />
              </div>
              <div className="flex flex-col  gap-1">
                <h3 className="font-semibold  capitalize text-zinc-800">{item.title}</h3>
                <p className="text-zinc-700 text-xs sm:text-base line-clamp-2 ">
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
