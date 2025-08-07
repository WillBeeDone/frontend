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
import { useOffers } from "./OffersContext";
import apiClient from "../features/auth/apiClient";


interface FavoritesContextType {
  offerCards: IOfferCard[];
  favoriteOffers: IOfferCard[];
  setFavoriteOffers: (favoriteOffer: IOfferCard[]) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedKeyWord: string;
  setSelectedKeyWord: (category: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  fetchFilteredFavoriteOffers: (
    city?: string,
    category?: string,
    keyWord?: string,
    page?: number
  ) => void;
  fetchFavoriteOffers: () => void;
  addFavorite: (offerId: string) => void;
  removeFavorite: (offerId: string) => void;
  clearFavorite: () => void;
}

export const FavoriteContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const { offerCards } = useOffers();
  const [favoriteOffers, setFavoriteOffers] = useState<IOfferCard[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedKeyWord, setSelectedKeyWord] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // чтоб fetchFilteredFavoriteOffers не отрабатывал после fetchFavoriteOffers
  const firstRender = useRef(true);

  const fetchFavoriteOffers = async (page: number = 0) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await apiClient.get(
        `/users/favourites?page=${page}&size=12`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      const formattedFavoriteOffers = transformOfferCardPagination(data);
      setFavoriteOffers(formattedFavoriteOffers);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching favorite offers:", error);
    }
  };

  useEffect(() => {
    if (!firstRender.current) {
      fetchFavoriteOffers(currentPage);
    }
  }, [currentPage]);

  //получение от сервера списка любимых с учетом параметров
  const fetchFilteredFavoriteOffers = async (
    city: string = selectedCity,
    category: string = selectedCategory,
    keyWord: string = selectedKeyWord || "all",
    page: number = 0
  ) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await apiClient.get(
        `/users/favourites?page=${page}&size=12&cityName=${city}&category=${category}&keyPhrase=${keyWord}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      const formattedFavoriteOffers = transformOfferCardPagination(data);
      setFavoriteOffers(formattedFavoriteOffers);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching filtered favorite offers:", error);
    }
  };

  useEffect(() => {
    //не делать fetchFilteredFavoriteOffers() при первой загрузке страницы, а только после изменения значения city, category или keyWord
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fetchFilteredFavoriteOffers();
  }, [selectedCity, selectedCategory, selectedKeyWord]);

  // запрос на сервер для добавления в любимые
 const addFavorite = async (offerId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await apiClient.put(`/users/favourites/${offerId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const newOffer = offerCards.find((o) => o.id === Number(offerId));
      if (!newOffer) return;

      setFavoriteOffers((prev) => [...prev, newOffer]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  // удаление офера из любимых
  const removeFavorite = async (offerId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await apiClient.delete(`/users/favourites/${offerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setFavoriteOffers((prev) =>
        prev.filter((offer) => offer.id !== Number(offerId))
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // удаление всех любимых
 const clearFavorite = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await apiClient.delete(`/users/favourites`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setFavoriteOffers([]);
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        offerCards,
        favoriteOffers,
        setFavoriteOffers,
        addFavorite,
        removeFavorite,
        clearFavorite,
        fetchFavoriteOffers,
        fetchFilteredFavoriteOffers,
        selectedCity,
        selectedCategory,
        selectedKeyWord,
        setSelectedCity,
        setSelectedCategory,
        setSelectedKeyWord,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("FavoriteContext do not used inside FavoriteProvider");
  }
  return context;
};
