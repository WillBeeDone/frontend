import { JSX, useEffect } from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";
import GetCities from "../citySelector/GetCities";

interface ILink {
  text: React.ReactNode;  // Это позволяет передавать и строки, и JSX элементы
  path: string;
}


interface IHeaderProps {
  links: ILink[];
}

export default function Header({ links }: IHeaderProps): JSX.Element {
  // const cities = [
  //   { city: "Berlin" },
  //   { city: "Leipzig" },
  //   { city: "Magdeburg" },
  //   { city: "Halle" },
  //   { city: "Hamburg" },
  // ].map(({ city }) => ({
  //   city,
  //   value: city.charAt(0).toLowerCase() + city.substring(1),
  // }));
  return (
    <header className={style.header}>
      {links.map(({ text, path }, index) => (
        <NavLink
          key={index}
          className={({ isActive }) =>
            (isActive ? style.linkActive : "") + " " + style.extraSettings
          }
          to={path}
        >
          {text}
        </NavLink>
      ))}

      {/* <select className={style.chooseCity}>
        <option value="">Choose city</option>
        <option value="all">All</option>
        {cities.map((element, index) => (
          <option key={index} value={element.value}>
            {element.city}
          </option>
        ))}
      </select> */}
      <GetCities/>
    </header>
  );
}
