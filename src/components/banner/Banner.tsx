import { JSX, useState } from "react";
import styles from "./Banner.module.css";
import KeyWordInput from "../keyWordInput/KeyWordInput";

interface IKeyWordSelectorProps {
  selectedKeyWord: string,
  setSelectedKeyWord: (keyWord: string) => void;
}

export default function Banner({selectedKeyWord, setSelectedKeyWord}:IKeyWordSelectorProps): JSX.Element {

  const [localKeyWord, setLocalKeyWord] = useState(selectedKeyWord);

  // фактический перенос значения локальной переменной состояния в переменную для фетч-запроса
  const handleSearch = () => {
    setSelectedKeyWord(localKeyWord);
  };

  // по нажатию Enter локальная переменная состояния отдает значение в переменную для фетч-запроса
  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.boxForBanner}>
      <h2>What do you need help with?</h2>
      <div className={styles.keyWordContainer}>
        <KeyWordInput
          className={styles.keyWordInput}
          placeholder="Enter keywords to search"
          name="search"
          type="text"
          value={localKeyWord}
          onChange={setLocalKeyWord} // изменение поля влияет только на локальную переменную состояния
          onKeyDown={handlePressEnter} // обработка нажатия Enter
        />
        <button className={styles.searchButton}onClick={handleSearch}>Go →</button>
      </div>
    </div>
  );
}
