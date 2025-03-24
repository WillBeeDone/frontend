import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signUpAction = createAsyncThunk(
  'auth/signUpAction',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('api/signUp', userData);
      // сохраняем данные в хранилище браузера с ключом token. После перезагрузки страницы данные в этом хранилище не обновляются. Проверить: браузер - инструменты разработчика - Application - Storage - LocalStorage
        localStorage.setItem("accessToken", response.data.accessToken)


      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// новый асинхронный запрос через токен
export const loginToken = createAsyncThunk(
    'auth/loginToken',
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
