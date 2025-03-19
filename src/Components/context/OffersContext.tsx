import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IOfferCard } from "../types/OfferInterfaces";

interface OffersContextType {
  offerCards: IOfferCard[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  fetchOffers: (city?: string) => void;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offerCards, setOffersListForGuest] = useState<IOfferCard[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("berlin"); // дефолт - "berlin"

  const fetchOffers = async (city: string = selectedCity) => {
    try {
      const response = await fetch(`https://api.example.com/offers?city=${city}`);
      const data: IOfferCard[] = await response.json();
      setOffersListForGuest(data);
    } catch (error) {
      console.error("Mistake while offers receive:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [selectedCity]);

  return (
    <OffersContext.Provider value={{ offerCards, selectedCity, setSelectedCity, fetchOffers }}>
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
