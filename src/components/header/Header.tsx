import { JSX, useState } from "react";
import styles from "./Header.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../../context/OffersContext";
import MyButton from "../myButton/MyButton";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { FixImgUrl } from "../backToFrontTransformData/FixImgUrl";

import Menu from "../menu/Menu";
import { useFavorite } from "../../context/FavoriteContext";
import CreateNewOfferLink from "../createNewOffer/CreateNewOfferLink";

interface ILink {
  text: React.ReactNode;
  path: string;
}

interface IHeaderProps {
  links: ILink[];
}

export default function Header({ links }: IHeaderProps): JSX.Element {
  const { setSelectedCity: setCityForOffer } = useOffers();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBurgerClick = () => {
    setIsMenuOpen((prev) => !prev); // меняем состояние видимости модального окна
  };
  const { setSelectedCity: setCityForFavorite } = useFavorite();

  const location = useLocation();
  const handleCloseMenu = () => {
    setIsMenuOpen(false); // закрытие меню
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // останавливаем всплытие, чтобы меню не закрывалось при клике внутри
  };

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
          onChange={
            location.pathname === "/favorite"
              ? setCityForFavorite
              : setCityForOffer
          }
          data-testid="DropDownLocationHeader_HfZydgG"
        />
      </div>

      <div>
        {isAuthenticated ? (
          <>
            <div className={styles.menuLinkContainer}>
              <div className={styles.linkBlock}>
                <span>
                  <Link
                    data-testid="LinkFavoritesInHeader_Jhfyghdg"
                    to="/favorite"
                    className={styles.menuLink}
                  >
                    Favorites
                  </Link>
                </span>
                <span
                  data-testid="LinkMyOffersInHeader_Jjhfyfdg"
                  onClick={() => navigate("/my-offers")}
                  className={styles.menuLink}
                >
                  My Offers
                </span >
                <span className={styles.menuLinkCreateOffer}>
                  {" "}
                  <CreateNewOfferLink className="menuLinkCreateOffer"/>
                </span>
              </div>
            </div>
            <div className={styles.authUserProfilePictureBox}>
              <img
                className={styles.authUserProfilePicture}
                src={FixImgUrl(user.profilePicture)}
                alt="User profile picture"
              />
            </div>
            <div>
              <img
                className={styles.burgerMenu}
                src="/Hamburger.png"
                alt="Hamburger icon"
                onClick={handleBurgerClick}
              />
            </div>
          </>
        ) : (
          <>
            <MyButton
              data-testid="SignInButtonInHeader_kdjHgf"
              text="Sign In"
              to="/sign-in-form"
              variant="primary"
            />
            <MyButton
              data-testid="SignUpButtonInHeader_kdjHgf"
              text="Sign Up"
              to="/sign-up-form"
              variant="primary"
            />
          </>
        )}
      </div>

      {/* Модальное окно с компонентом Menu */}
      {isMenuOpen && (
        <div className={styles.modal} onClick={handleCloseMenu}>
          <div
            className={styles.modalContent}
            onClick={handleModalContentClick} // останавливаем всплытие события
          >
            <Menu
              onCloseMenu={handleCloseMenu}
              data-testid="burgerMenu_hfgYgf"
            />
          </div>
        </div>
      )}
    </header>
  );
}
