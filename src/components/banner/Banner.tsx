import { JSX } from "react";
import Button from "../loginForm/Button";
import styles from "./Banner.module.css";
import KeyWordInput from "../keyWordInput/KeyWordInput";
import { useOffers } from "../context/OffersContext";

export default function Banner(): JSX.Element {
  const { selectedKeyWord, setSelectedKeyWord } = useOffers();

  return (
    <div className={styles.boxForBanner}>
      <div className="inputContainer">
        <div className="item">
          <KeyWordInput
            className="ggg"
            label="What do you need help with?"
            placeholder="type here :)"
            name=""
            type="text"
            value={selectedKeyWord}
            onChange={setSelectedKeyWord}
          />
        </div>
        <div className="item">
          <Button type="button" text="Search" />
        </div>
      </div>

      <img src="/5871.png" alt="" />
      <img src="/girl1.png" alt="" />
      <img src="/portrait-young-beautiful1.png" alt="" />
      <img src="/pngkit_cleaning-lady-png_5559431.png" alt="" />
    </div>
  );
}
