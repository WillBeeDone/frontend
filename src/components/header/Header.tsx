import { JSX } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../context/OffersContext";
import MyButton from "../myButton/MyButton";

interface ILink {
  text: React.ReactNode;
  path: string;
}

interface IHeaderProps {
  links: ILink[];
}

export default function Header({ links }: IHeaderProps): JSX.Element {
  const { setSelectedCity } = useOffers();

  return (
    <header className={styles.header}>
      {links.map(({ text, path }, index) => (
        <NavLink
          key={index}
          className={({ isActive }) =>
            (isActive ? styles.linkActive : "") + " " + styles.extraSettings
          }
          to={path}
        >
          {text}
        </NavLink>
      ))}

      <div className = {styles.dropdown}>
        <DropDown  url="" text="Choose city" onChange={setSelectedCity} />
      </div>
      <div>
        <MyButton text="Sign In" to="/sign-in-form" variant="primary" />
        <MyButton text="Sign Up" to="/log-in-form" variant="primary" />
      </div>
    </header>
  );
}
