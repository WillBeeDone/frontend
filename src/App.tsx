import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./components/main/Main";
import NoPage from "./components/noPage/NoPage";
import GuestOfferPage from "./components/offerPage/GuestOfferPage";
import { OffersProvider } from "./components/context/OffersContext";
import SignUp from "./components/signUp/SignUp";
import SignIn from "./components/signIn/SignIn";
import { FavoritesProvider } from "./components/context/FavoritesContext";
import ShowFavorites from "./components/showFavorites/ShowFavorites";
import { Provider } from "react-redux";
import { store } from "./app/store";
import PasswordRecovery from "./components/passwordRecovery/PasswordRecovery";
import EmailForPassRecovery from "./components/emailForPassRecovery/EmailForPassRecovery";
import AuthChecker from "./features/auth/AuthChecker";
import ConfirmEmailPage from "./components/confirmEmailPage/ConfirmEmailPage";

function App() {
  return (
    <Provider store={store}>
    <AuthChecker/>
      <OffersProvider>
        <FavoritesProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Main />} />

                <Route path="sign-in-form" element={<SignIn />} />
                <Route path="sign-up-form" element={<SignUp />} />
                <Route path="offer/:id" element={<GuestOfferPage />} />
                <Route path="favorites" element={<ShowFavorites />} />
                <Route path="email-for-password-recovery-form" element={<EmailForPassRecovery />}/>
                <Route path="password-recovery-form" element={<PasswordRecovery />}/>
                <Route path="/confirm-email" element={<ConfirmEmailPage/>} />
                 
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </FavoritesProvider>
      </OffersProvider>
    </Provider>
  );
}

export default App;
