import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { signInByAccessToken, signInByRefreshToken } from "../../features/auth/authActions";
import { signOut } from "./authSlice";

const AuthChecker = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken) {
        try {
          await dispatch(signInByAccessToken(accessToken)).unwrap();
          return; // если успешно - авторизация
        } catch {
          console.warn("Access token expired, trying refresh...");
        }
      }

      if (refreshToken) {
        try {
          const response = await dispatch(signInByRefreshToken(refreshToken)).unwrap();
          const data = await response.json();
          localStorage.setItem("accessToken", data.accessToken);
          return; 
        } catch {
            console.warn("Refresh token also expired, logging out...");
        }
      }

      // если оба токена протухли - удаляем, инициализируем выход
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(signOut())
    };

    checkAuth();
  }, [dispatch]);

  return null;
};

export default AuthChecker;