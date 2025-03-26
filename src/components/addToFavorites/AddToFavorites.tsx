import { MouseEvent } from "react";
import styles from "./AddToFavorites.module.css";
import { useFavorites } from "../context/FavoritesContext";
import { IOfferCard } from "../types/OfferInterfaces";
import offerInFavorites from "/offerInFavorites.png";
import offerIsUsual from "/offerIsUsual.png";
import MyButton from "../myButton/MyButton";
import { Link } from "react-router-dom";

interface AddToFavoritesProps {
  offer: IOfferCard;
}

export default function AddToFavorites({ offer }: AddToFavoritesProps) {
  const { favoriteOffers, addFavorite, removeFavorite } = useFavorites();

  const isOfferFavoriteAlready = favoriteOffers.some(
    (favOffer) => favOffer.id === offer.id
  );

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
    <div className={styles.favoritesAndView}>
      <button onClick={handleClick} className={styles.favoriteButton}>
        <img
          src={isOfferFavoriteAlready ? offerInFavorites : offerIsUsual}
          alt="heart"
        />
      </button>
      <div className={styles.view}>
        <Link to={`/offer/${offer.id}`}>
          <MyButton variant="primary" text="View" />
        </Link>
      </div>
    </div>
  );
}
