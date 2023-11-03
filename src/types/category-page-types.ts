import { ICategory } from "./category-types";
import { IUser } from "./user-types";

export interface ICategoryPageState {
  categoriesPage: ICategoryPage[];
  categoryPage: ICategoryPage;
}

export interface ICategoryPageInput {
  title: string;
  description: string;
  banners: IPageContent[];
  products: IPageContent[];
  category: string | ICategory;
}

export interface IPageContent {
  imgUrl: string;
  navigateTo: string
}

export interface ICategoryPage extends ICategoryPageInput {
  _id: string;
  createdBy: string | IUser;
}

export interface ICategoryPageTableColumn {
  _id: string;
  title: string;
  category: string;
  productImages: number;
  bannerImages: number;
  createdBy: string;
}

export type GetCateogryPageApiResponse = {
  success: boolean;
  categoryPage: ICategoryPage
}

export type GetCategoriesPageApiResponse = {
  success: boolean;
  categoriesPage: ICategoryPage[];
}

export type DeleteCategoryApiResponse = {
  success: boolean;
  message: string;
}

export enum CATEGORIES_PAGE_SLICE_TYPE_ENUM {
  CREATE_CATEGORY_PAGE = "CREATE_CATEGORY_PAGE",
  GET_CATEGORIES_PAGE = "GET_CATEGORIES_PAGE",
  GET_CATEGORY_PAGE = "GET_CATEGORY_PAGE",
  UPDATE_CATEGORY_PAGE = "UPDATE_CATEGORY_PAGE",
  DELETE_CATEGORY_PAGE = "DELETE_CATEGORY_PAGE"
}