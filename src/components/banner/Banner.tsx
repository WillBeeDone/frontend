import { JSX } from "react";

import styles from "./Banner.module.css";
import KeyWordInput from "../keyWordInput/KeyWordInput";
import { useOffers } from "../context/OffersContext";
import MyButton from "../myButton/MyButton";

export default function Banner(): JSX.Element {
  const { selectedKeyWord, setSelectedKeyWord } = useOffers();

  return (
    <div className={styles.boxForBanner}>
        <h2>What do you need help with?</h2>
       <div className={styles.keyWordContainer}>
        <KeyWordInput
          className={styles.keyWordInput}
          placeholder="Enter keywords to search"
          name=""
          type="text"
          value={selectedKeyWord}
          onChange={setSelectedKeyWord}
        />
        <MyButton text="Search" />
      </div>
    </div>
  );
}
