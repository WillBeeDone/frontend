//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

import Main from "./Components/main/Main";
import LoginForm from "./Components/loginForm/LoginForm";
import NoPage from "./Components/noPage/NoPage";
import GuestOfferPage from "./Components/offerPage/GuestOfferPage";
import { OffersProvider } from "./Components/context/OffersContext";

function App() {
  //const [count, setCount] = useState(0)

  {
    /*<> <ShowAllElements array={offersListForGuest}/> </>*/
  }
  return (
    <OffersProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />

          <Route path="sign-in-form" element={<LoginForm />} />
          <Route path="log-in-form" element={<LoginForm />} />
          <Route path="offer/:id" element={<GuestOfferPage />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
    </OffersProvider>
  );
}

export default App;
