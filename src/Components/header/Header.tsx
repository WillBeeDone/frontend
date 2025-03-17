import { useEffect } from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";




interface ILink {
    text: string;
    path: string;
  }
  
  interface IHeaderProps {
    height?: number;
    backgroundColor?: string;
    links: ILink[];
  }
  
  export default function Header({
    height = 80,
    backgroundColor = "rgb(206, 103, 0)",
    links,
  }: IHeaderProps): JSX.Element {

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
    return (
      <header
       

        className={style.header}
        style={{ backgroundColor, height: `${height}px` }}
      >
         {links.map(({ text, path }, index) => (
          <NavLink
            key={index}
            className={({ isActive }) => (isActive ? style.linkActive : "") + " " + style.extraSettings}
            to={path}
          >
            {text}
          </NavLink>
        
        
         ))}

<select className="chooseCity">
    <option value="">Choose city</option>
      <option value="all">All</option>
      {cities.map((element, index) => (
        <option key={index} value={element.value}>
          {element.city}
        </option>
      ))}
    </select>



      </header>
    );
  }