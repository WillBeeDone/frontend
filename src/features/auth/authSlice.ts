import { createSlice } from '@reduxjs/toolkit';
import { IAuthState, IUser } from '../../components/types/UserInterfaces';
import { emailForPassRecovery, passwordRecovery, signInByAccessToken, signInByEmailAndPass, signUp } from './authActions';


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
    // обработка запроса из формы SignUp
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

      //  обработка запроса из формы EmailForPassRecovery
      .addCase(emailForPassRecovery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emailForPassRecovery.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user.id = action.payload; // зберігаємо userId
        } else {
          state.error = "No user ID returned from server";
        }
      })
      .addCase(emailForPassRecovery.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.error = action.payload as string;
      })
      
      // слайс обрабатывающий форму восстановления пароля
      .addCase(passwordRecovery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(passwordRecovery.fulfilled, (state) => {
        state.isLoading = false;
        state.user = initialUser; 
      })
      .addCase(passwordRecovery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

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