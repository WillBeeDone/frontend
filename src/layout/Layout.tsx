// import { NavLink, Outlet } from "react-router-dom"
import { Outlet } from "react-router-dom"
import style from "./Layout.module.css"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"



export default function Layout() {
  // const headerElements = [
  //   { text: "Home 🏠", path: "/" },
  //   { text: "Lessons", path: "lessons" },
  //   { text: "Homeworks", path: "homeworks" },
  //   { text: "cart", path: "cart" },
  //   { text: "Products", path: "product" },
  //   { text: "Переключатель теми", path: "themeToggle" },
  // ];

  const headerElementsGuest = [
    { 
      text: <img src="/logo WillBeeDone 1.png" alt="Logo" style={{ width: '140px', height: 'auto' }} />, 
      path: "/" 
    },
    { text: "Sign In", path: "sign-in-form" },
    { text: "Log In", path: "log-in-form" },
  ];

  

  return (
    <>
    <div className={style.boxForHeader}>
      <Header links={headerElementsGuest} />
    </div>

    <div className={style.boxForBanner}>
      <img src="/public/587 1.png" alt="" />
      <img src="/public/girl 1.png" alt="" />
      <img src="/public/portrait-young-beautiful 1.png" alt="" />
      <img src="/public/pngkit_cleaning-lady-png_555943 1.png" alt="" />
    </div>

    <main className={style.main}>  
   <Outlet/>
    </main>

    <div className={style.boxForFooter}><Footer/> </div>
       
    </>
  )
}
