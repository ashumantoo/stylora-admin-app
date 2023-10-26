import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import { IProductInput, IProductSliceState, PRODUCT_SLICE_TYPE_ENUM, ProductStatus } from "../types/product-types";
import productApi from "../api/product-api";
import { AxiosError } from "axios";

const initialState: IProductSliceState = {
  products: [],
  product: {
    _id: "",
    name: "",
    slug: "",
    description: "",
    maxRetailPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    category: {
      _id: "",
      name: "",
      parentId: "",
      imageUrl: "",
      slug: "",
      subCategories: []
    },
    status: ProductStatus.ACTIVE,
    productImages: [],
    reviews: []
  }
}

export const _createProduct = createAsyncThunk(
  PRODUCT_SLICE_TYPE_ENUM.CREATE_PRODUCT,
  async (product: IProductInput, { rejectWithValue }) => {
    try {
      const response = await productApi.createProduct(product);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _getProducts = createAsyncThunk(
  PRODUCT_SLICE_TYPE_ENUM.GET_PRODUCTS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getProducts();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _getProduct = createAsyncThunk(
  PRODUCT_SLICE_TYPE_ENUM.GET_PRODUCT,
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await productApi.getProduct(productId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _updateProduct = createAsyncThunk(
  PRODUCT_SLICE_TYPE_ENUM.UPDATE_PRODUCT,
  async ({ productId, product }: { productId: string, product: IProductInput }, { rejectWithValue }) => {
    try {
      const response = await productApi.updateProduct(productId, product);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _deleteProduct = createAsyncThunk(
  PRODUCT_SLICE_TYPE_ENUM.DELETE_PRODUCT,
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await productApi.deleteProduct(productId);
      return { data: response.data, productId };
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(_createProduct.fulfilled, (state, action) => {
      if (action.payload && action.payload.product) {
        state.products.push(action.payload?.product);
      }
    });
    builder.addCase(_getProducts.fulfilled, (state, action) => {
      if (action.payload && action.payload.products) {
        state.products = [...action.payload.products];
      }
    });
    builder.addCase(_getProduct.fulfilled, (state, action) => {
      if (action.payload && action.payload.product) {
        state.product = action.payload.product;
      }
    });
    builder.addCase(_updateProduct.fulfilled, (state, action) => {
      if (action.payload?.product) {
        const matchedProductIndex = state.products.findIndex((p) => p._id === action.payload?.product._id);
        state.products[matchedProductIndex] = { ...action.payload.product };
      }
    });
    builder.addCase(_deleteProduct.fulfilled, (state, action) => {
      if (action.payload?.data.success) {
        const filteredProducts = state.products.filter((p) => p._id !== action.payload?.productId);
        if (filteredProducts) {
          state.products = filteredProducts;
        }
      }
    });
  },
});


export default productSlice.reducer;