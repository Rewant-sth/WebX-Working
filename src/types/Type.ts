export type SubCategory = {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Category = {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  subCategories: SubCategory[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};