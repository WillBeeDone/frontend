import { JSX } from "react";
import ShowAll from "../showAll/ShowAll";
import { useMyOffers } from "../../context/MyOffersContext";

export default function ShowFavorites(): JSX.Element {
  const { myOfferCards } = useMyOffers();
  return <ShowAll source={myOfferCards} />;
}