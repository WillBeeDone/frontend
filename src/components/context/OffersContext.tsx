import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { IOfferCard } from "../types/OfferInterfaces";
import { transformOfferCard} from "../backToFrontTransformData/BackToFrontTransformData";



interface OffersContextType {
  offerCards: IOfferCard[];
  setOfferCards: (offer: IOfferCard[]) => void;
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
  // чтоб fetchOffers не отрабатывал после fetchOffersFirstRender
  const firstRender = useRef(true);


  const fetchOffersFirstRender = async () => {
    try {
      const response = await fetch(`/api/offers`);
       
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

      //состыковка ключей бек => фронт
      const data = await response.json();
      const formattedOffers = transformOfferCard(data);
      setOfferCards(formattedOffers);

    } catch (error) {
      console.error("Mistake while general offers receive:", error);
    }
  };

  useEffect(() => {
    fetchOffersFirstRender();
  }, []);




  const fetchOffers = async (city: string = selectedCity, category: string = selectedCategory, keyWord: string = selectedKeyWord || "all") => {
    try {
      console.log("Обране місто - ", city);
      console.log("Обрана категорія - ", category);
      console.log("Обране ключове слово - ", keyWord);
      
      const response = await fetch(`/api/offers/filter?cityName=${city}&category=${category}&keyPhrase=${keyWord}`);   
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      //состыковка ключей бек => фронт
      const data = await response.json();
      
      console.log("отримав ",data);
      
      const formattedOffers = transformOfferCard(data);
      setOfferCards(formattedOffers);

    } catch (error) {
      console.error("Mistake while filtered offers receive:", error);
    }
  };

  useEffect(() => {
    //не делать fetchOffers() при первой загрузке страницы, а только после изменения значения city, category или keyWord
    if (firstRender.current){
      firstRender.current = false;
      return;
    }
    fetchOffers();
  }, [selectedCity, selectedCategory,selectedKeyWord]);

  
  return (
    <OffersContext.Provider value={{ offerCards, setOfferCards, selectedCity, setSelectedCity, selectedCategory, setSelectedCategory, selectedKeyWord, setSelectedKeyWord, fetchOffers }}>
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
