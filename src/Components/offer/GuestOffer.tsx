import { Link } from "react-router-dom";
//import { useGuestOffers } from "../context/OffersForGuestContext";
import style from"./GuestOffer.module.css";
import { offersListForGuest } from "../../test data/Offer";

interface IGuestOffer {
    text?:string
}

export default function GuestOffer({
    text = "text",
  }: IGuestOffer): JSX.Element {
    
      
   
    //const { offersListForGuest } = useGuestOffers();
    // временно использую тест-данные test data - Offer - offersListForGuest


  return (
    <div className="offers-container">
      {offersListForGuest.map((offer) => (
        <Link key={offer.id} to={`/offer/${offer.id}`} className="offer-card">
            <h2>{offer.title}</h2>
            
            
            <div className="offer-image-container" >
          <img src={offer.profilePicture} alt={offer.name} className="offer-image" />
           </div>

           <p>{offer.description.length < 30 ? offer.description : offer.description.slice(0,30) + "..."}</p>
          
           <p>{offer.name}</p>

           <p>{offer.category}</p>
          <p>Price per hour: {offer.price} $</p>
        </Link>
      ))}
    </div>
  );
};



