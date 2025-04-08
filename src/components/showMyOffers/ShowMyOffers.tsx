import { JSX } from "react";
import ShowAll from "../showAll/ShowAll";
import { useMyOffers } from "../../context/MyOffersContext";


export default function ShowMyOffers(): JSX.Element {
  
  const { myOfferCards } = useMyOffers();
  console.log("в ShowMyOffers - ", myOfferCards);
  
  
  return (
  
  <ShowAll source={myOfferCards} switcher="my-offer"/>


  )
}