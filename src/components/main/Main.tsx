import styles from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX, useContext } from "react";
import Banner from "../banner/Banner";
import CategorySelector from "../categorySelector/CategorySelector";

import { OffersContext, useOffers } from "../../context/OffersContext";
import { Pagination } from "../pagination/Pagination";

export default function Main(): JSX.Element {
  const { currentPage, totalPages, setCurrentPage, setSelectedCategory } =
    useContext(OffersContext)!;

  const { selectedKeyWord, setSelectedKeyWord } = useOffers();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.banner}>
        <Banner
          selectedKeyWord={selectedKeyWord}
          setSelectedKeyWord={setSelectedKeyWord}
        />
      </div>

      <div className={styles.category}>
        <CategorySelector setSelectedCategory={setSelectedCategory} />
      </div>

      <div className={styles.offerCard}>
        <OfferCard />
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
