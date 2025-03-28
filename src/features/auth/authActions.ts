import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// данные емейл&пароль записываються в форме SignUp
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      console.log("data in signUp slice --- ", userData);
      
      const responce = await axios.post('api/register', userData);
      console.log(" after signUp responce, must be userId - ", responce);
      
      return responce.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// емейл записывается в форме EmailForPassRecovery
export const emailForPassRecovery = createAsyncThunk(
  'auth/emailForPassRecovery',
  async (userData: { email: string; }, thunkAPI) => {
    try {
      console.log("emailForPassRecovery --- ", userData);
      
      const response = await axios.post('api/emailForPassRecovery', userData);

      console.log("reterned from server inside emailForPassRecovery -", response.data);
      
      return response.data; // тут має повернутись id юзера
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// екшн обрабатывающий форму восстановления пароля
export const passwordRecovery = createAsyncThunk(
  "auth/passwordRecovery",
  async (userData: { userId: number; password: string }, thunkAPI) => {
    try {
      console.log("New password from PasswordRecovery:", userData);

      const response = await axios.post("api/passwordRecovery", userData);

      if (response.status !== 200) {
        throw new Error("Failed to update password.");
      }else {
        return response.data; // тут должен вернуться userId с сервера
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update password");
    }
  }
);


// данные емейл&пароль записываються в форме SignIn
export const signInByEmailAndPass = createAsyncThunk(
  'auth/signInByEmailAndPass',
  async (userData: { email: string; password: string }, thunkAPI) => {
    console.log("inside signInByEmailAndPass ", userData);
    
    try {
      const response = await axios.post('api/auth/login', userData);
      // сохраняем токены в хранилище браузера. После перезагрузки страницы данные в этом хранилище не обновляются. Проверить: браузер - инструменты разработчика - Application - Storage - LocalStorage
      // какая будет вложенность респонса?
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)
        console.log("reterned from server inside signInByEmailAndPass, must be user + tokens -", response.data);

      return response.data; // здесь должны быть все данные о юзере
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// асинхронный запрос через аксес токен
export const signInByAccessToken = createAsyncThunk(
    'auth/signInByAccessToken',
    async (accessToken:string, thunkAPI) => {
      try {
        const response = await axios.get('https://dummyjson.com/auth/me', {headers: {
    'Authorization' : `Bearer ${accessToken}`
        }});
        localStorage.setItem("refreshToken", response.data.refreshToken)
        console.log("reterned from server inside signInByAccessToken, must be user ? + tokens ? -", response.data);

        return response.data; // здесь должны быть все данные о юзере
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  // асинхронный запрос через рефреш токен
export const signInByRefreshToken = createAsyncThunk(
  'auth/signInByRefreshToken',
  async (refreshToken:string, thunkAPI) => {
    try {
      const response = await axios.get('api/auth/refresh', {headers: {
  'Authorization' : `Bearer ${refreshToken}`
      }});
      localStorage.setItem("accessToken", response.data.refreshToken)
      return response.data; // здесь должны быть все данные о юзере
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
