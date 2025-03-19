import { useState, useEffect } from "react";
import CitySelector from "./CitySelector";
import { ICity } from "../types/CityInterface";



const GetCities = () => {

    /*
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.example.com/cities");
        const data: string[] = await response.json();
        
        const formattedCities = data.map(city => ({
          city,
          value: city.charAt(0).toLowerCase() + city.substring(1),
        }));

        setCities(formattedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);
    */

  const cities = [
    { city: "Berlin" },
    { city: "Leipzig" },
    { city: "Magdeburg" },
    { city: "Halle" },
    { city: "Hamburg" }
  ].map(({ city }) => ({
    city,
    value: city.charAt(0).toLowerCase() + city.substring(1)
  }));


  return <CitySelector cities={cities} />;
};

export default GetCities;