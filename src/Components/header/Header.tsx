import { JSX } from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";
import DropDown from "../dropDown/DropDown";
import {useOffers} from "../context/OffersContext"

interface ILink {
  text: React.ReactNode;
  path: string;
}


interface IHeaderProps {
  links: ILink[];
}

export default function Header({ links }: IHeaderProps): JSX.Element {

  const { setSelectedCity, setSelectedCategory } = useOffers();



 
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

      
      <DropDown url="" text="cities"  onChange={setSelectedCity}/>
      
      <DropDown  url="" text="categories" onChange={setSelectedCategory} />

    </header>
  );
}
