import { useParams } from "react-router-dom";
//import { guestOfferPageList } from "../../test data/Offer";
import { useEffect, useState } from "react";
import ShowAll from "../showAll/ShowAll";
import { IGuestOfferPage } from "../types/OfferInterfaces";
import { transformGuestOfferPage } from "../backToFrontTransformData/BackToFrontTransformData";

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
        const response = await fetch(`/api/offers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch offer");
        }

        //состыковка ключей бек => фронт
        const data: IGuestOfferPage = await response.json();
        const formattedGuestOfferPage = transformGuestOfferPage(data);
        setOffer(formattedGuestOfferPage);
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
  if (!offer) return <p>Offer not found</p>;

  return <ShowAll source={offer} switcher="guestOfferPage"/>;
};

export default GuestOfferPage;
