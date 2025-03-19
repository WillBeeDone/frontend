import { JSX } from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import GetCities from "../citySelector/GetCities";
import MyButton from "../myButton/MyButton";
import DropDown from "../dropDown/DropDown";
=======
import DropDown from "../dropDown/DropDown";
import {useOffers} from "../context/OffersContext"
>>>>>>> ff9ee19b106022572dcda0e3c51c71dfd421fea7

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
