export interface ITravelSubCategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  slug: string;
  createdAt: string; // ISO string format; can use Date if you plan to parse it
  updatedAt: string;
  __v: number;
}

export interface ITravelSubCategoryResponse {
  status: "success" | "error";
  data: ITravelSubCategory[];
}
