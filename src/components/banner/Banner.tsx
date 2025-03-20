import { JSX } from "react";
<<<<<<< HEAD
import Button from "../loginForm/Button";
=======
import Button from "../button/Button";
>>>>>>> cb0cc080bffb0e36837fc487722cca9f79139bec
import styles from "./Banner.module.css";
import KeyWordInput from "../keyWordInput/KeyWordInput";
import { useOffers } from "../context/OffersContext";
import MyButton from "../myButton/MyButton";

export default function Banner(): JSX.Element {
  const { selectedKeyWord, setSelectedKeyWord } = useOffers();

  return (
    <div className={styles.boxForBanner}>
<<<<<<< HEAD
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
=======
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
>>>>>>> cb0cc080bffb0e36837fc487722cca9f79139bec
    </div>
  );
}
