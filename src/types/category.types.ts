export interface ICategoryInitialState {
  allCategories: ISimpleCategory[];
  categories: ICategory[];
  category: ICategory;
}

export interface ISimpleCategory {
  _id: string;
  name: string;
  slug: string;
  parentId: string;
}

export interface ICategoryInput {
  name: string;
  parentId?: string;
  categoryImage?: File;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  parentId: string;
  subCategories: ICategory[];
}

export interface ICategoryApiResponse {
  success: boolean;
  category: ICategory
}

export interface IGetCategoriesApiResponse {
  success: boolean;
  categories: ICategory[]
}

export interface IDeleteCategoryApiResponse {
  success: boolean;
  message: string;
}

export enum CATEGORY_SLICE_TYPE_ENUM {
  CREATE_CATEGORY = "CREATE_CATEGORY",
  GET_CATEGORIES = "GET_CATEGORIES",
  GET_CATEGORY = "GET_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY"
}