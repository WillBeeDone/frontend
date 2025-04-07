import { JSX } from "react";
import ShowAll from "../showAll/ShowAll";
import { useMyOffers } from "../../context/MyOffersContext";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function ShowFavorites(): JSX.Element {
  const { isLoading, error, user } = useSelector((state: RootState) => state.auth);

  const { myOfferCards } = useMyOffers();


  return (


  <ShowAll source={myOfferCards} />
  

  )
}