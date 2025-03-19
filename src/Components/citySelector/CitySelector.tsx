import styles from "./CitySelector.module.css"
import { useState } from "react";


interface ICity {
  city: string;
  value: string;
}

interface CitySelectorProps {
  cities: ICity[];
  onCityChange?: (selectedCity: string) => void;
}

const CitySelector = ({ cities, onCityChange }: CitySelectorProps) => {
  const [selectedCity, setSelectedCity] = useState("berlin"); //дефолтное значение

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    if (onCityChange) {
      onCityChange(newCity);
    }
  };

  return (
    <select className={styles.dropdown} value={selectedCity} onChange={handleChange}>
      <option value="all">All cities</option>
      {cities.map((element, index) => (
        <option key={index} value={element.value}>
          {element.city}
        </option>
      ))}
    </select>
  );
};

export default CitySelector;
