"use client";

import { ITravelPackage } from "@/types/IPackages";
import { useQuery } from "@tanstack/react-query";
import { getTripHighlightsByPackageId } from "@/service/packages";

// Helper function to strip HTML tags and decode HTML entities
const stripHtml = (html: string | undefined | null): string => {
  if (!html) return '';

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

interface TripHighlightItem {
  _id: string;
  title?: string;
  description?: string;
  sortOrder: number;
}

const TripHighlight = ({ data }: { data: ITravelPackage | undefined }) => {
  // Fetch trip highlights from the API
  const { data: tripHighlightsData, isLoading } = useQuery({
    queryKey: ["tripHighlights", data?._id],
    queryFn: () => getTripHighlightsByPackageId(data?._id || ""),
    enabled: !!data?._id,
  });

  const tripHighlights = (tripHighlightsData?.data || []) as TripHighlightItem[];

  // Don't render if no data or loading
  if (!data?._id || isLoading || tripHighlights.length === 0) {
    return null;
  }

  // Sort by sortOrder to ensure correct display order
  const sortedHighlights = [...tripHighlights].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div
      id="trip-highlight"
      className="pb-14"
    >
      <h2 className="text-2xl font-semibold text-orange-500 text-left mb-2">
        <span className="flex items-center gap-2">
          <span>Trip Highlights</span>
        </span>
      </h2>
      <p className="text-zinc-800 mt-1 leading-relaxed mb-4">
        Key highlights and features of this journey
      </p>

      <div className="space-y-3">
        {sortedHighlights.map((item, index) => (
          <div
            key={item._id}
            className="flex gap-4 items-start bg-white rounded-sm transition-all duration-200"
          >
            <div className="shrink-0">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-orange-500 text-white font-semibold text-sm">
                {index + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                {stripHtml(item.title)}
              </h3>
              {item.description && (
                <div
                  className="text-zinc-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlight;
