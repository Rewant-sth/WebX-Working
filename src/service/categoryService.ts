import api from "./api";
import { Category } from "../types/Type";
import { SubCategory } from './../types/Type';
import { ITravelPackage, ITravelPackageResponse } from "@/types/IPackages";



interface CategoryResponse {
  status: string;
  data: Category[];

}


export const getCategories = async () => {
  try {
    const response = await api.get("/category");
    return response.data as CategoryResponse;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const getCategoryById = async (id: string) => {
  try {
    const response = await api.get(`/api/v1/category/${id}`);
    return response.data as Category;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};


export const getSubCategoryById = async (id: string) => {
  try {
    const response = await api.get(`/api/v1/subcategory/${id}`);
    return response.data as SubCategory;
  } catch (error) {
    console.error("Error fetching subcategory by ID:", error);
    throw error;
  }
};



export const getSubCategories = async () => {
  try {
    const response = await api.get("/api/v1/subcategory");
    return response.data as SubCategory[];
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

export const getSubCategoriesByCategoryId = async (categoryId: string) => {
  try {
    const response = await api.get(`/api/v1/subcategory?category=${categoryId}`);
    return response.data as SubCategory[];
  } catch (error) {
    console.error("Error fetching subcategories by category ID:", error);
    throw error;
  }
};



export const getSubCategoriesBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/api/v1/subcategory?slug=${slug}`);
    return response.data as SubCategory[];
  } catch (error) {
    console.error("Error fetching subcategories by slug:", error);
    throw error;
  }
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/api/v1/category?slug=${slug}`);
    return response.data as Category;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    throw error;
  }
};


export const getSubCategoryBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/api/v1/subcategory?slug=${slug}`);
    return response.data as SubCategory;
  } catch (error) {
    console.error("Error fetching subcategory by slug:", error);
    throw error;
  }
};

export const getSubCategoryByCategoryId = async (categoryId: string) => {
  try {
    const response = await api.get(`/api/v1/subcategory?category=${categoryId}`);
    return response.data as SubCategory[];
  } catch (error) {
    console.error("Error fetching subcategories by category ID:", error);
    throw error;
  }
};

export const getSubCategoryByCategorySlug = async (categorySlug: string) => {
  try {
    const response = await api.get(`/api/v1/subcategory?category=${categorySlug}`);
    return response.data as SubCategory[];
  } catch (error) {
    console.error("Error fetching subcategories by category slug:", error);
    throw error;
  }
};
export const getSubCategoryByCategoryName = async (categoryName: string) => {
  try {
    const response = await api.get(`/api/v1/subcategory?category=${categoryName}`);
    return response.data as SubCategory[];
  } catch (error) {
    console.error("Error fetching subcategories by category name:", error);
    throw error;
  }
};

export const getSubCategoryByCategoryIdAndSlug = async (categoryId: string, slug: string) => {
  try {
    const response = await api.get(`/api/v1/subcategory?category=${categoryId}&slug=${slug}`);
    return response.data as SubCategory[];
  } catch (error) {
    console.error("Error fetching subcategories by category ID and slug:", error);
    throw error;
  }
};


export async function fnGetSubpackageById(id: string): Promise<ITravelPackageResponse> {

  const res = await api.get(`package/subcategory/${id}`);
  return res.data
}