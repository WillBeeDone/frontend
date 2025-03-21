import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./myButton.module.css";
import { useOffers } from "../context/OffersContext";
import sortAscIcon from "/sort-from-high.png";
import sortDescIcon from "/sort-from-low.png";

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
      const sortedOffers = [...offerCards].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
      setOfferCards(sortedOffers);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  return isSortButton ? (
    <div className={styles.sortContainer}>
      <div className={styles.sortContainerText}>{text}</div>
      <button type={type} onClick={handleClick} className={styles.sortContainerButton} disabled={disabled}>
        <img src={sortOrder === "asc" ? sortAscIcon : sortDescIcon} alt="Sort" />
      </button>
    </div>
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