import { configureStore, isRejected } from "@reduxjs/toolkit";
import authReducer from './slices/auth-slice';
import categoryReducer from './slices/category-slice';

const reducers = {
  authReducer,
  categoryReducer
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