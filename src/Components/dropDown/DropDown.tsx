import { useState, useEffect, JSX } from "react";
import style from "./DropDown.module.css"

interface IDataForSelector {
  element: string;
  value: string;
}

interface IDropDown {
  url: string;
  text?: string;
  onChange?: (selectedElement: string) => void;
}

export default function DropDown({ url, text = "elements", onChange }: IDropDown): JSX.Element {
  const [selectedElement, setSelectedElement] = useState("all");
  /*const [list, setList] = useState<IDataForSelector[]>([]);
  

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(url);
        const data: string[] = await response.json();

        const formattedList = data.map((element) => ({
          element,
          value: element.charAt(0).toLowerCase() + element.substring(1),
        }));

        setList(formattedList);
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    fetchElements();
  }, [url]);
  */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newElement = event.target.value;
    setSelectedElement(newElement);
    if (onChange) {
      onChange(newElement);
    }
  };
  
  const list = [
    { element: "Berlin" },
    { element: "Leipzig" },
    { element: "Magdeburg" },
    { element: "Halle" },
    { element: "Hamburg" }
  ].map(({ element }) => ({
    element,
    value: element.charAt(0).toLowerCase() + element.substring(1)
  }));
    


  return (
    <select className={style.dropdown} value={selectedElement} onChange={handleChange}>
      <option value="all" disabled>{text}</option>
      {list.map((el, index) => (
        <option key={index} value={el.value}>
          {el.element}
        </option>
      ))}
    </select>
  );
}