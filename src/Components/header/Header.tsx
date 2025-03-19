import { JSX, useEffect } from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";
import GetCities from "../citySelector/GetCities";

interface ILink {
  text: React.ReactNode;
  path: string;
}


interface IHeaderProps {
  links: ILink[];
}

export default function Header({ links }: IHeaderProps): JSX.Element {
 
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

      
      <GetCities/>
    </header>
  );
}
