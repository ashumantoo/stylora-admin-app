import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CATEGORIES_PAGE_SLICE_TYPE_ENUM, ICategoryPageInput, ICategoryPageState } from "../types/category-page-types";
import { Roles } from "../types/user-types";
import categoryPageApi from "../api/category-page-api";
import { AxiosError } from "axios";

const categoryPageInitialData: ICategoryPageState = {
  categoriesPage: [],
  categoryPage: {
    _id: "",
    title: "",
    description: "",
    category: {
      _id: "",
      name: "",
      slug: "",
      type: "",
      parentId: "",
      imageUrl: "",
      subCategories: []
    },
    banners: [],
    products: [],
    createdBy: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      role: Roles.ADMIN,
      address: {
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
      }
    }
  }
}


export const _createCategoryPage = createAsyncThunk(
  CATEGORIES_PAGE_SLICE_TYPE_ENUM.CREATE_CATEGORY_PAGE,
  async (categoryPage: ICategoryPageInput, { rejectWithValue }) => {
    try {
      const response = await categoryPageApi.createCategoryPage(categoryPage);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _getCategoriesPage = createAsyncThunk(
  CATEGORIES_PAGE_SLICE_TYPE_ENUM.GET_CATEGORIES_PAGE,
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryPageApi.getCategoriesPage();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _getCategoryPage = createAsyncThunk(
  CATEGORIES_PAGE_SLICE_TYPE_ENUM.GET_CATEGORY_PAGE,
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await categoryPageApi.getCategoryPage(pageId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _updateCategoryPage = createAsyncThunk(
  CATEGORIES_PAGE_SLICE_TYPE_ENUM.UPDATE_CATEGORY_PAGE,
  async ({ pageId, categoryPage }: { pageId: string, categoryPage: ICategoryPageInput }, { rejectWithValue }) => {
    try {
      const response = await categoryPageApi.updateCategoryPage(pageId, categoryPage);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _deleteCategoryPage = createAsyncThunk(
  CATEGORIES_PAGE_SLICE_TYPE_ENUM.DELETE_CATEGORY_PAGE,
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await categoryPageApi.deleteCategoryPage(pageId);
      return { data: response.data, pageId };
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)


const categoryPageSlice = createSlice({
  name: "categoryPage",
  initialState: categoryPageInitialData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_createCategoryPage.fulfilled, (state, action) => {
      if (action.payload && action.payload.categoryPage) {
        state.categoriesPage.push(action.payload.categoryPage);
      }
    })
    builder.addCase(_getCategoriesPage.fulfilled, (state, action) => {
      if (action.payload && action.payload.categoriesPage) {
        state.categoriesPage = action.payload.categoriesPage;
      }
    })
    builder.addCase(_getCategoryPage.fulfilled, (state, action) => {
      if (action.payload && action.payload.categoryPage) {
        state.categoryPage = action.payload.categoryPage;
      }
    });
    builder.addCase(_updateCategoryPage.fulfilled, (state, action) => {
      if (action.payload?.categoryPage) {
        const matchedProductIndex = state.categoriesPage.findIndex((p) => p._id === action.payload?.categoryPage._id);
        state.categoriesPage[matchedProductIndex] = { ...action.payload.categoryPage };
      }
    });
    builder.addCase(_deleteCategoryPage.fulfilled, (state, action) => {
      if (action.payload?.data.success) {
        const filteredProducts = state.categoriesPage.filter((p) => p._id !== action.payload?.pageId);
        if (filteredProducts) {
          state.categoriesPage = filteredProducts;
        }
      }
    });
  }
});

export default categoryPageSlice.reducer;