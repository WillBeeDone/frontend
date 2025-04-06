import { JSX } from "react";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../../context/OffersContext";
import MyButton from "../myButton/MyButton";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { FixImgUrl } from "../backToFrontTransformData/FixImgUrl";
import { useMyOffers } from "../../context/MyOffersContext";

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
  const { user } = useAppSelector((state) => state.auth);
  const { fetchMyOffers } = useMyOffers();
  

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
          data-testid="DropDownLocationHeader_HfZydgG"
        />
      </div>

      <div>
        {isAuthenticated ? (
          <>
            <div className={styles.menuLinkContainer}>
              <div className={styles.linkBlock}>
              <span>
                <Link to="/favorites" className={styles.menuLink}>
                  Favorites
                </Link>
              </span>
              <span onClick={fetchMyOffers} className={styles.menuLink}>
                My Offers
              </span>
              <Link to="/create-new-offer" className={styles.menuLinkCreateOffer}>
                Create Offer
              </Link>
            </div>
            </div>
            <div className={styles.authUserProfilePictureBox}>
              {" "}
              <img
                className={styles.authUserProfilePicture}
                src={FixImgUrl(user.profilePicture)}
                alt="User profile picture"
              />
            </div>
            <div>
            <img src="/Hamburger.png" alt="Hamburger icon" />
            </div>
          </>
        ) : (
          <>
            <MyButton text="Sign In" to="/sign-in-form" variant="primary" />
            <MyButton text="Sign Up" to="/sign-up-form" variant="primary" />
          </>
        )}
      </div>
    </header>
  );
}
