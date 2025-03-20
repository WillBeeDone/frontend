import { useState, useContext } from "react";
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
  to?: string; // Додаємо для навігації
  isSortButton?: boolean;
}

function MyButton({
  type = "submit",
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
      navigate(to); // Переход на іншу сторінку
    }
    func(); // Виклик переданої функції

    if (isSortButton) {
      const sortedOffers = [...offerCards].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
      setOfferCards(sortedOffers);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  return (
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
      {isSortButton ? (
        <img
          src={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
          alt="Sort"
          className={styles.sortButton}
        />
      ) : (
        text
      )}
    </button>
  );
}

export default MyButton;
