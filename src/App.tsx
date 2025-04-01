import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./components/main/Main";
import NoPage from "./components/noPage/NoPage";
import GuestOfferPage from "./components/offerPage/GuestOfferPage";
import { OffersProvider } from "./context/OffersContext";
import SignUp from "./components/signUp/SignUp";
import SignIn from "./components/signIn/SignIn";
import { FavoritesProvider } from "./context/FavoritesContext";
import ShowFavorites from "./components/showFavorites/ShowFavorites";
import { Provider } from "react-redux";
import { store } from "./app/store";
import PasswordRecovery from "./components/passwordRecovery/PasswordRecovery";
import EmailForPassRecovery from "./components/emailForPassRecovery/EmailForPassRecovery";
import AuthChecker from "./features/auth/AuthChecker";
import ConfirmEmailPage from "./components/confirmEmailPage/ConfirmEmailPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { MyOffersProvider } from "./context/MyOffersContext";
import MyProfile from "./components/myProfile/MyProfile";

function App() {
  const guestRoutes = [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "sign-in-form",
      element: <SignIn />,
    },
    {
      path: "sign-up-form",
      element: <SignUp />,
    },
    {
      path: "offer/:id",
      element: <GuestOfferPage />,
    },
    {
      path: "email-for-password-recovery-form",
      element: <EmailForPassRecovery />,
    },
    {
      path: "password-recovery-form",
      element: <PasswordRecovery />,
    },
    {
      path: "/confirm-email",
      element: <ConfirmEmailPage />,
    },
  ];

  const userRoutes = [
    {
      path: "favorites",
      element: <ShowFavorites />,
    },
    {
      path: "my-profile",
      element: <MyProfile />,
    },
  ];

  return (
    <Provider store={store}>
      <AuthChecker />
      <OffersProvider>
        <MyOffersProvider>
        <FavoritesProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {guestRoutes.map((el, index) => (
                  <Route key={index} path={el.path} element={el.element} />
                ))}

                {userRoutes.map((el, index) => (
                  <Route
                    key={index}
                    path={el.path}
                    element={<ProtectedRoute outlet={el.element} />}
                  />
                ))}
              </Route>

              <Route
                path="/confirm-email/:confirmationCode"
                element={<ConfirmEmailPage />}
              />
              <Route path="/password-recovery-form/:confirmationCode" element={<PasswordRecovery />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </HashRouter>
        </FavoritesProvider>
        </MyOffersProvider>
      </OffersProvider>
    </Provider>
  );
}

export default App;
