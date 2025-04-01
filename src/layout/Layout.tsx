import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useOffers } from "../context/OffersContext";

export default function Layout() {
  const navigate = useNavigate();
  const { setSelectedCategory, setSelectedKeyWord, fetchOffers } = useOffers();

  const handleLogoClick = () => {
    setSelectedCategory("all");
    setSelectedKeyWord("");
    fetchOffers("all", "all", "");
    navigate("/");
  };

  const headerElementsGuest = [
    {
      text: (
        <img
          src="./logoWillBeeDone1.png"
          alt="Logo"
          style={{ width: "140px", height: "auto" }}
          onClick={handleLogoClick}
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
