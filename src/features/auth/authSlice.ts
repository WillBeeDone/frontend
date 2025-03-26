import { createSlice } from '@reduxjs/toolkit';
import { IAuthState, IUser } from '../../components/types/UserInterfaces';
import { signInByAccessToken, signInByEmailAndPass, signUp } from './authActions';


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
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false
        state.error = ""
        
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.user = initialUser
        state.error = action.payload as string
      })

      // T-O-D-O нужен слайс обрабатывающий форму восстановления пароля

      // запрос отправляющий емейл&пароль и получающий аксес и рефреш токены
      .addCase(signInByEmailAndPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInByEmailAndPass.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload;
      })
      .addCase(signInByEmailAndPass.rejected, (state, action) => {
        state.isLoading = false
        state.user = initialUser
        state.error = action.payload as string
      })


      //запрос из юзЕфекта использующего аксес токен
      .addCase(signInByAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInByAccessToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload;
      })
      .addCase(signInByAccessToken.rejected, (state, action) => {
        state.isLoading = false
        state.user = initialUser
        state.error = action.payload as string
      })







  },
});

export default authSlice;
// export const { } = authSlice.actions