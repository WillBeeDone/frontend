import { JSX, useContext } from "react";
import ShowAll from "../showAll/ShowAll";
import styles from "./ShowFavorites.module.css"
import { FavoriteContext, useFavorite } from "../../context/FavoriteContext";
import Banner from "../banner/Banner";
import CategorySelector from "../categorySelector/CategorySelector";
import { Pagination } from "../pagination/Pagination";

export default function ShowFavorites(): JSX.Element {
  
  const { favoriteOffers } = useFavorite();
   const { currentPage, totalPages, setCurrentPage, setSelectedCategory } =
      useContext(FavoriteContext)!;
  const {selectedKeyWord, setSelectedKeyWord} = useFavorite();

  return (

    <div className={styles.mainContainer}>
    <div className={styles.banner}>
      <Banner selectedKeyWord={selectedKeyWord} setSelectedKeyWord={setSelectedKeyWord}/>
    </div>

    <div className={styles.category}>
      <CategorySelector setSelectedCategory={setSelectedCategory}/>
    </div>

    <div className={styles.offerCard}>
    {/* <ShowAll source={favoriteOffers} /> */}
    <ShowAll source={favoriteOffers} isFavotite={true}/>

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


  )
};
