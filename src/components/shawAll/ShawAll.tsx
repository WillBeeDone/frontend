import styles from "./ShowAll.module.css";
import { JSX } from "react";
import { Link } from "react-router-dom";
import { IOfferCard, IGuestOfferPage } from "../../components/types/OfferInterfaces";
import AddToFavoritesButton from "../addToFavorites/AddToFaforites";

interface ShowAllProps {
  source: IOfferCard[] | IGuestOfferPage | null;
  switcher?: "list" | "guestOfferPage";
}

export default function ShowAll({
  source,
  switcher = "list",
}: ShowAllProps): JSX.Element {
  
  if (!source || (switcher === "list" && (source as IOfferCard[]).length === 0)) {
    return (
      <div className="no-data">
        <p>I'm waiting for data ;)</p>
      </div>
    );
  }

  if (switcher === "list") {
    const offers = source as IOfferCard[];
  
    return (
      <div className="offers-container">
        {offers.map((offer) => {
          const imgSource = offer.profilePicture || `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`;
  
          return (
            <Link key={offer.id} to={`/offer/${offer.id}`} className="offer-card">
              <h2>{offer.title}</h2>
  
              <div className="offer-image-container">
                <img
                  src={imgSource}
                  alt="Profile picture"
                  className="offer-image"
                  width={200}
                  height={200}
                  crossOrigin="anonymous"
                />
              </div>
  
              <p>{offer.description.length < 30 ? offer.description : offer.description.slice(0, 30) + "..."}</p>
              <p>{offer.firstName} {offer.secondName}</p>
              <p>{offer.location}</p>
              <p>{offer.category}</p>
              <p>Price per hour: {offer.price} $</p>
              <AddToFavoritesButton offer={offer}/>
            </Link>
          );
        })}
      </div>
    );
  }

  if (switcher === "guestOfferPage") {
    const offer = source as IGuestOfferPage;

    //const imgSource = offer.profilePicture || `${import.meta.env.BASE_URL}gallery-default-picture.jpg`;
    //const imgSource = offer.gallery || `${import.meta.env.BASE_URL}gallery-default-picture.jpg`;

    return (
      <div className="offerPage-mainContainer">
        <h1>{offer.title}</h1>

        <img
          src={offer.profilePicture ||  `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`}
          alt="Profile picture"
          className="offer-image"
        />

        <p>Name: {offer.firstName} {offer.secondName}</p>
        <p>{offer.location}</p>
        <p>{offer.category}</p>
        <p>{offer.price} $</p>
        <p>{offer.description}</p>

        <div className="gallery-container">
          {offer.gallery && offer.gallery.length > 0 ? (
            offer.gallery.map((image) => (
              <img key={image.id} src={image.imageUrl} alt="Gallery item picture" className="gallery-item" width={200} height={200} crossOrigin="anonymous"/>
              
            ))
          ) : (
            <img src={`${import.meta.env.BASE_URL}no-gallery-default-image.avif`} alt="Default picture" className="gallery-item-default" />
          )}
        </div>
        <AddToFavoritesButton offer={offer}/>
          <Link to="/">🔙 Go back</Link>
      </div>
    );
  }

  return (
    <div className="no-data">
      <p>I'm waiting for data ;)</p>
    </div>
  );
}