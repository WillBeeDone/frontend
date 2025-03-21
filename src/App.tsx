
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./components/main/Main";
import NoPage from "./components/noPage/NoPage";
import GuestOfferPage from "./components/offerPage/GuestOfferPage";
import { OffersProvider } from "./components/context/OffersContext";
import SignUp from "./components/signUp/SignUp";
import SignIn from "./components/signIn/SignIn";

function App() {
  return (
    <OffersProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Main />} />

            <Route path="sign-in-form" element={<SignIn/>} />
            <Route path="sign-up-form" element={<SignUp />} />
            <Route path="offer/:id" element={<GuestOfferPage />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </OffersProvider>
  );
}

export default App;
