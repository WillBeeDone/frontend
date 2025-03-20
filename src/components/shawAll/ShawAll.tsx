import styles from "./ShowAll.module.css";
import { JSX } from "react";
import { Link } from "react-router-dom";
import { IOfferCard, IGuestOfferPage } from "../../components/types/OfferInterfaces";

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
        {offers.map((offer) => (
          <Link key={offer.id} to={`/offer/${offer.id}`} className="offer-card">
            <h2>{offer.title}</h2>

            <div className="offer-image-container">
              <img
                src={offer.profilePicture || "/gallery-default-picture.jpg"}
                alt="Profile"
                className="offer-image"
              />
            </div>

            <p>{offer.description.length < 30 ? offer.description : offer.description.slice(0, 30) + "..."}</p>
            <p>{offer.firstName} {offer.secondName}</p>
            <p>{offer.location}</p>
            <p>{offer.category}</p>
            <p>Price per hour: {offer.price} $</p>
          </Link>
        ))}
      </div>
    );
  }

  if (switcher === "guestOfferPage") {
    const offer = source as IGuestOfferPage;

    return (
      <div className="offerPage-mainContainer">
        <h1>{offer.title}</h1>

        <img
          src={offer.profilePicture || "/gallery-default-picture.jpg"}
          alt="Profile Picture"
          className="offer-image"
        />

        <p>Name: {offer.firstName} {offer.secondName}</p>
        <p>{offer.location}</p>
        <p>{offer.category}</p>
        <p>{offer.price} $</p>
        <p>{offer.description}</p>
        <Link to="/">🔙 Go back</Link>

        <div className="gallery-container">
          {offer.gallery && offer.gallery.length > 0 ? (
            offer.gallery.map((image, index) => (
              <img key={index} src={image} alt="Gallery Item" className="gallery-item" />
            ))
          ) : (
            <img src="/gallery-default-picture.jpg" className="gallery-item-default" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="no-data">
      <p>I'm waiting for data ;)</p>
    </div>
  );
}