import { JSX } from "react";
import styles from "./Menu.module.css";
import SignOut from "../signOut/SignOut";
import { Link } from "react-router-dom";

interface IMenu {
  "data-testid"?: string;
  onCloseMenu: () => void;
}


export default function Menu({
  "data-testid": dataTestId = "default",
  onCloseMenu,
}: IMenu):JSX.Element {
  return (
    <div className={styles.menuMain}  data-testid={dataTestId} >
      <div className={styles.menuContainer}>
        <Link to="/my-profile" className={styles.menuItem} data-testid="myProfileLinkMenu_lkfHhnmf">
          <img
            className={styles.burgerMenuIcon}
            src="/menuIcon/user-check.png"
            alt="user-check.png"
          />{" "}
          My Profile
        </Link>
        <Link to="/favorite" className={styles.menuItem} data-testid="favoritesLinkMenu_HgfbGbf">
          <img
            className={styles.burgerMenuIcon}
            src="/menuIcon/favourite.png"
            alt="favourite.png"
          />{" "}
          Favourites
        </Link>
        <Link to="#" className={styles.menuItem} data-testid="myOffersLinkMenu_JndgGbfdh">
          <img
            className={styles.burgerMenuIcon}
            src="/menuIcon/elements.png"
            alt="my offers icon"
          />
          My offers
        </Link>
        <Link to="/create-new-offer" className={styles.menuItem} data-testid="createOfferLinkMenu_lkfHhnmf">
          <img
            className={styles.burgerMenuIcon}
            src="/menuIcon/Plus.png"
            alt="create offer icon"
          />
          Create offer
        </Link>
        <Link to="#" className={styles.menuItem}>
          <img
            className={styles.burgerMenuIcon}
            src="/menuIcon/exit.png"
            alt="sign out icon"
          />
         <SignOut onSignOut={onCloseMenu} />
        </Link>

       
      </div>
    </div>
  );
}
