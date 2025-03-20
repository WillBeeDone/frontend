import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


export default function Layout() {
  const headerElementsGuest = [
    {
      text: (
        <img
          src="./logoWillBeeDone1.png"
          alt="Logo"
          style={{ width: "140px", height: "auto" }}
        />
      ),
      path: "/",
    },
  ];

  return (
    <>
      <div className={styles.boxForHeader}>
        <Header links={headerElementsGuest} />
      </div>

      <main className={styles.main}>
        <Outlet />
      </main>

      <div className={styles.boxForFooter}>
        <Footer />{" "}
      </div>
    </>
  );
}
