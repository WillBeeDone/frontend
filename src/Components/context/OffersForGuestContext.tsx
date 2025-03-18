import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IOfferGuest } from '../types/OfferInterfaces';

interface OffersContextType {
  offersListForGuest: IOfferGuest[];
  fetchOffers: () => void;
}

// Створення контексту
const OffersForGuestContext = createContext<OffersContextType | undefined>(undefined);

// Провайдер контексту
export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offersListForGuest, setOffersListForGuest] = useState<IOfferGuest[]>([]);

  // Функція для отримання оферів з сервера
  const fetchOffers = async () => {
    try {
      const response = await fetch("https://api.example.com/offers"); // API-запит
      const data: IOfferGuest[] = await response.json();
      setOffersListForGuest(data);

    } catch (error) {
      console.error("Помилка при отриманні оферів:", error);
    }
  };

  // Виклик при завантаженні компонента
  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <OffersForGuestContext.Provider value={{ offersListForGuest, fetchOffers }}>
      {children}
    </OffersForGuestContext.Provider>
  );
};

// Кастомний хук для використання контексту
export const useOffers = () => {
  const context = useContext(OffersForGuestContext);
  if (!context) {
    throw new Error("useOffers має використовуватися всередині OffersProvider");
  }
  return context;
};
