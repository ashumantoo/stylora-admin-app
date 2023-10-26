import { ICategory } from "./category-types";
import { IUser } from "./user-types";

export interface IProductSliceState {
  products: IProduct[];
  product: IProduct;
}

export interface IProductInput {
  name: string;
  description: string;
  maxRetailPrice: number | string;
  sellingPrice: number | string;
  quantity: number;
  category: string | ICategory;
  status: ProductStatus;
  productImages: string[];
}

export interface IProduct extends IProductInput {
  _id: string;
  slug: string;
  reviews: IReview[];
}

export interface IReview {
  user: IUser;
  review: string;
}

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE"
}

export type ProductApiResponse = {
  success: boolean;
  product: IProduct;
}

export type ProductsApiResponse = {
  success: boolean;
  products: IProduct[];
}

export type DeleteProductApiResponse = {
  success: boolean;
  message: string;
}

export enum PRODUCT_SLICE_TYPE_ENUM {
  CREATE_PRODUCT = "CREATE_PRODUCT",
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_PRODUCT = "GET_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT"
}