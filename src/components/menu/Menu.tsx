import { JSX } from "react";
import styles from "./Menu.module.css";
import SignOut from "../signOut/SignOut";

export default function Menu(): JSX.Element {
  return (
    <div className={styles.menuContainer}>
      <span>
        <img
          className={styles.burgerMenu}
          src="/menuIcon/user-check.png"
          alt="user-check.png"
        />{" "}
        My Profile
      </span>
      <span>
        <img
          className={styles.burgerMenu}
          src="/menuIcon/favourite.png"
          alt="favourite.png"
        />{" "}
        Favourites
      </span>
      <span>
        <img
          className={styles.burgerMenu}
          src="/menuIcon/elements.png"
          alt="my offers icon"
        />
        My offers
      </span>
      <span>
        <img
          className={styles.burgerMenu}
          src="/menuIcon/Plus.png"
          alt="create offer icon"
        />
        Create offer
      </span>
      <span>
        <img
          className={styles.burgerMenu}
          src="/menuIcon/exit.png"
          alt="sign out icon"
        />
        Sign out
      </span>

      {/* <SignOut /> */}
    </div>
  );
}
