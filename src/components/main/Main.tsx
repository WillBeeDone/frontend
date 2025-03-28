import styles from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX, useContext } from "react";
import Banner from "../banner/Banner";
import CategorySelector from "../categorySelector/CategorySelector";

import { OffersContext } from "../context/OffersContext";
import { Pagination } from "../pagination/Pagination";

export default function Main(): JSX.Element {
  const { 
    currentPage, 
    totalPages, 
    setCurrentPage,
  } = useContext(OffersContext)!;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.banner}>
        <Banner />
      </div>

      <div className={styles.category}>
        <CategorySelector />
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