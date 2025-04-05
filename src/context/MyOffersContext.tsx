import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IOfferCard } from "../components/types/OfferInterfaces";
import { transformOfferCardPagination } from "../components/backToFrontTransformData/BackToFrontTransformData";

interface MyOffersContextType {
  myOfferCards: IOfferCard[];
  setMyOfferCards: (offer: IOfferCard[]) => void;
  fetchMyOffers: () => void;
  addNewOfferToMyOffers: (newOffer: IOfferCard) => void;
  removeOfferFromMyOffers: (offerId: number) => void;
  clearAllMyOffers: () => void;
}

export const MyOffersContext = createContext<MyOffersContextType | undefined>(
  undefined
);

export const MyOffersProvider = ({ children }: { children: ReactNode }) => {
  const [myOfferCards, setMyOfferCards] = useState<IOfferCard[]>([]);
 
  const fetchMyOffers = async () => {
    try {
      const response = await fetch(`/api/my-offers`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const formattedMyOffers = transformOfferCardPagination(data);
      console.log(data);
      setMyOfferCards(formattedMyOffers);
    } catch (error) {
      console.error("Mistake while my offers receive:", error);
    }
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);



  const addNewOfferToMyOffers = async (newOffer: IOfferCard) => {
    try {
      const response = await fetch('/api/add-new-offer-to-my-offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOffer),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const savedOffer = await response.json();
      setMyOfferCards((prevMyOfferCards) => [...prevMyOfferCards, savedOffer]);
    } catch (error) {
      console.error("Error while adding new offer:", error);
    }
  };


  const removeOfferFromMyOffers = async (id: number) => {
    try {
      const response = await fetch(`/api/remove-offer-from-my-offers/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      setMyOfferCards((prevMyOfferCards) =>
        prevMyOfferCards.filter((offer) => offer.id !== id)
      );
    } catch (error) {
      console.error("Error while removing offer from my offers:", error);
    }
  };


  const clearAllMyOffers = async () => {
    try {
      const response = await fetch(`/api/clearAllMyOffers`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      setMyOfferCards([]);
    } catch (error) {
      console.error("Error while removing all offers from my offers:", error);
    }
  };


  return (
    <MyOffersContext.Provider
      value={{
        myOfferCards,
        setMyOfferCards,
        fetchMyOffers,
        addNewOfferToMyOffers,
        removeOfferFromMyOffers,
        clearAllMyOffers
      }}
    >
      {children}
    </MyOffersContext.Provider>
  );
};

export const useMyOffers = () => {
  const context = useContext(MyOffersContext);
  if (!context) {
    throw new Error("MyOffers must be used inside MyOffersProvider");
  }
  return context;
};