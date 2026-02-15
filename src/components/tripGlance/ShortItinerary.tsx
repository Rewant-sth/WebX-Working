import { ITravelPackage } from "@/types/IPackages";

// Helper function to strip HTML tags and decode HTML entities
const stripHtml = (html: string): string => {
  // Remove HTML tags
  const withoutTags = html.replace(/<[^>]*>/g, '');
  // Decode common HTML entities
  const decoded = withoutTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  // Trim extra whitespace
  return decoded.trim();
};

const ShortItinerary = ({ data }: { data: ITravelPackage | undefined }) => {
  // Check if we have regular itinerary data
  const hasItinerary = data?.itinerary && data.itinerary.length > 0;
  
  // Only render if itinerary exists
  if (!hasItinerary) {
    return null;
  }

  // Sort by sortOrder and map to display format (day + title only)
  const sortedItinerary = [...data.itinerary!].sort((a, b) => a.sortOrder - b.sortOrder);
  const displayItems = sortedItinerary.map(item => ({
    id: item._id,
    day: item.days,
    title: stripHtml(item.title)
  }));

  return (
    <div
      id="short-itinerary"
      className="pt-6 pb-14"
    >
      <h2 className="text-2xl font-semibold text-orange-500 text-left mb-2">
        <span className="flex items-center gap-2 mb-4">
          <span>Short Itinerary</span>
        </span>
      </h2>
      {/* <p className="text-base text-zinc-800 mt-1 leading-relaxed mb-4">
        Quick overview of your journey day by day
      </p> */}

      <div className="space-y-2">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 items-center bg-white rounded-sm transition-all duration-200"
          >
            <div className="shrink-0">
              <span className="rounded-sm px-3 bg-orange-500 py-2 text-sm font-semibold text-white font-montserrat w-[75px] inline-block text-center">
                Day {item.day?.toString()?.padStart(2, "0")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[17px] text-zinc-900 font-semibold leading-snug font-montserrat">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortItinerary;
