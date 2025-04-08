import axios from "axios";
import { signInByRefreshToken } from "./authActions";
import { signOut } from "./authSlice";


const apiClient = axios.create();

// Интерсептор для запросов – добавляет Bearer токен
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Интерсептор для ответов – обрабатывает случаи ошибочного ответа, например, когда токен просрочен или недействителен
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Предположим, что у вас есть эндпоинт для обновления токена
          signInByRefreshToken(refreshToken)
          // Переподставляем новый токен в оригинальный запрос
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Если обновление токена не удалось – выходим из системы
          signOut();
          return Promise.reject(refreshError);
        }
      } else {
        signOut();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;