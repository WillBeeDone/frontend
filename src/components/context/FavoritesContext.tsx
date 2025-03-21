import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IOfferCard } from "../types/OfferInterfaces";



interface FavoritesContextType {
  
  favoritesCards:IOfferCard[];
  setFavoritesCards: (offer: IOfferCard[]) => void;

  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedKeyWord: string;
  setSelectedKeyWord: (category: string) => void;

  receiveFavorites: (city?: string, category?: string, keyWord?: string) => void;
}


const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoritesCards, setFavoritesCards] = useState<IOfferCard[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedKeyWord,  setSelectedKeyWord] = useState<string>("");

  const receiveFavorites = async (city: string = selectedCity, category: string = selectedCategory, keyWord: string = selectedKeyWord || "all") => {
    try {
      const response = await fetch(`https://api.example.com/offers?city=${city}&category=${category}&keyWord=${keyWord}`);
      const data: IOfferCard[] = await response.json();
      setFavoritesCards(data);
    } catch (error) {
      console.error("Mistake while favorite offers receive:", error);
    }
  };

  const sendFavorites = async (city: string = selectedCity, category: string = selectedCategory, keyWord: string = selectedKeyWord || "all") => {
    try {
      const response = await fetch(`https://api.example.com/offers?city=${city}&category=${category}&keyWord=${keyWord}`);
      const data: IOfferCard[] = await response.json();
      setFavoritesCards(data);
    } catch (error) {
      console.error("Mistake while favorite offers receive:", error);
    }
  };

  useEffect(() => {
    receiveFavorites();
  }, [selectedCity, selectedCategory,selectedKeyWord]);

  
  return (
    <FavoritesContext.Provider value={{ favoritesCards, setFavoritesCards, selectedCity, setSelectedCity, selectedCategory, setSelectedCategory, selectedKeyWord, setSelectedKeyWord, receiveFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useOffers = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("Favorites do not used inside FavoritesProvider");
  }
  return context;
};
