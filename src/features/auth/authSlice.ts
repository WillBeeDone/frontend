import { createSlice } from "@reduxjs/toolkit";
import { IAuthState, IUser } from "../../components/types/UserInterfaces";
import {
  clearAuthError,
  emailForPassRecovery,
  getMyProfileDataByAccessToken,
  myProfile,
  passwordChange,
  passwordRecovery,
  signInByAccessToken,
  signInByEmailAndPass,
  signInByRefreshToken,
  signUp,
} from "./authActions";
import { RootState } from "../../app/store";
import { transformUser } from "../../components/backToFrontTransformData/BackToFrontTransformData";

const initialUser: IUser = {
  id: 0,
  firstName: "",
  secondName: "",
  email: "",
  phone: "",
  location: "",
  profilePicture: "",
  accessToken: "",
  refreshToken: "",
  role: "",
};

const initialState: IAuthState = {
  user: initialUser,
  isLoading: false,
  error: "",
  isAuthenticated: localStorage.getItem("isAuthenticated") || undefined,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    signOut(state) {
      state.user = initialUser;
      state.isAuthenticated = undefined;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // обработка запроса из формы SignUp
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload) {
          state.user.id = action.payload; // зберігаємо userId
        } else {
          state.error = "No user ID returned from server";
        }
        state.error = "";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.error = action.payload as string;
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

      // слайс обрабатывающий форму PasswordRecovery
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

      // запрос отправляющий емейл&пароль и получающий аксес и рефреш токены - форма SignIn
      .addCase(signInByEmailAndPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInByEmailAndPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = transformUser(action.payload);
        console.log(
          "user in slice signInByEmailAndPass after transform ---- ",
          state.user
        );
        localStorage.setItem("selectedCity", state.user.location);

        state.isAuthenticated = "true";
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(signInByEmailAndPass.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.isAuthenticated = undefined;
        localStorage.removeItem("isAuthenticated")
        state.error = action.payload as string;
      })

      //запрос из юзЕфекта использующего аксес токен для входа
      .addCase(signInByAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInByAccessToken.fulfilled, (state) => {
        state.isLoading = false;
        //state.user = action.payload;
        state.isAuthenticated = "true";
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(signInByAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.isAuthenticated = undefined;
      localStorage.removeItem("isAuthenticated")
        state.error = action.payload as string;
      })

      //запрос из юзЕфекта использующего рефреш токен для получения нового аксес токена
      .addCase(signInByRefreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInByRefreshToken.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = "true";
        localStorage.setItem("isAuthenticated", "true");
        //state.user = action.payload;
      })
      .addCase(signInByRefreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.isAuthenticated = undefined;
        localStorage.removeItem("isAuthenticated")
        state.error = action.payload as string;
      })

      // запрос отправляющий отправляющий аксес токен и получающий все данные юзера - кнопка MyProfile
      .addCase(getMyProfileDataByAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProfileDataByAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = transformUser(action.payload);
        console.log(
          "user in slice getMyProfileDataByAccessToken ---- ",
          state.user
        );
        localStorage.setItem("selectedCity", state.user.location);

        state.isAuthenticated = "true";
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(getMyProfileDataByAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.isAuthenticated = undefined;
        localStorage.removeItem("isAuthenticated")
        state.error = action.payload as string;
      })

      // слайс обрабатывающий форму MyProfile
      .addCase(myProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myProfile.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(myProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // слайс обрабатывающий форму PasswordChange
      .addCase(passwordChange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(passwordChange.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(passwordChange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //обработка екшена по очистке ошибки в формах
      .addCase(clearAuthError, (state) => {
        state.error = "";
      });
  },
});

export const { signOut } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState): string | undefined =>
  state.auth.isAuthenticated;
export default authSlice.reducer;
