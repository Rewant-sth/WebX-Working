import { ITravelPackage } from "@/types/IPackages";
import { Icon } from "@iconify/react";

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
  // Check if we have shortItinerary data from API
  const hasShortItinerary = data?.shortItinerary && data.shortItinerary.length > 0;
  
  // Check if we have regular itinerary to generate from
  const hasItinerary = data?.itinerary && data.itinerary.length > 0;
  
  // If neither exists, don't render
  if (!hasShortItinerary && !hasItinerary) {
    return null;
  }

  // Use shortItinerary if available, otherwise generate from itinerary
  let displayItems: Array<{ id: string; title: string }> = [];
  
  if (hasShortItinerary) {
    // Sort by sortOrder to ensure correct display order
    const sortedItinerary = [...data.shortItinerary!].sort((a, b) => a.sortOrder - b.sortOrder);
    displayItems = sortedItinerary.map(item => ({
      id: item._id,
      title: stripHtml(item.title)
    }));
  } else if (hasItinerary) {
    // Generate short itinerary from detailed itinerary
    const sortedItinerary = [...data.itinerary!].sort((a, b) => a.sortOrder - b.sortOrder);
    displayItems = sortedItinerary.map(item => ({
      id: item._id,
      title: stripHtml(item.title)
    }));
  }

  return (
    <div
      id="short-itinerary"
      className="pt-6 pb-14"
    >
      <h2 className="text-2xl font-semibold text-orange-500 text-left mb-2">
        <span className="flex items-center gap-2">
          <span>Short Itinerary</span>
        </span>
      </h2>
      <p className="text-zinc-800 mt-1 leading-relaxed mb-4">
        Quick overview of your journey day by day
      </p>

      <div className="space-y-3">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-start bg-white rounded-sm transition-all duration-200"
          >
            <div className="shrink-0">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-white">
                <Icon icon="mdi:square" className="size-4 text-orange-500 rotate-45" />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-zinc-800 font-semibold text-lg leading-relaxed">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortItinerary;
