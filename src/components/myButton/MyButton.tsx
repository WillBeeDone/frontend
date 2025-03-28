import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./myButton.module.css";
import { useOffers } from "../context/OffersContext";
import sortAscIcon from "/sort-from-low.png";
import sortDescIcon from "/sort-from-high.png";


interface IMyButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  func?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "easy";
  to?: string;
  isSortButton?: boolean;
}

function MyButton({
  type = "button",
  text = "click!",
  func = () => {},
  disabled = false,
  variant = "primary",
  to,
  isSortButton = false,
}: IMyButtonProps) {
  const navigate = useNavigate();
  const { offerCards, setOfferCards } = useOffers();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
    func();

    if (isSortButton) {
      const sortedOffers = [...offerCards].sort((b, a) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
      setOfferCards(sortedOffers);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  return isSortButton ? (
    <button
      type={type}
      onClick={handleClick}
      className={styles.sortContainer}
      disabled={disabled}
    >
      <span className={styles.sortContainerText}>{text}</span>
      <img
        className={sortOrder === "asc" ? styles.sortAsc : styles.sortDesc}
        src={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
        alt="Sort"
      />
    </button>
  ) : (
    <button
      type={type}
      onClick={handleClick}
      className={cn(styles.myButton, {
        [styles.primary]: variant === "primary",
        [styles.danger]: variant === "danger",
        [styles.easy]: variant === "easy",
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default MyButton;
