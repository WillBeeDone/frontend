
import { useOffers } from "../context/OffersContext";
import styles from"./OfferCard.module.css";
import { JSX } from "react";
import ShowAll from "../shawAll/ShawAll";

export default function OfferCard(): JSX.Element {   
   
    const { offerCards } = useOffers();
  
  return (
    <ShowAll source={offerCards} />
  );
};



