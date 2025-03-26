import styles from "./ShowAll.module.css";
import { JSX } from "react";
import { Link } from "react-router-dom";
import { IOfferCard, IGuestOfferPage } from "../types/OfferInterfaces";
import AddToFavoritesButton from "../addToFavorites/AddToFavorites";
import MyButton from "../myButton/MyButton";

interface ShowAllProps {
  source: IOfferCard[] | IGuestOfferPage | null;
  switcher?: "list" | "guestOfferPage";
}

export default function ShowAll({
  source,
  switcher = "list",
}: ShowAllProps): JSX.Element {
  if (
    !source ||
    (switcher === "list" && (source as IOfferCard[]).length === 0)
  ) {
    return (
      <div className="no-data">
        <p>I'm waiting for data ;)</p>
      </div>
    );
  }

  if (switcher === "list") {
    const offers = source as IOfferCard[];

    return (
      <div className={styles.offerContainer}>
        {offers.map((offer) => {
          const imgSource =
            offer.profilePicture ||
            `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`;

          return (
            <div key={offer.id} className={styles.offerCard}>
              <div className={styles.firstPartOfferCard}>
                <div className={styles.offerCardleftPart}>
                  <div className={styles.offerCardImageContainer}>
                    <img
                      className={styles.offerCardImage}
                      src={imgSource}
                      alt="Profile picture"
                      width={150}
                      height={150}
                      crossOrigin="anonymous"
                    />
                  </div>

                  <p className={styles.category}>{offer.category}</p>
                </div>

                <div className={styles.offerCardRightPart}>
                  <p className={styles.name}>
                    {offer.firstName} {offer.secondName}
                  </p>
                  <p className={styles.location}>{offer.location}</p>
                  <h4 className={styles.title}>{offer.title.length > 40 ?  offer.title.slice(0,40).concat("...") : offer.title}</h4>
                  <p className={styles.price}>
                    {" "}
                    <p className={styles.textPrice}>Price per hour: </p>{" "}
                    <p className={styles.euro}> {offer.price} € </p>
                  </p>
                </div>
              </div>

              <div className={styles.description}>
                <p>
                  {offer.description.length < 150
                    ? offer.description
                    : offer.description.slice(0, 150) + "..."}
                </p>
              </div>
              <div className={styles.heartAndView}>
              <div>
                <AddToFavoritesButton offer={offer} />
              </div>
              <div className={styles.view}>
                <Link to={`/offer/${offer.id}`}>
                  <MyButton variant="primary" text="View" />
                </Link>
              </div>
              </div>
            </div>
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
          src={
            offer.profilePicture ||
            `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`
          }
          alt="Profile picture"
          className="offer-image"
        />

        <p>
          Name: {offer.firstName} {offer.secondName}
        </p>
        <p>{offer.location}</p>
        <p>{offer.category}</p>
        <p>{offer.price} $</p>
        <p>{offer.description}</p>

        <div className="gallery-container">
          {offer.gallery && offer.gallery.length > 0 ? (
            offer.gallery.map((image) => (
              <img
                key={image.id}
                src={image.imageUrl}
                alt="Gallery item picture"
                className="gallery-item"
                width={200}
                height={200}
                crossOrigin="anonymous"
              />
            ))
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}no-gallery-default-image.avif`}
              alt="Default picture"
              className="gallery-item-default"
            />
          )}
        </div>
        <AddToFavoritesButton offer={offer} />
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
