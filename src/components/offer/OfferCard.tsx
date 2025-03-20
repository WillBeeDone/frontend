import { Link } from "react-router-dom";
//import { useOffers } from "../context/OffersContext";
import styles from"./OfferCard.module.css";
import { offerCards } from "../../test data/Offer";
import { JSX } from "react";
import ShowAll from "../shawAll/ShawAll";

export default function OfferCard(): JSX.Element {   
   
    //const { offerCards } = useOffers();
    // временно использую тест-данные test data - Offer - offersListForGuest

  return (
    <ShowAll source={offerCards}/>
  );
};



