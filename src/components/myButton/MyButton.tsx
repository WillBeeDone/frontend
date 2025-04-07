import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./myButton.module.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMyProfileDataByAccessToken } from "../../features/auth/authActions";
import sortAscIcon from "/sort-from-low.png";
import sortDescIcon from "/sort-from-high.png";
import { IOfferCard } from "../types/OfferInterfaces";

interface IMyButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  func?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "easy";
  to?: string;
  isSortButton?: boolean;
  "data-testid"?: string;
  className?:string;
 offerCards?: IOfferCard[];
   setOfferCards?: (offer: IOfferCard[]) => void;
}

function MyButton({
  type = "button",
  text = "click!",
  func = () => {},
  disabled = false,
  variant = "primary",
  to,
  isSortButton = false,
  "data-testid": dataTestId = "default",
  offerCards,
  setOfferCards,
}: IMyButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.user.accessToken);
 
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleClick = async () => {
    if ((text === "My Profile" || text === "Create Offer") && accessToken) {
      try {
        await dispatch(getMyProfileDataByAccessToken(accessToken)).unwrap();
        
        if (text === "My Profile") {
          navigate("/my-profile");
        } else if (text === "Create Offer") {
          navigate("/create-offer");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    } else if (to) {
      navigate(to);
    }

    func();

    if (isSortButton && offerCards && setOfferCards) {
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
      data-testid={dataTestId}
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
      data-testid={dataTestId}
    >
      {text}
    </button>
  );
}

export default MyButton;