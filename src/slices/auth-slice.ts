import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/auth-api";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const initialAuthState = {
  user: {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: ""
  },
  token: "",
  authenticated: false,
};

enum AuthActionEnum {
  ADMIN_SIGNIN = "ADMIN_SIGNIN",
  ADMIN_SIGNUP = "ADMIN_SIGNUP"
}

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

interface IAdminUserInput {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  password: string
}

export const adminSignUp = createAsyncThunk(
  AuthActionEnum.ADMIN_SIGNUP,
  async (adminUser: IAdminUserInput, { rejectWithValue }) => {
    try {
      const response = await authApi.adminSignUp(adminUser);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

export const adminSignIn = createAsyncThunk(
  AuthActionEnum.ADMIN_SIGNIN,
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.adminSignin({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthState: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token) {
        state.token = token;
      }
      if (user) {
        state.user = JSON.parse(user);
        state.authenticated = true;
      }
    },
    signout: (state) => {
      localStorage.clear();
      state.user = {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        password: ""
      };
      state.token = "";
      state.authenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(adminSignIn.fulfilled, (state, action) => {
      state.user = { ...action.payload.user };
      state.token = action.payload.token;
      state.authenticated = true;
    });
    builder.addCase(adminSignUp.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
    });
  }
});

export const { setAuthState, signout } = authSlice.actions;

export default authSlice.reducer;

