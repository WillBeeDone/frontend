import style from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX } from "react";
import Banner from "../banner/Banner";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../context/OffersContext";

export default function Main(): JSX.Element {
  const { setSelectedCategory } = useOffers();

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.inputZoneMainContainer}>
          <Banner />

          <div className={style.inputZoneItem}>
            <p>control panel here</p>
            <DropDown url="" text="categories" onChange={setSelectedCategory} />
          </div>
        </div>

        <OfferCard />
      </div>
    </>
  );
}
