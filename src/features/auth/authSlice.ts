import { createSlice } from '@reduxjs/toolkit';
import { IAuthState, IUser } from '../../components/types/UserInterfaces';
import { loginToken, signUpAction } from './authActions';


const initialUser:IUser ={
  id: 0,
  firstName: '',
  secondName: '',
  email: '',
  phone: '',
  location: '',
  role: '',
  profilePicture: '',
  accessToken: '',
  refreshToken: ''
}

const initialState: IAuthState = {
  user: initialUser,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // обработка запроса из формы
      .addCase(signUpAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload;
      })
      .addCase(signUpAction.rejected, (state, action) => {
        state.isLoading = false
        state.user = initialUser
        state.error = action.payload as string
      })

      //запрос из юзЕфекта использующего токен
      .addCase(loginToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload;
      })
      .addCase(loginToken.rejected, (state, action) => {
        state.isLoading = false
        state.user = initialUser
        state.error = action.payload as string
      })







  },
});

export default authSlice;
// export const { } = authSlice.actions