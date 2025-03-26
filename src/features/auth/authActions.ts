import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// данные емейл&пароль записываються в форме SignUp
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      console.log("data in signUp slice --- ", userData);
      
      await axios.post('api/signUp', userData);
      return null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// T-O-D-O нужен екшн обрабатывающий форму восстановления пароля

// данные емейл&пароль записываються в форме SignIn
export const signInByEmailAndPass = createAsyncThunk(
  'auth/signInByEmailAndPass',
  async (userData: { email: string; password: string }, thunkAPI) => {
    console.log("inside signInByEmailAndPass ", userData);
    
    try {
      const response = await axios.post('api/signIn', userData);
      // сохраняем токены в хранилище браузера. После перезагрузки страницы данные в этом хранилище не обновляются. Проверить: браузер - инструменты разработчика - Application - Storage - LocalStorage
      // какая будет вложенность респонса?
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// новый асинхронный запрос через токен
export const signInByAccessToken = createAsyncThunk(
    'auth/signInByAccessToken',
    async (token:string, thunkAPI) => {
      try {
        const response = await axios.get('https://dummyjson.com/auth/me', {headers: {
    'Authorization' : `Bearer ${token}`
        }});
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
