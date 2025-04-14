import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "./apiClient";

// данные емейл&пароль записываються в форме SignUp
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const responce = await axios.post("api/register", userData);

      return responce.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// емейл записывается в форме EmailForPassRecovery
export const emailForPassRecovery = createAsyncThunk(
  "auth/emailForPassRecovery",
  async (userData: { email: string }, thunkAPI) => {
    try {
      const response = await axios.post("api/auth/reset", userData);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// екшн обрабатывающий форму восстановления пароля
export const passwordRecovery = createAsyncThunk(
  "auth/passwordRecovery",
  async (
    {
      password,
      confirmationCode,
    }: { password: string; confirmationCode: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`api/auth/reset/${confirmationCode}`, {
        password,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update password.");
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update password"
      );
    }
  }
);

// данные емейл&пароль записываються в форме SignIn
export const signInByEmailAndPass = createAsyncThunk(
  "auth/signInByEmailAndPass",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("api/auth/login", userData);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      if (response.data.locationDto?.cityName) {
        localStorage.setItem(
          "userSelectedCity",
          response.data.locationDto.cityName
        );
      } else {
        localStorage.setItem("userSelectedCity", "all");
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// асинхронный запрос через аксес токен
export const signInByAccessToken = createAsyncThunk(
  "auth/signInByAccessToken",
  async (accessToken: string, thunkAPI) => {
    try {
      const response = await axios.post("api/auth/login", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// асинхронный запрос через рефреш токен
export const signInByRefreshToken = createAsyncThunk(
  "auth/signInByRefreshToken",
  async (refreshToken: string, thunkAPI) => {
    try {
      const response = await axios.post("api/auth/refresh", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("isAuthenticated", "true");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//  запрос данных юзера через аксес токен
export const getMyProfileDataByAccessToken = createAsyncThunk(
  "auth/getMyProfileDataByAccessToken",
  async () => {
    try {
      const response = await apiClient.get("/api/users");

      if (response.data.locationDto?.cityName) {
        localStorage.setItem(
          "userSelectedCity",
          response.data.locationDto.cityName
        );
      } else {
        localStorage.setItem("userSelectedCity", "all");
      }
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
);

export const myProfile = createAsyncThunk(
  "auth/myProfile",
  async (
    userData: {
      firstName: string;
      secondName: string;
      phone: string;
      location: string;
      profilePicture: string | File;
    },
    thunkAPI
  ) => {
    try {
      const { firstName, secondName, phone, location, profilePicture } =
        userData;
      const body = new FormData();
      body.append("firstName", firstName);
      body.append("lastName", secondName);
      body.append("phoneNumber", phone);
      body.append("locationDto.cityName", location);

      if (profilePicture instanceof File) {
        body.append("profilePicture", profilePicture);
      }

      // технический код для обзора содержимого request
      // for (const pair of body.entries()) {
      //   console.log(`${pair[0]}:`, pair[1]);
      // }

      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put("/api/users", body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to update user data.");
      }

      return response.status;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// екшн обрабатывающий форму изменения пароля
export const passwordChange = createAsyncThunk(
  "auth/passwordChange",
  async (
    {
      currentPassword: oldPassword,
      newPassword,
    }: { currentPassword: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      const body = { oldPassword, newPassword };
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put("/api/auth/change", body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to change password.");
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to change password"
      );
    }
  }
);

export const clearAuthError = createAction("auth/clearError");
