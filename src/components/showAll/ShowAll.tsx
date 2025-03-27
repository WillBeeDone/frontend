import styles from "./ShowAll.module.css";
import { JSX } from "react";
import { Link } from "react-router-dom";
import { IOfferCard, IGuestOfferPage } from "../types/OfferInterfaces";
import AddToFavoritesButton from "../addToFavorites/AddToFavorites";
import MyButton from "../myButton/MyButton";
import DOMPurify from "dompurify";

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
                  <h4 className={styles.title}>{offer.title}</h4>
                  <p className={styles.price}>
                    {" "}
                    <p className={styles.textPrice}>Price per hour: </p>{" "}
                    <p className={styles.euro}> {offer.price} € </p>
                  </p>
                </div>
              </div>

              <div className={styles.description}>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      offer.description.length < 150
                        ? DOMPurify.sanitize(offer.description)
                        : DOMPurify.sanitize(
                            offer.description.slice(0, 150) + "..."
                          ),
                  }}
                />
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
      <div className={styles.mainContainerOfferPage}>
        <div className={styles.mainPartOfferPage}>
          <div className={styles.leftPartOfferPage}>
            <img
              src={
                offer.profilePicture ||
                `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`
              }
              alt="Profile picture"
              className={styles.offerImage}
            />
            <p className={styles.name}>
              {offer.firstName} {offer.secondName}
            </p>
          </div>

          <div className={styles.rightPartOfferPage}>
            <h1 className={styles.titleOffer}>{offer.title}</h1>
            <div className={styles.locCatPrice}>
              <p className={styles.location}>{offer.location}</p>
              <p className={styles.category}>{offer.category}</p>
              <div className={styles.price}></div>
              <p className={styles.textPrice}>Price per hour </p>
              <p className={styles.euro}>{offer.price} € </p>
            </div>
            <div>
              <p
                className={styles.descriptionOffer}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(offer.description),
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.galleryContainer}>
          <img
            className={styles.parenthesis}
            src="./Left parenthesis.png"
            alt="Left parenthesis"
          />
          {offer.gallery && offer.gallery.length > 0 ? (
            offer.gallery.map((image) => (
              <img
                key={image.id}
                src={image.imageUrl}
                alt="Gallery item picture"
                className={styles.galleryItem}
                crossOrigin="anonymous"
              />
            ))
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}no-gallery-default-image.avif`}
              alt="Default picture"
              className={styles.galleryItem}
            />
          )}
          <img
            className={styles.parenthesis}
            src="./Right parenthesis.png"
            alt="Right parenthesis"
          />
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
