import { JSX } from "react";
import ShowAll from "../showAll/ShowAll";
import { useMyOffers } from "../../context/MyOffersContext";

export default function ShowMyOffers(): JSX.Element {
  const { myOfferCards } = useMyOffers();
  return <ShowAll source={myOfferCards} switcher="my-offer" />;
}
