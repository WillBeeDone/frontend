import styles from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX } from "react";
import Banner from "../banner/Banner";
import CategorySelector from "../categorySelector/CategorySelector";

export default function Main(): JSX.Element {

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.banner}>
          <Banner />
        </div>

        <div className={styles.category}>
          <CategorySelector/>
        </div>

        <div className={styles.offerCard}>
          <OfferCard />
        </div>
      </div>
    </>
  );
}
