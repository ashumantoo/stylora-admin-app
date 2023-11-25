import { configureStore, isRejected } from "@reduxjs/toolkit";
import authReducer from './slices/auth-slice';
import categoryReducer from './slices/category-slice';
import productReducer from './slices/product-slice';
import categoryPageReducer from './slices/category-page-slice';
import orderReducer from './slices/order-slice';
import { IAuthState } from "./types/user-types";
import { ICategoryState } from "./types/category-types";
import { IProductState } from "./types/product-types";
import { ICategoryPageState } from "./types/category-page-types";
import { IOrderState } from "./types/order-types";

export interface IAppState {
  authReducer: IAuthState;
  categoryReducer: ICategoryState,
  productReducer: IProductState,
  categoryPageReducer: ICategoryPageState,
  orderReducer: IOrderState
}

const reducers = {
  authReducer,
  categoryReducer,
  productReducer,
  categoryPageReducer,
  orderReducer
}
const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return [
      ({ getState, dispatch }) => {
        return (next) => (action) => {
          const result: unknown = next(action);
          if (isRejected(result) && !result.meta.rejectedWithValue) {
            const error = new Error(
              result.error.message || "Unknown message redux toolkit error"
            );
            if (result.error.name) {
              error.name = result.error.name;
            }
            if (result.error.stack) {
              error.stack = result.error.stack;
            }

            console.error(error);
          }
          return result;
        };
      },
      ...getDefaultMiddleware({
        thunk: {
          extraArgument: {}
        }
      })
    ];
  }
});
export default store;