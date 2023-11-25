import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrderState, ORDERS_SLICE_TYPE_ENUM } from "../types/order-types";
import orderApi from "../api/order-api";
import { AxiosError } from "axios";

const orderInitialState: IOrderState = {
  orders: [],
  order: {
    _id: "",
    paymentStatus: "",
    paymentType: "",
    totalAmount: 0,
    referenceNumber: '',
    items: [],
    orderStatus: [],
    user: {
      _id: "",
      firstName: "",
      lastName: ""
    }
  }
}

export const _getOrders = createAsyncThunk(
  ORDERS_SLICE_TYPE_ENUM.GET_ORDERS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrders();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _getOrder = createAsyncThunk(
  ORDERS_SLICE_TYPE_ENUM.GET_ORDER,
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrder(orderId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _updateOrderStatus = createAsyncThunk(
  ORDERS_SLICE_TYPE_ENUM.UPDATE_ORDER_STATUS,
  async ({ orderId, payload }: { orderId: string, payload: { status: string } }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateOrderStatus(orderId, payload);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_getOrders.fulfilled, (state, action) => {
      if (action && action.payload?.orders) {
        state.orders = action.payload.orders;
      }
    })
    builder.addCase(_getOrder.fulfilled, (state, action) => {
      if (action && action.payload?.order) {
        state.order = action.payload.order;
      }
    })
    builder.addCase(_updateOrderStatus.fulfilled, (state, action) => {
      if (action && action.payload?.order) {
        const matchedOrderIndex = state.orders.findIndex((o) => o._id === action.payload?.order._id);
        state.orders[matchedOrderIndex] = { ...action.payload.order };
      }
    })
  }
});

export default orderSlice.reducer;