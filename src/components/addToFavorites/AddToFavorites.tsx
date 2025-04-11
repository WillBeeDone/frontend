import { useState } from "react";
import styles from "./AddToFavorites.module.css";
import { useFavorite } from "../../context/FavoriteContext";
import { IOfferCard } from "../types/OfferInterfaces";
import offerInFavorites from "/offerInFavorites.png";
import offerIsUsual from "/offerIsUsual.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
interface AddToFavoritesProps {
  offer: IOfferCard;
  className?: string;
  "data-testid"?: string;
}

export default function AddToFavorites({
  offer,
  "data-testid": dataTestId = "default",
}: AddToFavoritesProps) {
  const { favoriteOffers, addFavorite, removeFavorite } = useFavorite();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showTooltip, setShowTooltip] = useState(false);

  const isOfferFavoriteAlready = favoriteOffers.some(
    (favOffer) => favOffer.id === offer.id
  );

  const handleClick = () => {
    if (isAuthenticated) {
      if (isOfferFavoriteAlready) {
        removeFavorite(offer.id.toString());
      } else {
        addFavorite(offer.id.toString());
      }
    } else {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000); // задержка сообщения 3 секунды
    }
  };

  return (
    <div className={styles.favorites}>
      <button
        onClick={handleClick}
        className={styles.favoriteButton}
        data-testid={dataTestId}
      >
        <img
          src={
            isOfferFavoriteAlready && isAuthenticated
              ? offerInFavorites
              : offerIsUsual
          }
          alt="heart"
        />
      </button>
      {showTooltip && (
        <div className={styles.tooltip}>
          Please <Link to="/sign-in-form">Sign In</Link> for this action
        </div>
      )}
    </div>
  );
}
