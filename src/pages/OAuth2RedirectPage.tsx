import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/dashboard"); // перенаправляем, например, на дашборд
    } else {
      navigate("/login"); // если токенов нет
    }
  }, [navigate]);

  return <p>Авторизация через Google... Пожалуйста, подождите.</p>;
};

export default OAuth2RedirectPage;
