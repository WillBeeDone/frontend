import { useParams, Link } from "react-router-dom";
//import { useGuestOffers } from "../context/OffersForGuestContext";
import style from "./GuestOfferPage.module.css";
import { offersListForGuest } from "../../test data/Offer";


const GuestOfferPage = () => {
  //const { offersListForGuest } = useGuestOffers();
  const { id } = useParams<{ id?: string }>();

  const offer = offersListForGuest.find((offer) => offer.id === Number(id));
  // временно использую тест-данные test data - Offer - offersListForGuest
  
 


       
    



  if (!offer) {
    return <p>Offer not found</p>;
  }

  return (
    <div className="offerPage-mainContainer">
      <h1>{offer.title}</h1>

      <img src={offer.profilePicture} alt={offer.name} className="offer-image" />

      <p>Name: {offer.name}</p>
      <p>{offer.location}</p>

      <p>{offer.category}</p>

      <p> {offer.price} $</p>
      <p>{offer.description}</p>
      <Link to="/">🔙 Go back</Link>

      <div className="gallery-container">
  {offer.gallery.length > 0 ? (
    offer.gallery.map((image) => (
      <img key={image} src={image} alt="image" className="gallery-item" />
    ))
  ) : (
    <img src="../../../public/gallery-default-picture.jpg" className="gallery-item-default" />
  )}
</div>

    </div>
  );
};

export default GuestOfferPage;