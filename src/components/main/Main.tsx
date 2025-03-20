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
      <div className={styles.mainContainer}>
        <div className={styles.inputZoneMainContainer}>
          <Banner />

          <div className={styles.inputZoneItem}>
            <p>control panel here</p>
            <DropDown url="" text="categories" onChange={setSelectedCategory} switcher={2}/>
          </div>
        </div>

        <OfferCard />
      </div>
    </>
  );
}
