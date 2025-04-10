import { useParams } from "react-router-dom";
//import { guestOfferPageList } from "../../test data/Offer";
import { useEffect, useState } from "react";
import ShowAll from "../showAll/ShowAll";
import { IGuestOfferPage } from "../types/OfferInterfaces";
import { transformGuestOfferPage } from "../backToFrontTransformData/BackToFrontTransformData";
import styles from "./GuestOfferPage.module.css"

const GuestOfferPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [offer, setOffer] = useState<IGuestOfferPage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //const offer = guestOfferPageList.find((offer) => offer.id === Number(id));
  //временно использую тест-данные test data - Offer - offerCards

  useEffect(() => {
    const fetchOffer = async () => {
      if (!id) return;
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`/api/offers/${id}`,  {headers: {
          'Authorization' : `Bearer ${accessToken}`
              }});
        if (!response.ok) {
          throw new Error("Failed to fetch offer");
        }
        
        //состыковка ключей бек => фронт
        const data: IGuestOfferPage = await response.json();
        console.log("inside - fetchOffer", data);
        const formattedGuestOfferPage = transformGuestOfferPage(data);
        setOffer(formattedGuestOfferPage);
      } catch (error) {
        setError("Only Active Offers are shown.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.errorText}>{error}</p>;
  if (!offer) return <p>Offer not found</p>;

  return <ShowAll source={offer} switcher="guestOfferPage"/>;
};

export default GuestOfferPage;
