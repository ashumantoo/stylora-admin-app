import { GetOrderApiResponse, GetOrdersApiResponse } from "../types/order-types";
import axios from "../utils/axios";

export default {
  getOrders: () => axios.get<GetOrdersApiResponse>('/order'),
  getOrder: (orderId: string) => axios.get<GetOrderApiResponse>(`/order/${orderId}`),
  updateOrderStatus: (orderId: string, payload: { status: string }) => axios.put<GetOrderApiResponse>(`/order/${orderId}`, payload)
}