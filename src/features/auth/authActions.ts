import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
        console.log("reterned from server inside signInByEmailAndPass, must be user + tokens -", response.data);

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
        const response = await axios.get('api/auth/login', {headers: {
    'Authorization' : `Bearer ${accessToken}`
        }});
        localStorage.setItem("refreshToken", response.data.refreshToken)
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
      const response = await axios.get('api/auth/refresh', {headers: {
  'Authorization' : `Bearer ${refreshToken}`
      }});
      localStorage.setItem("accessToken", response.data.refreshToken)
      return response.data; // здесь должны быть все данные о юзере
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
      const response = await axios.get('/api/users', {headers: {
  'Authorization' : `Bearer ${accessToken}`
      }});
        console.log("receive from server in getMyProfileDataByAccessToken, user: ", response.data);
        
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
    accessToken: string;
  }, thunkAPI) => {
    try {
      const { firstName, secondName, phone, location, profilePicture, accessToken } = userData;

      const body = new FormData();
      body.append("firstName", firstName);
      body.append("lastName", secondName);
      body.append("phoneNumber", phone);
      body.append("locationDto", JSON.stringify({ cityName: location }));

      if (profilePicture instanceof File) {
        body.append("profilePicture", profilePicture);
      }

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


// екшн обрабатывающий форму тзменения пароля
export const passwordChange = createAsyncThunk(
  "auth/passwordChange",
  async ({ currentPassword, newPassword, accessToken }: { currentPassword: string; newPassword: string; accessToken: string; }, thunkAPI) => {
    try {
      const body = {currentPassword, newPassword};
      
      console.log("data in passwordChange action before send --- ", body);
      
      const response = await axios.put('/api/users', body, {
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