import { JSX } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../context/OffersContext";
import MyButton from "../myButton/MyButton";
import RecoveryForm from "../recoveryForm/RecoveryForm";



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
        <DropDown  url="/api/locations" text="Choose city" onChange={setSelectedCity} />
      </div>

      <div>
        <MyButton text="Sign In" to="/sign-in-form" variant="primary" />
        <MyButton text="Sign Up" to="/sign-up-form" variant="primary" />
      </div>
      
      <MyButton text="Favorites" to="/favorites" variant="primary" />
     
      
      {/* временный вызов для посмотреть и проверки работы формы */}
      {/* <RecoveryForm/>  */}
    </header>
  );
}
