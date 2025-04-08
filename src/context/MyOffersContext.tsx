import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IMyOfferCard, IOfferCard } from "../components/types/OfferInterfaces";
import { transformMyOfferCard } from "../components/backToFrontTransformData/BackToFrontTransformData";
import axios from "axios";

interface MyOffersContextType {
  myOfferCards: IMyOfferCard[];
  setMyOfferCards: (offer: IMyOfferCard[]) => void;
  fetchMyOffers: () => void;
  addNewOfferToMyOffers: (newOffer: IMyOfferCard) => void;
  removeOfferFromMyOffers: (offerId: number) => void;
  clearAllMyOffers: () => void;
  isLoading:boolean;
  error:string;
  activateDeactivateMyOffers: (offerId: number) => void;
}

export const MyOffersContext = createContext<MyOffersContextType | undefined>(
  undefined
);

export const MyOffersProvider = ({ children }: { children: ReactNode }) => {
  const [myOfferCards, setMyOfferCards] = useState<IMyOfferCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");
 
  const fetchMyOffers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/users/offers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      console.log("пришло от сервера в fetchMyOffers - response - : ", response);
      console.log("пришло от сервера в fetchMyOffers - response.data - : ", response.data);
  
      if (response.status !== 200) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = response.data;
      const formattedMyOffers = transformMyOfferCard(data);
      console.log("форматированные оферы- : ", formattedMyOffers);
      console.log(data);
      setMyOfferCards(formattedMyOffers);
      setIsLoading(false);
    } catch (error) {
      setError(error as string)
      console.error("Mistake while my offers receive:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchMyOffers();
    }
  }, [accessToken]);



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
      fetchMyOffers();
    } catch (error) {
      console.error("Error while adding new offer:", error);
    }
  };


  const removeOfferFromMyOffers = async (id: number) => {
    try {
      await axios.delete(`/api/users/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      setMyOfferCards((prevMyOfferCards) =>
        prevMyOfferCards.filter((offer) => offer.id !== id)
      );
  
      alert("Offer is removed !")
    } catch (error: any) {
      console.error("Error while removing offer:", error);
      
    }
  };

  const activateDeactivateMyOffers = async (id: number): Promise<string | null> => {
    try {
      await axios.put(`/api/users/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      setMyOfferCards((prevMyOfferCards) =>
        prevMyOfferCards.map((offer) =>
          offer.id === id ? { ...offer, active: !offer.active } : offer
        )
      );
  
      return null;
    } catch (error: any) {
      console.error("Error while changing offer status:", error);
      return error?.response?.data?.message || "Failed to change offer status";
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
        clearAllMyOffers,
        isLoading,
        error,
        activateDeactivateMyOffers,
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