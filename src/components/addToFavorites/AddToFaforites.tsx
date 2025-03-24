import { MouseEvent } from "react";
import styles from "./AddToFavorites.module.css";
import { useFavorites } from "../context/FavoritesContext";
import { IOfferCard } from "../types/OfferInterfaces";
import offerInFavorites from "/black-heart-favorite.png";
import offerIsUsual from "/white-heart-usual.png";

interface AddToFavoritesProps {
  offer: IOfferCard;
}

export default function AddToFavorites({ offer }: AddToFavoritesProps) {
  const { favoriteOffers, addFavorite, removeFavorite } = useFavorites();

  const isOfferFavoriteAlready = favoriteOffers.some((favOffer) => favOffer.id === offer.id);

  // чтоб кнопка не перенаправляла по линку в котором находится
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); 

    if (isOfferFavoriteAlready) {
      removeFavorite(offer.id.toString());
    } else {
      addFavorite(offer.id.toString());
    }
  };

  return (
    <button onClick={handleClick} className={styles.favoriteButton}>
      <img
        src={isOfferFavoriteAlready ? offerInFavorites : offerIsUsual}
        alt="heart"
        className={styles.heart}
      />
    </button>
  );
}
