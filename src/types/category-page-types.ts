import { ICategory } from "./category-types";
import { IUser } from "./user-types";

export interface ICategoryPageInput {
  title: string;
  description: string;
  banners: IPageContent[];
  products: IPageContent[];
  category: string | ICategory;
  createdBy: string | IUser;
}

export interface IPageContent {
  imgUrl: string;
  navigateTo: string
}

export interface ICategoryPage extends ICategoryPageInput {
  _id: string
}