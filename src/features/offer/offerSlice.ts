
import { createSlice } from '@reduxjs/toolkit';
import { createNewOffer } from './offerActions';
import { IOfferState, IUserOfferPage } from '../../components/types/OfferInterfaces';


const initialOffer:IUserOfferPage ={
    email: '',
    phone: '',
    id: 0,
    firstName: '',
    secondName: '',
    location: '',
    title: '',
    category: '',
    price: 0,
    description: '',
    profilePicture: '',
    gallery: []
}

const initialState: IOfferState = {
  offer: initialOffer,
  isLoading: false,
  error: "",
};

export const offerSlice = createSlice({
  name: 'offerSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // обработка запроса из формы CreateNewOffer
      .addCase(createNewOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOffer.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createNewOffer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    
  },
});

export default offerSlice.reducer;