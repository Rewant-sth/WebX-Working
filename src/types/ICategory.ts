export interface ICategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  subCategories: ISubCategory[]; // can be empty array
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISubCategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string; // refers to parent category _id
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategoryResponse {
  status: string;
  data: ICategory[];
}
