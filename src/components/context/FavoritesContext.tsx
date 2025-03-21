import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IOfferCard } from "../types/OfferInterfaces";
import { useOffers } from "./OffersContext";

interface FavoritesContextType {
  favoriteOffers: IOfferCard[];
  addFavorite: (offerId: string) => void;
  removeFavorite: (offerId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { offerCards, selectedCity, selectedCategory, selectedKeyWord } = useOffers();
  const [favoriteOffers, setFavoriteOffers] = useState<IOfferCard[]>([]);
  const userId = "currentUserId"; //TODO получить userId с контекста авторизации

  // получение от сервера списка любимых с учетом параметров
  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `https://api.example.com/favorites?userId=${userId}&city=${selectedCity}&category=${selectedCategory}&keyWord=${selectedKeyWord || "all"}`
      );
      const data: IOfferCard[] = await response.json();
      setFavoriteOffers(data);
    } catch (error) {
      console.error("Error while receiving favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [selectedCity, selectedCategory, selectedKeyWord]);

  // запрос на сервер для добавления в любимые
const addFavorite = async (offerId: string) => {
  try {
    await fetch("https://api.example.com/favorites/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, offerId }),
    });

    // находим добавляемый офер в списке чужих оферов (дополнительная проверка)
    const newOffer = offerCards.find(o => o.id === Number(offerId));
    if (!newOffer) return; 

    setFavoriteOffers((prev) => [...prev, newOffer]);
  } catch (error) {
    console.error("Error while adding to favorites:", error);
  }
};

  // удаление офера из любимых
  const removeFavorite = async (offerId: string) => {
    try {
      await fetch("https://api.example.com/favorites/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, offerId }),
      });

      setFavoriteOffers((prev) => prev.filter((offer) => offer.id !== Number(offerId)));
    } catch (error) {
      console.error("Error while removing from favorites:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteOffers, addFavorite, removeFavorite }}>
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