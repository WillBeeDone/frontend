import { useOffers } from "../../context/OffersContext";
import { JSX } from "react";
import ShowAll from "../showAll/ShowAll";


export default function OfferCard(): JSX.Element {
  const { offerCards } = useOffers();
  return <ShowAll source={offerCards} />;
}
