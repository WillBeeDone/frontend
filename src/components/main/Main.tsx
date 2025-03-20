import styles from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX } from "react";
import Banner from "../banner/Banner";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../context/OffersContext";

export default function Main(): JSX.Element {
  const { setSelectedCategory } = useOffers();

  return (
    <>
<<<<<<< HEAD
      <div className={styles.mainContainer}>
        <div className={styles.inputZoneMainContainer}>
=======
      <div className={style.mainContainer}>
        <div className={style.banner}>
>>>>>>> cb0cc080bffb0e36837fc487722cca9f79139bec
          <Banner />
          </div>

          <div className={styles.inputZoneItem}>
            <p>control panel here</p>
            <DropDown url="" text="categories" onChange={setSelectedCategory} switcher={2}/>
          </div>
        

        <OfferCard />
      </div>
    </>
  );
}
