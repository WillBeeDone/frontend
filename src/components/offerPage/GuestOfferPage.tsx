import { useParams } from "react-router-dom";
//import { guestOfferPageList } from "../../test data/Offer";
import { useEffect, useState } from "react";
import ShowAll from "../showAll/ShowAll";
import { IGuestOfferPage } from "../types/OfferInterfaces";
import { transformGuestOfferPage } from "../backToFrontTransformData/BackToFrontTransformData";
import styles from "./GuestOfferPage.module.css";
import { useAppSelector } from "../../app/hooks";
import apiClient from "../../features/auth/apiClient";

const GuestOfferPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [offer, setOffer] = useState<IGuestOfferPage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

useEffect(() => {
  const fetchOffer = async () => {
    if (!id) return;
    try {
      let response;
      if (isAuthenticated) {
        response = await apiClient.get(`/api/offers/${id}`);
      } else {
        response = await apiClient.get(`/api/offers/${id}`, { headers: {} });
      }

      const data: IGuestOfferPage = response.data;
      const formattedGuestOfferPage = transformGuestOfferPage(data);
      setOffer(formattedGuestOfferPage);
    } catch (error) {
      setError("Mistake while offer receive.");
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

  return <ShowAll source={offer} switcher="guestOfferPage" />;
};

export default GuestOfferPage;
