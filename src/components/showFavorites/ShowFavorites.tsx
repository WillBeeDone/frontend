import { JSX } from "react";
import ShowAll from "../showAll/ShowAll";
import { useFavorites } from "../../context/FavoritesContext";

export default function ShowFavorites(): JSX.Element {
  const { favoriteOffers } = useFavorites();
  return <ShowAll source={favoriteOffers} />;
}
