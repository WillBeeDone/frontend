
import { Outlet } from "react-router-dom"
import style from "./Layout.module.css"
import Footer from "../Components/footer/Footer"
import Header from "../Components/header/Header"
import MyButton from "../Components/myButton/MyButton"

export default function Layout() {


  const headerElementsGuest = [
    { 
      text: <img src="/logoWillBeeDone1.png" alt="Logo" style={{ width: '140px', height: 'auto' }} />, 
      path: "/" 
    },
  
   ];

  
  return (
    <>
    <div className={style.boxForHeader}>
      <Header links={headerElementsGuest}/>
    </div>
    
    <main className={style.main}>  
   <Outlet/>
    </main>

    <div className={style.boxForFooter}><Footer/> </div>
       
    </>
  )
}
