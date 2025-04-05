import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import { IOfferCard } from "../components/types/OfferInterfaces";
import { transformOfferCardPagination } from "../components/backToFrontTransformData/BackToFrontTransformData";

interface OffersContextType {
  offerCards: IOfferCard[];
  setOfferCards: (offer: IOfferCard[]) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedKeyWord: string;
  setSelectedKeyWord: (category: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  fetchOffers: (
    city?: string,
    category?: string,
    keyWord?: string,
    page?: number
  ) => void;
  fetchOffersFirstRender: () => void;
}

export const OffersContext = createContext<OffersContextType | undefined>(
  undefined
);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offerCards, setOfferCards] = useState<IOfferCard[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedKeyWord, setSelectedKeyWord] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  // чтоб fetchOffers не отрабатывал после fetchOffersFirstRender
  const firstRender = useRef(true);

  
  localStorage.setItem("selectedCity", selectedCity)
  

  const fetchOffersFirstRender = async (page: number = 0) => {
    try {
      const response = await fetch(`/api/offers?page=${page}&size=9`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const formattedOffers = transformOfferCardPagination(data);
      console.log(data);
      setOfferCards(formattedOffers);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Mistake while general offers receive:", error);
    }
  };

  useEffect(() => {
    fetchOffersFirstRender(currentPage);
  }, [currentPage]);

  const fetchOffers = async (
    city: string = selectedCity,
    category: string = selectedCategory,
    keyWord: string = selectedKeyWord || "all",
    page: number = 0
  ) => {
    try {
      console.log("Обране місто - ", city);
      console.log("Обрана категорія - ", category);
      console.log("Обране ключове слово - ", keyWord);

      const response = await fetch(
        `/api/offers?page=${page}&cityName=${city}&category=${category}&keyPhrase=${keyWord}`
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      //состыковка ключей бек => фронт
      const data = await response.json();

      console.log("отримав ", data);

      const formattedOffers = transformOfferCardPagination(data);
      setOfferCards(formattedOffers);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Mistake while filtered offers receive:", error);
    }
  };

  useEffect(() => {
    //не делать fetchOffers() при первой загрузке страницы, а только после изменения значения city, category или keyWord
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fetchOffers();
  }, [selectedCity, selectedCategory, selectedKeyWord]);

  return (
    <OffersContext.Provider
      value={{
        offerCards,
        setOfferCards,
        selectedCity,
        setSelectedCity,
        selectedCategory,
        setSelectedCategory,
        selectedKeyWord,
        setSelectedKeyWord,
        currentPage,
        setCurrentPage,
        totalPages,
        fetchOffers,
        fetchOffersFirstRender,
      }}
    >
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
