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
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  fetchMyOffers: (page?: number) => void;
  addNewOfferToMyOffers: (newOffer: IOfferCard) => void;
  removeOfferFromMyOffers: (offerId: number) => void;
  clearAllMyOffers: () => void;
}

export const MyOffersContext = createContext<MyOffersContextType | undefined>(
  undefined
);

export const MyOffersProvider = ({ children }: { children: ReactNode }) => {
  const [myOfferCards, setMyOfferCards] = useState<IOfferCard[]>([]);
 
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  

  const fetchMyOffers = async (page: number = 0) => {
    try {
      const response = await fetch(`/api/my-offers?page=${page}&size=9`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const formattedMyOffers = transformOfferCardPagination(data);
      console.log(data);
      setMyOfferCards(formattedMyOffers);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Mistake while my offers receive:", error);
    }
  };

  useEffect(() => {
    fetchMyOffers(currentPage);
  }, [currentPage]);



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


const clearAllMyOffers = () => {
  setMyOfferCards([]);
};


  return (
    <MyOffersContext.Provider
      value={{
        myOfferCards,
        setMyOfferCards,
        currentPage,
        setCurrentPage,
        totalPages,
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