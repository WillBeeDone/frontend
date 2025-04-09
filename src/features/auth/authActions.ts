import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiClient from './apiClient';

// данные емейл&пароль записываються в форме SignUp
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      console.log("data in signUp slice --- ", userData);
      
      const responce = await axios.post('api/register', userData);
      console.log(" after signUp responce, must be userId - ", responce.data);
      
      return responce.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// емейл записывается в форме EmailForPassRecovery
export const emailForPassRecovery = createAsyncThunk(
  'auth/emailForPassRecovery',
  async (userData: { email: string; }, thunkAPI) => {
    try {
      console.log("emailForPassRecovery --- ", userData);
      
      const response = await axios.post('api/auth/reset', userData);

      console.log("reterned from server inside emailForPassRecovery -", response.data);
      
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// екшн обрабатывающий форму восстановления пароля
export const passwordRecovery = createAsyncThunk(
  "auth/passwordRecovery",
  async ({ password, confirmationCode }: { password: string; confirmationCode: string }, thunkAPI) => {
    try {
      
      const response = await axios.post(`api/auth/reset/${confirmationCode}`, { password });

      if (response.status !== 200) {
        throw new Error("Failed to update password.");
      }
      
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update password");
    }
  }
);


// данные емейл&пароль записываються в форме SignIn
export const signInByEmailAndPass = createAsyncThunk(
  'auth/signInByEmailAndPass',
  async (userData: { email: string; password: string }, thunkAPI) => {
    console.log("inside signInByEmailAndPass ", userData);
    
    try {
      const response = await axios.post('api/auth/login', userData);
      // сохраняем токены в хранилище браузера. После перезагрузки страницы данные в этом хранилище не обновляются. Проверить: браузер - инструменты разработчика - Application - Storage - LocalStorage
      // какая будет вложенность респонса?
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)
        localStorage.setItem("userSelectedCity", response.data.locationDto.cityName);
        console.log("reterned from server inside signInByEmailAndPass, must be user + tokens -", response.data);
        // localStorage.setItem("userSelectedCity", state.user.location);
        // localStorage.removeItem("userSelectedCity");


      return response.data; // здесь должны быть все данные о юзере
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// асинхронный запрос через аксес токен
export const signInByAccessToken = createAsyncThunk(
    'auth/signInByAccessToken',
    async (accessToken:string, thunkAPI) => {
      try {
        console.log(" токены удаляються здесь, signInByAccessToken до запроса на сервер - ", accessToken);
        const response = await axios.post('api/auth/login', {headers: {
    'Authorization' : `Bearer ${accessToken}`
        }});
        console.log(" ответ сервера  после запроса в signInByAccessToken - ", response.data);
        
        //localStorage.setItem("refreshToken", response.data.refreshToken)
        console.log("reterned from server inside signInByAccessToken, must be user ? + tokens ? -", response.data);

        return response.data; // здесь должны быть все данные о юзере
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  // асинхронный запрос через рефреш токен
export const signInByRefreshToken = createAsyncThunk(
  'auth/signInByRefreshToken',
  async (refreshToken:string, thunkAPI) => {
    try {
      const response = await axios.post('api/auth/refresh', {headers: {
  'Authorization' : `Bearer ${refreshToken}`
      }});
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("isAuthenticated", "true")
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//  запрос данных юзера через аксес токен
export const getMyProfileDataByAccessToken = createAsyncThunk(
  'auth/getMyProfileDataByAccessToken',
  async (accessToken:string, thunkAPI) => {
    try {
      const response = await apiClient.get('/api/users', {headers: {
  'Authorization' : `Bearer ${accessToken}`
      }});
        console.log("receive from server in getMyProfileDataByAccessToken, user: ", response.data);

        localStorage.setItem("userSelectedCity", response.data.locationDto.cityName);
       
        
        // const fakeUser = {
        //     "id": 35,
        //     "firstName": "FakeName",
        //     "lastName": "FakeLastName",
        //     "email": "priestvolodya+21@gmail.com",
        //     "phoneNumber": "111111",
        //     "locationDto": {
        //         "cityName": "Berlin"
        //     },
        //     //"profilePicture": "https://imgur.com/diLaoNW",
        //     "profilePicture": "",
        //     "roles": [
        //         {
        //             "id": 1,
        //             "title": "ROLE_USER",
        //             "authority": "ROLE_USER"
        //         }
        //     ],
        //     "active": true,
        //     "blocked": false,
        //     "accessToken": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwcmllc3R2b2xvZHlhKzIxQGdtYWlsLmNvbSIsImV4cCI6MTc0NDEzMjI2MSwicm9sZXMiOlt7ImlkIjoxLCJ0aXRsZSI6IlJPTEVfVVNFUiIsImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwibmFtZSI6InByaWVzdHZvbG9keWErMjFAZ21haWwuY29tIn0.nMpq5ljjygDccK6RKePABa8zMOjp3n_5q7nP6eiVQtjpPm9TBpEZ9G85CQDhxDRZ",
        //     "refreshToken": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwcmllc3R2b2xvZHlhKzIxQGdtYWlsLmNvbSIsImV4cCI6MTc0Nzc2MTA2MX0.4aer_tGF5jBF_dTNa4AL3t3dyHT9DlX3_I8dhzzd_tWL4cCDx8xdjP0klfok4ivx"
        // }

      //   const fakeUserWithoutData = {
      //     "id": 35,
      //     "firstName": "",
      //     "lastName": "",
      //     "email": "priestvolodya+21@gmail.com",
      //     "phoneNumber": "",
      //     "locationDto": {
      //         "cityName": "Berlin"
      //     },
      //     //"profilePicture": "https://imgur.com/diLaoNW",
      //     "profilePicture": "",
      //     "roles": [
      //         {
      //             "id": 1,
      //             "title": "ROLE_USER",
      //             "authority": "ROLE_USER"
      //         }
      //     ],
      //     "active": true,
      //     "blocked": false,
      //     "accessToken": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwcmllc3R2b2xvZHlhKzIxQGdtYWlsLmNvbSIsImV4cCI6MTc0NDEzMjI2MSwicm9sZXMiOlt7ImlkIjoxLCJ0aXRsZSI6IlJPTEVfVVNFUiIsImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwibmFtZSI6InByaWVzdHZvbG9keWErMjFAZ21haWwuY29tIn0.nMpq5ljjygDccK6RKePABa8zMOjp3n_5q7nP6eiVQtjpPm9TBpEZ9G85CQDhxDRZ",
      //     "refreshToken": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwcmllc3R2b2xvZHlhKzIxQGdtYWlsLmNvbSIsImV4cCI6MTc0Nzc2MTA2MX0.4aer_tGF5jBF_dTNa4AL3t3dyHT9DlX3_I8dhzzd_tWL4cCDx8xdjP0klfok4ivx"
      // }

        // console.log(fakeUserWithoutData);
        // console.log(fakeUser);




        //return fakeUser;
      return response.data; // здесь должны быть все данные о юзере
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// все данные записываються в форме MyProfile
// export const myProfile = createAsyncThunk(
//   'auth/myProfile',
//   async (userData: { firstName:string, secondName:string, phone:string, location:string, profilePicture: string, accessToken: string}, thunkAPI) => {
//     try {
//       const {firstName, secondName:lastName, phone: phoneNumber, location, profilePicture, accessToken} = userData;
//       const locationDto = {
//         cityName: location
//       }
    
//       const body = {firstName, lastName, phoneNumber, locationDto, profilePicture};
      
//       console.log("data in myProfile action before send --- ", body);

//       const responce = await axios.put('/api/users', body, {headers: {
//         'Authorization' : `Bearer ${accessToken}`
//             }});

          // if (response.status !== 200) {
          // throw new Error("Failed to update user data.");
          // }
      
//       return responce.status;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const myProfile = createAsyncThunk(
  'auth/myProfile',
  async (userData: { 
    firstName: string; 
    secondName: string; 
    phone: string; 
    location: string; 
    profilePicture: string | File; 
  }, thunkAPI) => {
    try {
      const { firstName, secondName, phone, location, profilePicture } = userData;
      console.log(" inside myProfile after destruct: ", firstName);
        
      const body = new FormData();
      body.append("firstName", firstName);
      console.log(" inside myProfile after append firstName: ", body);
        
      body.append("lastName", secondName);
      body.append("phoneNumber", phone);
      body.append("locationDto.cityName", location );

      if (profilePicture instanceof File) {
        body.append("profilePicture", profilePicture);
      }
      console.log(" ------------------------- inside myProfile before send to server: ", body);
      

      for (const pair of body.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.put('/api/users', body, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to update user data.");
      }

      return response.status;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// екшн обрабатывающий форму изменения пароля
export const passwordChange = createAsyncThunk(
  "auth/passwordChange",
  async ({ currentPassword:oldPassword, newPassword}: { currentPassword: string; newPassword: string; }, thunkAPI) => {
    try {
      const body = {oldPassword,  newPassword};
      
      console.log("data in passwordChange action before send --- ", body);
      const accessToken = localStorage.getItem('accessToken');
      
      const response = await axios.put('/api/auth/change', body, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to change password.");
      }
      
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to change password");
    }
  }
);

export const clearAuthError = createAction('auth/clearError');


// import { signOut} from "./authSlice"

// const apiClient = axios.create();

// // Интерсептор для запросов – добавляет Bearer токен
// apiClient.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// // Интерсептор для ответов – обрабатывает случаи ошибочного ответа, например, когда токен просрочен или недействителен
// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         try {
//           // Предположим, что у вас есть эндпоинт для обновления токена
//           signInByRefreshToken(refreshToken)
//           // Переподставляем новый токен в оригинальный запрос
//           originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           // Если обновление токена не удалось – выходим из системы
//           signOut();
//           return Promise.reject(refreshError);
//         }
//       } else {
//         signOut();
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;









