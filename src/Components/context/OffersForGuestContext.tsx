import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IOfferGuest } from "../types/OfferInterfaces";

interface OffersContextType {
  offersListForGuest: IOfferGuest[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  fetchOffers: (city?: string) => void;
}

const OffersForGuestContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offersListForGuest, setOffersListForGuest] = useState<IOfferGuest[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("berlin"); // дефолт - "berlin"

  const fetchOffers = async (city: string = selectedCity) => {
    try {
      const response = await fetch(`https://api.example.com/offers?city=${city}`);
      const data: IOfferGuest[] = await response.json();
      setOffersListForGuest(data);
    } catch (error) {
      console.error("Mistake while offers receive:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [selectedCity]);

  return (
    <OffersForGuestContext.Provider value={{ offersListForGuest, selectedCity, setSelectedCity, fetchOffers }}>
      {children}
    </OffersForGuestContext.Provider>
  );
};

export const useGuestOffers = () => {
  const context = useContext(OffersForGuestContext);
  if (!context) {
    throw new Error("Offers do not used inside OffersProvider");
  }
  return context;
};
