import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IOfferGuest, IOfferUser, IOfferAdmin } from './../Components/types/OfferInterfaces';
// Оновлений інтерфейс офера

// interface IOfferGuest {
//   id: number;
//   title: string;
//   name: string;
//   profilePicture: string;
//   location: string;
//   category: string;
//   gallery: string[];
//   price: number;
//   description: string;
// }

// Тип контексту
interface OffersContextType {
  offersListForGuest: IOfferGuest[];
  fetchOffers: () => void;
}

// Створення контексту
const OffersContext = createContext<OffersContextType | undefined>(undefined);

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
    <OffersContext.Provider value={{ offersListForGuest, fetchOffers }}>
      {children}
    </OffersContext.Provider>
  );
};

// Кастомний хук для використання контексту
export const useOffers = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("useOffers має використовуватися всередині OffersProvider");
  }
  return context;
};
