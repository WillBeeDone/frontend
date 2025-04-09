import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// все данные записываються в форме CreateNewOffer
export const createNewOffer = createAsyncThunk(
  'auth/createNewOffer',
  async (userData: { 
    title: string,
    price: number, 
    category: string,
    description: string
    gallery: File[]; 
  }, thunkAPI) => {
    try {
      const {  title, price, category, description, gallery} = userData;
      console.log(" inside createNewOffer after destruct: ", category);
        

      const body = new FormData();
      body.append("title", title); 
      body.append("pricePerHour", String(price).concat(".00"));
      body.append("categoryName", category);
      body.append("description", description );
      gallery.forEach((file) => {
        body.append("images", file);
      });
      
      console.log(" ------------------------- inside createNewOffer before send to server: ", body);
      

      for (const pair of body.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.post('/api/users/offers', body, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to create new offer.");
      }

      return response.status;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



// екшн для кнопки активации/деактивации офера
export const activateDeactivateOffer = createAsyncThunk(
  "auth/activateDeactivateOffer",
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
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