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
  attraction: any[];
  itinerary: any[];
  faq: any[];
  exclusion: any[];
  inclusion: any[];
  requirements: any[];
  routeMap: string;
  sortOrder: number;
  pax: any[];
  gallery: string[];
  fixedDates: { startDate: string; endDate: string }[];
  addons: any[];
  slug: string;
  testimonial: any[];
}
