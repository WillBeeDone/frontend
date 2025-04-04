import styles from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX, useContext } from "react";
import Banner from "../banner/Banner";
import CategorySelector from "../categorySelector/CategorySelector";

import { OffersContext, useOffers } from "../../context/OffersContext";
import { Pagination } from "../pagination/Pagination";
import { useLocation } from "react-router-dom";
import { useFavorite } from "../../context/FavoriteContext";
import ShowAll from "../showAll/ShowAll";

export default function Main(): JSX.Element {
  const { currentPage, totalPages, setCurrentPage } =
    useContext(OffersContext)!;

  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favorite";

  // const { currentPage, totalPages, setCurrentPage } =
  //   useContext({isFavoritesPage ? FavoritesContext : OffersContext}OffersContext)!;

  const { favoriteOffers } = useFavorite();
  const { offerCards } = useOffers();
  //const { offerCards, currentPage, totalPages, setCurrentPage } = useOffers();

  const offersToDisplay = isFavoritesPage ? favoriteOffers : offerCards;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.banner}>
        <Banner />
      </div>

      <div className={styles.category}>
        <CategorySelector />
      </div>

      <div className={styles.offerCard}>
        <ShowAll source={offersToDisplay} />
        {/* <OfferCard /> */}
      </div>

      {/* Пагинация отображается всегда, но можно добавить проверку на загрузку */}
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(totalPages, 1)} // Гарантируем минимум 1 страницу
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
