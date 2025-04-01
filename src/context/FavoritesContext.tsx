import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IOfferCard } from "../components/types/OfferInterfaces";
import { useOffers } from "./OffersContext";
import { favorites } from "../test data/Offer";

interface FavoritesContextType {
  favoriteOffers: IOfferCard[];
  addFavorite: (offerId: string) => void;
  removeFavorite: (offerId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { offerCards } = useOffers();
  const [favoriteOffers, setFavoriteOffers] = useState<IOfferCard[]>([]);

  // получение от сервера списка любимых с учетом параметров
  //   const fetchFavorites = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.example.com/favorites?userId=${userId}&city=${selectedCity}&category=${selectedCategory}&keyWord=${selectedKeyWord || "all"}`
  //       );
  //       const data: IOfferCard[] = await response.json();

  //       setFavoriteOffers(data);

  //     } catch (error) {
  //       console.error("Error while receiving favorites:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchFavorites();
  //   }, [selectedCity, selectedCategory, selectedKeyWord]);

  //   // запрос на сервер для добавления в любимые
  // const addFavorite = async (offerId: string) => {
  //   try {
  //     await fetch("https://api.example.com/favorites/add", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ userId, offerId }),
  //     });

  //     // находим добавляемый офер в списке чужих оферов (дополнительная проверка)
  //     const newOffer = offerCards.find(o => o.id === Number(offerId));
  //     if (!newOffer) return;

  //     setFavoriteOffers((prev) => [...prev, newOffer]);
  //   } catch (error) {
  //     console.error("Error while adding to favorites:", error);
  //   }
  // };

  //   // удаление офера из любимых
  //   const removeFavorite = async (offerId: string) => {
  //     try {
  //       await fetch("https://api.example.com/favorites/remove", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ userId, offerId }),
  //       });

  //       setFavoriteOffers((prev) => prev.filter((offer) => offer.id !== Number(offerId)));
  //     } catch (error) {
  //       console.error("Error while removing from favorites:", error);
  //     }
  //   };

  //локальные данные
  const fetchFavorites = async () => {
    try {
      // здесь фетч запрос на сервер
      setFavoriteOffers(favorites);
    } catch (error) {
      console.error("Error while receiving favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // добавление
  const addFavorite = (offerId: string) => {
    // проверка есть ли уже в любимых
    if (favoriteOffers.some((offer) => offer.id === Number(offerId))) return;

    const newOffer = offerCards.find((o) => o.id === Number(offerId));
    if (!newOffer) return;

    setFavoriteOffers((prev) => [...prev, newOffer]);
  };

  // удаление
  const removeFavorite = (offerId: string) => {
    setFavoriteOffers((prev) =>
      prev.filter((offer) => offer.id !== Number(offerId))
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteOffers, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("FavoritesContext do not used inside FavoritesProvider");
  }
  return context;
};
