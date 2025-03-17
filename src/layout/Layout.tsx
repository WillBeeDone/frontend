// import { NavLink, Outlet } from "react-router-dom"
import { Outlet } from "react-router-dom"
import style from "./Layout.module.css"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"



export default function Layout() {
  const headerElements = [{text:"Home 🏠", path:"/"}, {text:"Lessons", path:"lessons"}, {text:"Homeworks", path:"homeworks"}, {text:"cart", path:"cart"}, {text:"Products", path:"product"}, {text:"Перемикач теми", path:"themeToggle"}]


  const headerElementsGuest = [{text:"LOGO 🐝", path:"/"}, {text:"Sign In", path:"sign-in-form"}, {text:"Log In", path:"log-in-form"}]

  

  return (
    <>
    <div className={style.boxForHeader}>
      <Header links={headerElementsGuest} />
    </div>

    <main className={style.main}>  
   <Outlet/>
    </main>

    <div className={style.boxForFooter}><Footer/> </div>
       
    </>
  )
}
