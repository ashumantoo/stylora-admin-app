import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { CATEGORY_SLICE_TYPE_ENUM, CategoryTypeEnum, ICategory, ICategoryState, ICategoryInput, ISimpleCategory } from "../types/category-types";
import categoryApi from '../api/category-api';
import { AxiosError } from "axios";
import _ from 'lodash';

const initialCategoryState: ICategoryState = {
  allCategories: [],
  categories: [],
  category: {
    _id: "",
    name: "",
    slug: "",
    parentId: "",
    imageUrl: "",
    subCategories: []
  }
}

export const _createCategory = createAsyncThunk(
  CATEGORY_SLICE_TYPE_ENUM.CREATE_CATEGORY,
  async (category: ICategoryInput, { rejectWithValue }) => {
    try {
      const response = await categoryApi.createCategory(category);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _getCategories = createAsyncThunk(
  CATEGORY_SLICE_TYPE_ENUM.GET_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategories();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _getCategory = createAsyncThunk(
  CATEGORY_SLICE_TYPE_ENUM.GET_CATEGORY,
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategory(categoryId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _updateCategory = createAsyncThunk(
  CATEGORY_SLICE_TYPE_ENUM.UPDATE_CATEGORY,
  async ({ categoryId, category }: { categoryId: string, category: ICategoryInput }, { rejectWithValue }) => {
    try {
      const response = await categoryApi.updateCategory(categoryId, category);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _deleteCategory = createAsyncThunk(
  CATEGORY_SLICE_TYPE_ENUM.DELETE_CATEGORY,
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await categoryApi.deleteCategory(categoryId);
      return { data: response.data, categoryId };
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {
    setAllCategories: (state, currentState) => {
      const filteredArray = _.uniqBy(currentState.payload, "_id").map((item: any) => {
        return {
          _id: item._id,
          name: item.name,
          parentId: item.parentId,
          slug: item.slug
        }
      });
      state.allCategories = filteredArray;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(_createCategory.fulfilled, (state, action) => {
      if (action.payload?.category) {
        state.categories.push(action.payload.category);
      }
    });
    builder.addCase(_getCategories.fulfilled, (state, action) => {
      if (action.payload?.categories) {
        state.categories = [...action.payload.categories];
      }
    });
    builder.addCase(_getCategory.fulfilled, (state, action) => {
      if (action.payload?.category) {
        state.category = action.payload.category;
      }
    });
    builder.addCase(_updateCategory.fulfilled, (state, action) => {
      if (action.payload?.category) {
        const matchedCatetoryIndex = state.categories.findIndex((c) => c._id === action.payload?.category._id);
        state.categories[matchedCatetoryIndex] = { ...action.payload.category };
      }
    });
    builder.addCase(_deleteCategory.fulfilled, (state, action) => {
      if (action.payload?.data.success) {
        const filteredCategories = state.categories.filter((c) => c._id !== action.payload?.categoryId);
        if (filteredCategories) {
          state.categories = filteredCategories;
        }
      }
    });
  }
});

export const { setAllCategories } = categorySlice.actions;

export default categorySlice.reducer;