import { JSX, useState } from "react";
import styles from "./ShowAll.module.css";
import { Link, useLocation } from "react-router-dom";
import { IOfferCard, IGuestOfferPage, IMyOfferCard } from "../types/OfferInterfaces";
import AddToFavoritesButton from "../addToFavorites/AddToFavorites";
import MyButton from "../myButton/MyButton";
import DOMPurify from "dompurify";
import Gallery from "../gallery/Gallery";
import { useOffers } from "../../context/OffersContext";
import { useFavorite } from "../../context/FavoriteContext";
import { useMyOffers } from "../../context/MyOffersContext";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import Loader from "../loader/Loader";

interface ShowAllProps {
  source: IOfferCard[] | IGuestOfferPage | null;
  switcher?: "list" | "guestOfferPage" | "my-offer";
  isFavotite?:boolean;
}
//две функции ниже нужны чтобы при обрезке description не учитывался html в тексте
function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function truncateDescription(description: string, maxLength: number): string {
  const plainText = stripHtml(description);
  return plainText.length > maxLength
    ? plainText.slice(0, maxLength) + "..."
    : plainText;
}

export default function ShowAll({
  source,
  switcher = "list",
  isFavotite,
}: ShowAllProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const {offerCards, setOfferCards} = useOffers();
  const {favoriteOffers, setFavoriteOffers} = useFavorite();

  //проверка авторизации
  const isAuthenticated = useSelector(selectIsAuthenticated);

  //для сортировки любимых по цене
  const offerCardsFinal : IOfferCard[] = isFavotite ? favoriteOffers : offerCards;
  const setOfferCardsFinal : (offer: IOfferCard[]) => void = isFavotite ? setFavoriteOffers : setOfferCards;

  // для операций с my offers
  const { isLoading, removeOfferFromMyOffers, activateDeactivateMyOffers} = useMyOffers();
  const handleActivate = async (id: number) => {
    await activateDeactivateMyOffers(id);
  };
  const handleRemove = async (id: number) => {
    const confirmed = window.confirm("Do you confirm offer removing?");
    if (!confirmed) return;
    await removeOfferFromMyOffers(id);
  };

  //нужно для возврата к правильному списку по нажатию Go back
  const location = useLocation();
  const goBackPath = location.state?.from || "/";


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
    ((switcher === "list" || "my-offer" )  && (source as IOfferCard[]).length === 0)
  ) {
    return (
      <div className="no-data">
        <p>There is no offers... ;)</p>
      </div>
    );
  }

  if (switcher === "list") {
    const offers = source as IOfferCard[];

    return (
      <>
      {offers ? (
      <div className={styles.offerCardMain}>
        <div className={styles.sortButton}>
          <MyButton data-testid="MyButtonHomePageSort_JnHb" text="Price" isSortButton={true} offerCards={offerCardsFinal} setOfferCards={setOfferCardsFinal} />
        </div>
      <div className={styles.offerContainer}>
        {offers.map((offer) => {
          const imgSource =
            offer.profilePicture || "/no-profilePicture-default-image.jpg";

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
                  <h4 className={styles.title}>
                    {offer.title.length > 40
                      ? offer.title.slice(0, 30).concat("...")
                      : offer.title}
                  </h4>
                  <div className={styles.price}>
                    <p className={styles.textPrice}>Price per hour: </p>
                    <p className={styles.euro}>{offer.price} € </p>
                  </div>
                </div>
              </div>

              <div className={styles.descriptionOffer}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      truncateDescription(offer.description, 130)
                    ),
                  }}
                />
              </div>
              <div className={styles.heartAndView}>
                <div>
                  <AddToFavoritesButton data-testid="AddToFavoritesButtonHomePage_HgyfTy" offer={offer} />
                </div>
                <div className={styles.view}>
                  <Link to={`/offer/${offer.id}`} state={{ from: location.pathname }}>
                    <MyButton data-testid="ViewBtnHomePage_Hydgr" variant="primary" text="View" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      ) : (<Loader/>)}
      </>
    );
  }


  if (switcher === "my-offer") {
    const offers = source as IMyOfferCard[];

    return (
      <>
      {offers ? (
      <div className={styles.offerCardMainMyOffer}>
      <div className={styles.offerContainer}>
        {offers.map((offer) => {
          const imgSource =
            offer.profilePicture || "/no-profilePicture-default-image.jpg";

          return (
            <div className={styles.wrapperOfferCard}>
            <div key={offer.id} className={offer.active ? styles.offerCard : styles.offerCardDeactivation}>
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
                  <h4 className={styles.title}>
                    {offer.title.length > 40
                      ? offer.title.slice(0, 30).concat("...")
                      : offer.title}
                  </h4>
                  <div className={styles.price}>
                    <p className={styles.textPrice}>Price per hour: </p>
                    <p className={styles.euro}>{offer.price} € </p>
                  </div>
                </div>
              </div>

              <div className={styles.descriptionOffer}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      truncateDescription(offer.description, 130)
                    ),
                  }}
                />
              </div>
              <div className={styles.heartAndView}>
                <div className={styles.view}>
                  <Link to={`/offer/${offer.id}`} state={{ from: location.pathname }}>
                    <MyButton data-testid="ViewBtnHomePage_Hydgr" variant="primary" text="View" />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.downButtonContainer}>
                <div className={styles.deactivateButton}>
                <MyButton
                type="submit"
                text={offer.active ? "Deactivate" : "Activate"}
                variant={offer.active ? "danger"  : "easy"  }
                func={() => handleActivate(offer.id)}
                />
                </div>
              <MyButton
               type="submit"
               text={isLoading ? "Loading…" : "Delete"}
              disabled={isLoading}
              func={() => handleRemove(offer.id)}
              variant="danger"
              />
              </div>
        </div>
          );
        })}
      </div>
      </div>
      ) : (<Loader/>)}
      </>
    );
  }


  if (switcher === "guestOfferPage") {
    const offer = source as IGuestOfferPage;

    return (
      <>
      {offer ? (
      <div className={styles.mainContainerOfferPage}>
        <div className={styles.mainPartOfferPage}>
          <div className={styles.leftPartOfferPage}>
            <div className={styles.profileImageContainer}>
              <img
                src={
                  offer.profilePicture ||
                  `${
                    import.meta.env.BASE_URL
                  }no-profilePicture-default-image.jpg`
                }
                alt="Profile picture"
                className={styles.offerImage}
              />
              <div className={styles.AddToFavoritesContainer}>
                <div className={styles.AddToFavoritesBtn}>
                  <AddToFavoritesButton data-testid="AddToFavoritesButtonOfferPage_JnHygdT"
                    className={styles.AddToFavorites}
                    offer={offer}
                  />
                </div>
              </div>
            </div>
            <p className={styles.offerPageName}>
              {offer.firstName} {offer.secondName}
            </p>
             {isAuthenticated ? (<div> <span>{offer.phone}</span><br /><span>{offer.email}</span></div>) : (<Link data-testid="LinkSignInOfferPage_fJndhTy" to="/sign-in-form">
              <div className={styles.getContact}>
                <img src="./call-phone.png" alt="call-phone icon" />
                <div className={styles.textSignInGetContact}>
                  <p> Sign in</p>
                  <p> to get the contact.</p>
                </div>
                <img src="./mail.png" alt="mail icon" />
              </div>
            </Link>)}
            
          </div>
          <div className={styles.rightPartOfferPage}>
            <h1 className={styles.titleOffer}>{offer.title}</h1>
            <div className={styles.locCatPrice}>
              <p className={styles.location}>{offer.location}</p>
              <p className={styles.category}>{offer.category}</p>
              <div>
                <p className={styles.textPrice}>Price per hour </p>
                <p className={styles.euro}>{offer.price} € </p>
              </div>
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
          className={styles.galleryContainer}
          gallery={offer.gallery}
          currentIndex={currentIndex}
          openModal={openModal}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

        {isModalOpen && selectedImage && (
          <div className={styles.modal} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
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

              <button className={styles.closeButton} onClick={closeModal}>
                X
              </button>
            </div>
          </div>
        )}


{/* 
    <Link data-testid="GoBackbtnOfferPage_HLkdyTy" className={styles.goBackBtn} to={location.pathname === "/favorite" ? "/favorite" : location.pathname === "/my-offers"? "/my-offers" : "/"}>
          🔙 Go back
        </Link> */}
       
        <Link data-testid="GoBackbtnOfferPage_HLkdyTy" className={styles.goBackBtn} to={goBackPath}>
          🔙 Go back
        </Link>
      </div>
       ) : (<Loader/>)}
      </>
    );
  }

  return (
    <div className="no-data">
      <p>I'm waiting for data ;</p>
    </div>
  );
}
