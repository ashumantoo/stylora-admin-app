import {
  DeleteCategoryApiResponse,
  GetCategoriesPageApiResponse,
  GetCateogryPageApiResponse,
  ICategoryPageInput
} from "../types/category-page-types";
import axios from "../utils/axios";

export default {
  getCategoriesPage: () => axios.get<GetCategoriesPageApiResponse>('/category-page'),
  createCategoryPage: (data: ICategoryPageInput) => axios.post<GetCateogryPageApiResponse>('/category-page', data),
  getCategoryPage: (pageId: string) => axios.get<GetCateogryPageApiResponse>(`/category-page/${pageId}`),
  updateCategoryPage: (pageId: string, data: ICategoryPageInput) => axios.put<GetCateogryPageApiResponse>(`/category-page/${pageId}`, data),
  deleteCategoryPage: (pageId: string) => axios.delete<DeleteCategoryApiResponse>(`/category-page/${pageId}`),
}