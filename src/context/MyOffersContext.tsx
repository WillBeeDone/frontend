import { createContext, useContext, useState, ReactNode } from "react";
import { IMyOfferCard, IOfferCard } from "../components/types/OfferInterfaces";
import { transformMyOfferCard } from "../components/backToFrontTransformData/BackToFrontTransformData";
import apiClient from "../features/auth/apiClient";

interface MyOffersContextType {
  myOfferCards: IMyOfferCard[];
  setMyOfferCards: (offer: IMyOfferCard[]) => void;
  fetchMyOffers: () => void;
  addNewOfferToMyOffers: (newOffer: IMyOfferCard) => void;
  removeOfferFromMyOffers: (offerId: number) => void;
  clearAllMyOffers: () => void;
  isLoading: boolean;
  error: string;
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
      const response = await apiClient.get(`/api/users/offers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = response.data;
      const formattedMyOffers = transformMyOfferCard(data);
      setMyOfferCards(formattedMyOffers);
      setIsLoading(false);
    } catch (error) {
      setError(error as string);
      console.error("Mistake while my offers receive:", error);
    }
  };

  const addNewOfferToMyOffers = async (newOffer: IOfferCard) => {
    try {
      const response = await apiClient.post(
        "/api/add-new-offer-to-my-offers",
        newOffer
      );

      if (response.status !== 200) {
        throw new Error(`Server error: ${response.status}`);
      }

      const savedOffer = response.data;
      setMyOfferCards((prev) => [...prev, savedOffer]);
      fetchMyOffers();
    } catch (error) {
      console.error("Error while adding new offer:", error);
    }
  };

  const removeOfferFromMyOffers = async (id: number) => {
    try {
      await apiClient.delete(`/api/users/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMyOfferCards((prevMyOfferCards) =>
        prevMyOfferCards.filter((offer) => offer.id !== id)
      );

      alert("Offer is removed !");
    } catch (error: any) {
      console.error("Error while removing offer:", error);
    }
  };

  const activateDeactivateMyOffers = async (id: number) => {
    try {
      await apiClient.put(
        `/api/users/offers/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

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
      const response = await apiClient.delete("/api/clearAllMyOffers");

      if (response.status !== 200) {
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
