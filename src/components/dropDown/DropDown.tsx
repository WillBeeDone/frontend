import { useState, useEffect, JSX } from "react";
import styles from "./DropDown.module.css"

interface IDataForSelector {
  element: string;
  value: string;
}

interface IDropDown {
  url: string;
  text?: string;
  onChange?: (selectedElement: string) => void;
  switcher?: number;
}

export default function DropDown({ url, text = "elements", onChange, switcher = 1}: IDropDown): JSX.Element {
  const [selectedElement, setSelectedElement] = useState("all");
  const [list, setList] = useState<IDataForSelector[]>([]);
  

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(url);
        console.log("in Drop Down response ", response);
        
        const data: string[] = await response.json();

        const formattedList = data.map((element) => ({
          element,
          value: element
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
    <select className={styles.dropdown} value={selectedElement} onChange={handleChange}>
      
        {switcher === 1 ? ( <option value="all" disabled>{text}</option> )
        : <option value="all">All categories</option>}

      {list.map((el, index) => (
        <option key={index} value={el.value}>
          {el.element}
        </option>
      ))}
    </select>
  );
}