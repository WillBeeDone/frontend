import { Link } from "react-router-dom";
//import { useOffers } from "../context/OffersContext";
import style from"./OfferCard.module.css";
import { offerCards } from "../../test data/Offer";

export default function OfferCard(): JSX.Element {   
   
    //const { offerCards } = useOffers();
    // временно использую тест-данные test data - Offer - offersListForGuest


  return (
    <div className="offers-container">
      {offerCards.map((offer) => (
        <Link key={offer.id} to={`/offer/${offer.id}`} className="offer-card">
            <h2>{offer.title}</h2>
            
            
            <div className="offer-image-container" >
          <img src={offer.profilePicture} alt={"../../../public/gallery-default-picture.jpg"} className="offer-image" />
           </div>

           <p>{offer.description.length < 30 ? offer.description : offer.description.slice(0,30) + "..."}</p>
          
           <p>{offer.firstName}</p>
           <p>{offer.secondName}</p>
           <p>{offer.location}</p>

           <p>{offer.category}</p>
          <p>Price per hour: {offer.price} $</p>
        </Link>
      ))}
    </div>
  );
};



