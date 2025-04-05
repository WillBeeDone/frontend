import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// все данные записываються в форме CreateNewOffer
export const createNewOffer = createAsyncThunk(
  'auth/createNewOffer',
  async (offerData: { accessToken: string, title: string, price: number, category: string, description: string, gallery: string[]}, thunkAPI) => {
    try {
      console.log("data in signUp slice --- ", offerData);
      
      const responce = await axios.post('/api/create-new-offer', offerData);
      
      return responce.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
