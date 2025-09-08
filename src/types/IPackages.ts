import { ISubCategory, ICategory } from "./ICategory";
import { IGallery } from "./IGallery";


export interface ISeasonalTrek {
  _id: string;
  title: string;
  description: string;
  package: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITravelPackage {
  id: string;
  activity?: string;
  groupSize?: string;
  vehicle?: string;
  difficulty?: string;
  accommodation?: string;
  meal?: string;
  seasonalTrek?: ISeasonalTrek[];
  location: string;
  duration: string;
  categoryId: {
    _id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
  };
  subCategoryId: ISubCategory;
  season: string;
  name: string;
  overview: string;
  coverImage: string;
  elevation: number;
  distance: number;
  maxAltitude?: string;
  bestSeasons?: string | string[];
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  additionalInfo?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  attraction: IAttraction[];
  itinerary: IItinerary[];
  faq: IFaq[];
  exclusion: IExclusion[];
  inclusion: IInclusion[];
  requirements: IRequirement[];
  insurance: IInsurance[];
  gearInfo: IGear[];
  whyLoveThisTrek: IWhyLoveThis[];
  importantNotice: IImportantNotice[];
  routeMap: string;
  pax: IPax[];
  gallery: IGallery[];
  fixedDates: IFixedDate[];
  addons: Array<{
    image: string;
    price: number;
    packageId: string;
    description: string;
    name: string;
    _id: string;
  }>;
  slug: string;
  testimonial: Array<{
    _id: string;
    packageId: string;
    fullName: string;
    rating: number;
    sortOrder: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
  createdAt: string;
  updatedAt: string;
  _id: string;
  tag: string; // THIS IS NOT INCLUDED IN BACKEND FOR NOW
}

export interface IPax {
  sortOrder: number;
  _id: string;
  package: string;
  min: number;
  max: number;
  price: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}






export interface IFixedDate {
  package: string,
  startDate: string,
  endDate: string,
  status: string,
  numberOfPerson: number,
  pricePerPerson: number,
  createdAt: string,
  updatedAt: string,
  id: string
  availableSeats: number
}






export interface IFaq {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}

export interface IAttraction {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}

export interface IItinerary {
  _id: string;
  day: string;
  title: string;
  description: string;
  image: string;
  days: string;
  package: string;
  sortOrder: number;
  duration: string;
  maxAltitude: string;
  activity: string;
  meals: string;
  accommodation: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IExclusion {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}

export interface IInclusion {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}

export interface IRequirement {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}

export interface IInsurance {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}

export interface IGear {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}

export interface IWhyLoveThis {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}

export interface IImportantNotice {
  title: string;
  description: string;
  sortOrder: number;
  package: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  image?: string;
}





export interface ITravelPackageResponse {
  status: string;
  results: number;
  total: number;
  page: number;
  pages: number;
  data: ITravelPackage[];
}

export interface IPackageByIdResponse {
  status: string,
  data: ITravelPackage
}

