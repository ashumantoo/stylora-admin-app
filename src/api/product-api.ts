import { DeleteProductApiResponse, IProductInput, ProductApiResponse, ProductsApiResponse } from "../types/product-types";
import axios from "../utils/axios";


export default {
  getProducts: () => axios.get<ProductsApiResponse>('/product'),
  createProduct: (data: IProductInput) => axios.post<ProductApiResponse>('/product', data),
  getProduct: (productId: string) => axios.get<ProductApiResponse>(`/product/${productId}`),
  updateProduct: (productId: string, data: IProductInput) => axios.put<ProductApiResponse>(`/product/${productId}`, data),
  deleteProduct: (productId: string) => axios.delete<DeleteProductApiResponse>(`/product/${productId}`),
}