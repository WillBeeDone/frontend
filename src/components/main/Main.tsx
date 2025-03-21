import styles from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX } from "react";
import Banner from "../banner/Banner";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../context/OffersContext";
import MyButton from "../myButton/MyButton";
import CategorySelector from "../categorySelector/CategorySelector";

export default function Main(): JSX.Element {
  const { setSelectedCategory } = useOffers();

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.banner}>
          <Banner />
        </div>

        <div className={styles.category}>
          <CategorySelector/>
        </div>

        <div>
          <OfferCard />
        </div>
      </div>
    </>
  );
}
