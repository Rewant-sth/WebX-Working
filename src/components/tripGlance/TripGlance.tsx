import { ITravelPackage } from "@/types/IPackages";

const TripGlance = ({ data }: { data: ITravelPackage | undefined }) => {
  return (
    <div
      id="trip-glance"
      className="border-b max-w-6xl mx-auto border-gray-200 py-10 "
    >
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-3xl font-bold text-gray-900 text-left mb-12">
          Your Trip at a Glance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              title: "Vehicle",
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
              className="p-4 flex gap-6 rounded-sm transition-all duration-300 border border-orange-100"
            >
              <div className="p-2 size-24  shrink-0 bg-white/80 rounded-sm">
                <img src={item.icon} alt="" />
              </div>
              <div className="flex flex-col  gap-1">
                <h3 className="font-semibold text-xl uppercase text-gray-800">{item.title}</h3>
                <p className="text-gray-700 text-lg font-medium">
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
