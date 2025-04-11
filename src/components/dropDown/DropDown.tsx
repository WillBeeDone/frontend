import { useState, useEffect, JSX } from "react";
import styles from "./DropDown.module.css";

interface IDataForSelector {
  element: string;
  value: string;
}

interface IDropDown {
  url: string;
  text?: string;
  onChange?: (selectedElement: string) => void;
  switcher?: number;
  isReadOnly?: boolean;
  "data-testid"?: string;
  forMyProfile?: boolean;
}

export default function DropDown({
  url,
  text = "elements",
  onChange,
  switcher = 1,
  "data-testid": dataTestId = "default",
  isReadOnly = false,
  forMyProfile = false,
}: IDropDown): JSX.Element {
  const isCitySelector = switcher === 1; // Якщо switcher = 1 – це вибір міст

  // тернарный оператор, который обьяснит дропДауну на какой ключ из браузерного хранилища ориентироваться
  // это нужно чтоб отображаемое значение в дропДаун в Хедере было синхронизированно со списком оферов
  let storageKey;
  forMyProfile
    ? (storageKey = "userSelectedCity") // Ключ для LocalStorage
    : (storageKey = "selectedCity"); // Ключ для LocalStorage

  const initialValue = isCitySelector
    ? localStorage.getItem(storageKey) || "all"
    : "all";

  const [selectedElement, setSelectedElement] = useState(initialValue);
  const [list, setList] = useState<IDataForSelector[]>([]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(url);
        const data: string[] = await response.json();
        const formattedList = data.map((element) => ({
          element,
          value: element,
        }));
        setList(formattedList);
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    fetchElements();
  }, [url]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newElement = event.target.value;
    setSelectedElement(newElement);

    if (onChange) {
      onChange(newElement);
    }
  };

  return (
    <select
      className={styles.dropdown}
      value={selectedElement}
      onChange={handleChange}
      disabled={isReadOnly}
      data-testid={dataTestId}
    >
      {switcher === 1 ? (
        <option value="all" disabled>
          {text}
        </option>
      ) : switcher === 3 ? (
        <option value="all" disabled>
          {text}
        </option>
      ) : (
        <option value="all">All categories</option>
      )}

      {list.map((el, index) => (
        <option key={index} value={el.value}>
          {el.element}
        </option>
      ))}
    </select>
  );
}
