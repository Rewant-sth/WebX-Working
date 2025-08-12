import { ITravelPackage } from "@/types/IPackages";
import Link from "next/link";

// Event Card Component
export const EventCard: React.FC<{
  event: ITravelPackage;
  onClose: () => void;
}> = ({ event, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link href={`/itinerary/${event._id}`} onClick={onClose}>
      <div className="rounded-xl overflow-hidden transition-shadow duration-75">
        <div className="md:flex">
          <div className="md:w-1/3 h-64 overflow-hidden">
            <img
              src={event.coverImage || "/webp/8_converted_8_11zon.webp"}
              alt={event.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              width={300}
              height={300}
            />
          </div>
          <div className="p-8 md:w-2/3">
            <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
            <p
              className="text-gray-600 mb-4 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: event.overview }}
            />
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                <span className="font-bold">When:</span>{" "}
                {formatDate(event?.fixedDates?.[0]?.startDate)} -{" "}
                {formatDate(event?.fixedDates?.[0]?.endDate)}
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <span className="font-bold">Difficulty:</span> Moderate
              </div>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                <span className="font-bold">Group Size:</span>
                {event?.pax?.[0]?.min} - {event?.pax?.[0]?.max}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-blue-600">
                  ${event?.fixedDates?.[0]?.pricePerPerson}
                </span>
                <span className="text-gray-500 ml-2">per person</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm font-medium transition-colors duration-75">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};