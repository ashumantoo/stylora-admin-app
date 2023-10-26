import {
  ICategoryApiResponse,
  ICategoryInput,
  IDeleteCategoryApiResponse,
  IGetCategoriesApiResponse
} from '../types/category-types';
import axios from '../utils/axios';

export default {
  getCategories: () => axios.get<IGetCategoriesApiResponse>('/category'),
  createCategory: (data: ICategoryInput) => axios.post<ICategoryApiResponse>('/category', data),
  getCategory: (categroyId: string) => axios.get<ICategoryApiResponse>(`/category/${categroyId}`),
  updateCategory: (categoryId: string, data: ICategoryInput) => axios.put<ICategoryApiResponse>(`/category/${categoryId}`, data),
  deleteCategory: (categroyId: string) => axios.delete<IDeleteCategoryApiResponse>(`/category/${categroyId}`),
}