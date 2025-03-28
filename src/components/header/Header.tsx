import { JSX } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../context/OffersContext";
import MyButton from "../myButton/MyButton";
import PasswordRecovery from "../passwordRecovery/PasswordRecovery";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import SignOut from "../signOut/SignOut";
import { FixImgUrl } from "../backToFrontTransformData/FixImgUrl";


interface ILink {
  text: React.ReactNode;
  path: string;
}

interface IHeaderProps {
  links: ILink[];
}

export default function Header({ links }: IHeaderProps): JSX.Element {
  const { setSelectedCity } = useOffers();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const {user} = useAppSelector (state => state.auth);
  console.log("in Header user: ", user);
  

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

      <div className={styles.dropdown}>
        <DropDown
          url="/api/locations"
          text="Choose city"
          onChange={setSelectedCity}
        />
      </div>

      <div>

       
        
        {isAuthenticated ? (
          <>
          <div className={styles.authUserDataBox}>
          <h3 className={styles.authUserFirstName}>Hello, {user.firstName}</h3>
          <div className={styles.authUserProfilePictureBox}> <img className={styles.authUserProfilePicture}  src={FixImgUrl(user.profilePicture)} alt="User profile picture"/>
      </div>
          </div>
          <MyButton text="Favorites" to="/favorites" variant="primary" />
          <SignOut/>
          </>
        ):(
          <>
          <MyButton text="Sign In" to="/sign-in-form" variant="primary" />
          <MyButton text="Sign Up" to="/sign-up-form" variant="primary" />
          </>
        )}
        
      </div>

      {/* временный вызов для проверки работы */}
      {/* <MyButton text="Favorites" to="/favorites" variant="primary" /> */}

      {/* временный вызов для проверки работы формы */}
      {/* <PasswordRecovery/>  */}
    </header>
  );
}
