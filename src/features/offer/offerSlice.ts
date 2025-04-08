
import { createSlice } from '@reduxjs/toolkit';
import { activateDeactivateOffer, createNewOffer, removeOffer } from './offerActions';
import { IGuestOfferPage, IOfferState } from '../../components/types/OfferInterfaces';


const initialOffer:IGuestOfferPage ={
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

     // обработка запроса по активации/деактивации офера
     .addCase(activateDeactivateOffer.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(activateDeactivateOffer.fulfilled, (state) => {
      state.isLoading = false
    })
    .addCase(activateDeactivateOffer.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    // обработка запроса по удалению офера
    .addCase(removeOffer.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(removeOffer.fulfilled, (state) => {
      state.isLoading = false
    })
    .addCase(removeOffer.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })  












  },
});

export default offerSlice.reducer;