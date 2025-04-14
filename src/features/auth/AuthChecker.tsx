import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { getMyProfileDataByAccessToken } from "../../features/auth/authActions";
import { selectIsAuthenticated } from "./authSlice";
import { useAppSelector } from "../../app/hooks";

const AuthChecker = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        dispatch(getMyProfileDataByAccessToken());
      }
    }
  }, [dispatch]);

  return null;
};

export default AuthChecker;
