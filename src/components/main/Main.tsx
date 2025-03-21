import styles from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX } from "react";
import Banner from "../banner/Banner";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../context/OffersContext";
import MyButton from "../myButton/MyButton";

export default function Main(): JSX.Element {
  const { setSelectedCategory } = useOffers();

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.banner}>
          <Banner />
          </div>

          <div className={styles.inputZoneItem}>
            <p>control panel here</p>
            <DropDown url="/api/categories/list" text="categories" onChange={setSelectedCategory} switcher={2}/>
            
            <div className={styles.inputZoneItem}>
              <MyButton text="Price" isSortButton={true}/>
              </div>
    
          </div>
        

        <OfferCard />
      </div>
    </>
  );
}
