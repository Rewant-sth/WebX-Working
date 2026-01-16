export interface IHomePackage {
  _id: string;
  isPopular: boolean;
  addToHome: boolean;
  location: string;
  duration: string;
  categoryId: {
    name: string;
    slug: string;
    image: string;
  };
  subCategoryId: {
    _id: string;
    name: string;
    slug: string;
  };
  season: string;
  name: string;
  overview: string;
  coverImage: string;
  elevation: number;
  distance: number;
  attraction: Array<{ title: string; description: string; sortOrder: number; _id: string }>;
  itinerary: Array<{ day: string; title: string; description: string; sortOrder: number; _id: string }>;
  faq: Array<{ title: string; description: string; sortOrder: number; _id: string }>;
  exclusion: Array<{ title: string; description: string; sortOrder: number; _id: string }>;
  inclusion: Array<{ title: string; description: string; sortOrder: number; _id: string }>;
  requirements: Array<{ title: string; description: string; sortOrder: number; _id: string }>;
  routeMap: string;
  sortOrder: number;
  pax: Array<{ _id: string; min: number; max: number; discount: number; sortOrder: number }>;
  gallery: string[];
  fixedDates: { startDate: string; endDate: string }[];
  addons: Array<{ _id: string; name: string; price: number; description: string }>;
  slug: string;
  testimonial: Array<{ _id: string; fullName: string; rating: number; comment: string }>;
}
