import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IOfferCard } from "../types/OfferInterfaces";

interface OffersContextType {
  offerCards: IOfferCard[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedKeyWord: string;
  setSelectedKeyWord: (category: string) => void;

  fetchOffers: (city?: string, category?: string, keyWord?: string) => void;
}


const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offerCards, setOfferCards] = useState<IOfferCard[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedKeyWord,  setSelectedKeyWord] = useState<string>("");

  const fetchOffers = async (city: string = selectedCity, category: string = selectedCategory, keyWord: string = selectedKeyWord || "all") => {
    try {
      const response = await fetch(`https://api.example.com/offers?city=${city}&category=${category}&keyWord=${keyWord}`);
      const data: IOfferCard[] = await response.json();
      setOfferCards(data);
    } catch (error) {
      console.error("Mistake while offers receive:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [selectedCity, selectedCategory,selectedKeyWord]);

  
  return (
    <OffersContext.Provider value={{ offerCards, selectedCity, setSelectedCity, selectedCategory, setSelectedCategory, selectedKeyWord, setSelectedKeyWord, fetchOffers }}>
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("Offers do not used inside OffersProvider");
  }
  return context;
};
