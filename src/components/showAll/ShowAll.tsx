import { JSX, useState } from "react";
import styles from "./ShowAll.module.css";
import { Link } from "react-router-dom";
import { IOfferCard, IGuestOfferPage } from "../types/OfferInterfaces";
import AddToFavoritesButton from "../addToFavorites/AddToFavorites";
import MyButton from "../myButton/MyButton";
import DOMPurify from "dompurify";
import Gallery from "../gallery/Gallery";

interface ShowAllProps {
  source: IOfferCard[] | IGuestOfferPage | null;
  switcher?: "list" | "guestOfferPage";
}

export default function ShowAll({
  source,
  switcher = "list",
}: ShowAllProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleNext = () => {
    if (currentIndex < (source as IGuestOfferPage).gallery.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openModal = (imageUrl: string, index: number) => {
    setSelectedImage(imageUrl);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(
        (source as IGuestOfferPage).gallery[currentIndex - 1].imageUrl
      );
    }
  };

  const handleNextImage = () => {
    if (currentIndex < (source as IGuestOfferPage).gallery.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(
        (source as IGuestOfferPage).gallery[currentIndex + 1].imageUrl
      );
    }
  };

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
                    <p className={styles.textPrice}>Price per hour: </p>
                    <p className={styles.euro}>{offer.price} € </p>
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

        <Gallery
          gallery={offer.gallery}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          openModal={openModal}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

        {/* Модальное окно для отображения изображения */}
        {isModalOpen && selectedImage && (
          <div className={styles.modal} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка для перехода к предыдущему изображению */}
              <span
                className={`${styles.navigationButton} ${
                  currentIndex === 0 ? styles.disabled : ""
                }`}
                onClick={currentIndex !== 0 ? handlePrevImage : undefined}
              >
                &lt;
              </span>

              <img
                src={selectedImage}
                alt="Full size"
                className={styles.modalImage}
              />

              {/* Кнопка для перехода к следующему изображению */}
              <span
                className={`${styles.navigationButton} ${
                  currentIndex === offer.gallery.length - 1
                    ? styles.disabled
                    : ""
                }`}
                onClick={
                  currentIndex !== offer.gallery.length - 1
                    ? handleNextImage
                    : undefined
                }
              >
                &gt;
              </span>

              {/* Кнопка для закрытия модального окна */}
              <button className={styles.closeButton} onClick={closeModal}>
                X
              </button>
            </div>
          </div>
        )}

        <AddToFavoritesButton offer={offer} />
        <Link to="/">🔙 Go back</Link>
      </div>
    );
  }

  return (
    <div className="no-data">
      <p>I'm waiting for data ;</p>
    </div>
  );
}
