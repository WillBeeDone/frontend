import { useParams, Link } from "react-router-dom";
import styles from "./GuestOfferPage.module.css";
//import { guestOfferPageList } from "../../test data/Offer";
import { useEffect, useState } from "react";
import ShowAll from "../shawAll/ShawAll";
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


          // стало:

        //   {
        //     "id": 1,
        //     "title": "Affordable and Quick Car Repairs",
        //     "categoryResponseDto": {
        //         "name": "Computer Technician"
        //     },
        //     "pricePerHour": 15.00,
        //     "description": "I’m an experienced auto mechanic. I can quickly and affordably fix your car, from minor repairs to full diagnostics. Available on weekends, contact me for a reliable service!",
        //     "images": [
        //         {
        //             "id": 1,
        //             "imageUrl": "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1BtS4Z.img?w=800&h=435&q=60&m=2&f=webp"
        //         }
        //     ],
        //     "userFilterResponseDto": {
        //         "firstName": "Lukas",
        //         "lastName": "Schneider",
        //         "profilePicture": "https://i.imgur.com/c71RCHi.jpeg",
        //         "locationResponseDto": {
        //             "cityName": "Hamburg"
        //         }
        //     }
        // }


          //было:
        //   {
        //     "id": 1,
        //     "title": "Affordable and Quick Car Repairs",
        //     "categoryResponseDto": {
        //         "name": "Computer Technician"
        //     },
        //     "pricePerHour": 15.00,
        //     "description": "I’m an experienced auto mechanic. I can quickly and affordably fix your car, from minor repairs to full diagnostics. Available on weekends, contact me for a reliable service!",
        //     "gallery": {
        //         "id": 2,
        //         "imageUrl": [
        //             "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1BtS4Z.img?w=800&h=435&q=60&m=2&f=webp"
        //         ]
        //     },
        //     "userFilterResponseDto": {
        //         "firstName": "Lukas",
        //         "lastName": "Schneider",
        //         "profilePicture": "https://i.imgur.com/c71RCHi.jpeg",
        //         "locationResponseDto": {
        //             "cityName": "Hamburg"
        //         }
        //     }
        // }









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
    
    return (
      <ShowAll source={offer} switcher="guestOfferPage"/>
    );
  };
  
  export default GuestOfferPage;