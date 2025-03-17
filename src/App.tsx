//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ShowAllElements from './components/showAllElements/ShowAllElements'
import { offersListForGuest } from './test data/Offer'
import Layout from './layout/Layout';

import Main from './components/main/main';
import LoginForm from './components/loginForm/LoginForm';
import NoPage from './components/noPage/NoPage';

function App() {
  //const [count, setCount] = useState(0)

  {/*<> <ShowAllElements array={offersListForGuest}/> </>*/}
  return (
    
    

    
    <HashRouter>

    <Routes>
      <Route path='/' element={<Layout/>}>
      
      <Route path='/' element={<Main/>} />

      <Route path='sign-in-form' element={<LoginForm/>} />
      <Route path='log-in-form' element={<LoginForm/>} />
      

      <Route path='*' element={<NoPage/>} />

    </Route>
    </Routes>


    </HashRouter>
    
      
    
  );
}

export default App
