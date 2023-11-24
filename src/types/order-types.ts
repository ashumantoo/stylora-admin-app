import { IProduct } from "./product-types";
import { IUser, IUserAddress } from "./user-types";

export interface IOrderState {
  orders: IOrder[];
  order: IOrder;
}

export interface IOrder {
  _id: string;
  user: Partial<IUser>;
  address?: Partial<IUserAddress>,
  totalAmount: number;
  referenceNumber:string;
  items: IOrderItem[];
  paymentType: string;
  paymentStatus: string;
  orderStatus: IOrderStatus[];
}

export interface IOrderItem {
  product: IProduct;
  payableAmount: number;
  purchaseQuantity: number;
}

export interface IOrderStatus {
  status: string;
  date: string;
  isCompleted: boolean;
}

export enum OrderStatusEnum {
  ORDERED = 'ORDERED',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export interface IOrderTable {
  _id: string;
  referenceNumber: string;
  customerName: string;
  totalItems: number;
  totalAmount:number;
  status: string;
  paymentStatus: string;
}

export type GetOrdersApiResponse = {
  success: boolean;
  orders: IOrder[]
}

export type GetOrderApiResponse = {
  success: boolean;
  order: IOrder
}

export enum ORDERS_SLICE_TYPE_ENUM {
  GET_ORDERS = "GET_ORDERS",
  GET_ORDER = "GET_ORDER",
  UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS"
}