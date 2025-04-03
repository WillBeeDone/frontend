import { useOffers } from "../../context/OffersContext";
import { JSX } from "react";
import ShowAll from "../showAll/ShowAll";
import MyButton from "../myButton/MyButton";
import styles from "./OfferCard.module.css";

export default function OfferCard(): JSX.Element {
  const { offerCards } = useOffers();


  return <ShowAll source={offerCards} />;
}
