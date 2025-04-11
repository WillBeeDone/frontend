import { useParams } from "react-router-dom";
//import { guestOfferPageList } from "../../test data/Offer";
import { useEffect, useState } from "react";
import ShowAll from "../showAll/ShowAll";
import { IGuestOfferPage } from "../types/OfferInterfaces";
import { transformGuestOfferPage } from "../backToFrontTransformData/BackToFrontTransformData";
import styles from "./GuestOfferPage.module.css";
import { useAppSelector } from "../../app/hooks";

const GuestOfferPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [offer, setOffer] = useState<IGuestOfferPage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchOffer = async () => {
      let response;
      if (!id) return;
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (isAuthenticated) {
          response = await fetch(`/api/offers/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } else {
          response = await fetch(`/api/offers/${id}`);
        }
        if (!response.ok) {
          throw new Error("Failed to fetch offer");
        }

        //состыковка ключей бек => фронт
        const data: IGuestOfferPage = await response.json();
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
