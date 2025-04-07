import { JSX } from "react";
import styles from "./Menu.module.css";
import SignOut from "../signOut/SignOut";
import { Link } from "react-router-dom";

export default function Menu(): JSX.Element {
  return (
    <div className={styles.menuMain}>
      <div className={styles.menuContainer}>
        <Link to="/my-profile" className={styles.menuItem}>
          <img
            className={styles.burgerMenuIcon}
            src="/menuIcon/user-check.png"
            alt="user-check.png"
          />{" "}
          My Profile
        </Link>
        <Link to="/favorites" className={styles.menuItem}>
          <img
            className={styles.burgerMenuIcon}
            src="/menuIcon/favourite.png"
            alt="favourite.png"
          />{" "}
          Favourites
        </Link>
        <Link to="#" className={styles.menuItem}>
          <img
            className={styles.burgerMenuIcon}
            src="/menuIcon/elements.png"
            alt="my offers icon"
          />
          My offers
        </Link>
        <Link to="/create-new-offer" className={styles.menuItem}>
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
          Sign out
        </Link>

        {/* <SignOut /> */}
      </div>
    </div>
  );
}
