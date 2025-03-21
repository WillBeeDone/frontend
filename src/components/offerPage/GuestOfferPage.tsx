import { useParams, Link } from "react-router-dom";
import styles from "./GuestOfferPage.module.css";
import { guestOfferPageList } from "../../test data/Offer";
import { useEffect, useState } from "react";
import ShowAll from "../shawAll/ShawAll";
//import { IGuestOfferPage } from "../types/OfferInterfaces";

  
  const GuestOfferPage = () => {
    const { id } = useParams<{ id?: string }>();
    //const [offer, setOffer] = useState<IGuestOfferPage | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


   
    const offer = guestOfferPageList.find((offer) => offer.id === Number(id)); 
    //временно использую тест-данные test data - Offer - offerCards
  
    /*useEffect(() => {
      const fetchOffer = async () => {
        if (!id) return;
        try {
          const response = await fetch(`https://api.example.com/offers/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch offer");
          }
          const data: IGuestOfferPage = await response.json();
          setOffer(data);
        } catch (error) {
          setError("Mistake while receiving offer");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOffer();
    }, [id]);
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    */
    if (!offer) return <p>Offer not found</p>;

    return (
      <ShowAll source={offer} switcher="guestOfferPage"/>
    );
  };
  
  export default GuestOfferPage;