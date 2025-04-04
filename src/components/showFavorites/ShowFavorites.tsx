import { JSX } from "react";
import ShowAll from "../showAll/ShowAll";
import { useFavorite } from "../../context/FavoriteContext";

export default function ShowFavorites(): JSX.Element {
  const { favoriteOffers } = useFavorite();
  return <ShowAll source={favoriteOffers} />;
}
