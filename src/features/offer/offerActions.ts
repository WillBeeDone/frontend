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


// екшн для кнопки активации/деактивации офера
export const activateDeactivateOffer = createAsyncThunk(
  "auth/activateDeactivateOffer",
  async ({ id, accessToken }: { id: number; accessToken: string; }, thunkAPI) => {
    try {
    
      const response = await axios.put(`api/users/offers/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (response.status !== 200) {
        throw new Error("Failed to change offer status.");
      }
      
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// екшн для кнопки удаления офера
export const removeOffer = createAsyncThunk(
  "auth/removeOffer",
  async ({ id, accessToken }: { id: number; accessToken: string; }, thunkAPI) => {
    try {
    
      const response = await axios.delete(`api/users/offers/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (response.status !== 200) {
        throw new Error("Failed to remove offer.");
      }
      
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);