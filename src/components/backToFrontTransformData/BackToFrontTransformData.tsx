import {
  IGallery,
  IGuestOfferPage,
  IMyOfferCard,
  IOfferCard,
  IOfferForTransformOfferCardPagination,
} from "../types/OfferInterfaces";
import { IUser } from "../types/UserInterfaces";
import { FixImgUrl } from "./FixImgUrl";

export const transformOfferCardPagination = (data: {
  content: any[];
}): IOfferCard[] => {
  if (!data || !Array.isArray(data.content)) {
    console.error("Expected an array in data.content, received:", data);
    return [];
  }

  return data.content.map((offer: IOfferForTransformOfferCardPagination) => ({
    id: offer.id,
    title: offer.title,
    category: offer.categoryDto?.name || "Unknown",
    price: offer.pricePerHour,
    description: offer.description,
    firstName: offer.userFilterResponseDto?.firstName || "Unknown",
    secondName: offer.userFilterResponseDto?.lastName || "Unknown",
    location: offer.userFilterResponseDto?.locationDto?.cityName || "Unknown",
    profilePicture: FixImgUrl(offer.userFilterResponseDto?.profilePicture),
  }));
};

export const transformMyOfferCard = (data: any): IMyOfferCard[] => {

  if (!Array.isArray(data)) {
    return [];
  }
  
  return data.map((offer) => ({
    id: offer.id,
    title: offer.title,
    category: offer.categoryDto?.name || "Unknown",
    price: offer.pricePerHour,
    description: offer.description,
    firstName: offer.userFilterResponseDto?.firstName || "Unknown",
    secondName: offer.userFilterResponseDto?.lastName || "Unknown",
    location: offer.userFilterResponseDto?.locationDto?.cityName || "Unknown",
    profilePicture: FixImgUrl(offer.userFilterResponseDto?.profilePicture),
    active: offer.active,
  }));
};

export const transformOfferCard = (offers: any[]): IOfferCard[] => {
  return offers.map(
    ({
      id,
      title,
      pricePerHour: price,
      description,
      categoryDto,
      userFilterResponseDto,
    }) => ({
      id,
      title,
      price,
      description,
      category: categoryDto?.name || "Unknown",
      firstName: userFilterResponseDto?.firstName || "Unknown",
      secondName: userFilterResponseDto?.lastName || "Unknown",

      profilePicture:
        FixImgUrl(userFilterResponseDto?.profilePicture) ||
        `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`,

      location: userFilterResponseDto?.locationDto?.cityName || "Unknown",
    })
  );
};

export const transformGuestOfferPage = (offer: any): IGuestOfferPage => {
  const {
    id: offerId,
    title: offerTitle,
    pricePerHour: offerPrice,
    description: offerDescription,
    images,
  } = offer;

  let offerGallery: IGallery[];

  const offerCategory = offer.categoryDto?.name || "Unknown";
  const offerOwnerName = offer.userProfileResponseDto?.firstName || "Unknown";
  const offerOwnerSecondName =
    offer.userProfileResponseDto?.lastName || "Unknown";
  const offerOwnerProfilePicture =
    FixImgUrl(offer.userProfileResponseDto?.profilePicture) ||
    `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`;
  const offerOwnerLocation =
    offer.userProfileResponseDto?.locationDto?.cityName || "Unknown";

  const offerOwnerPhone = offer.userProfileResponseDto?.phoneNumber;
  const offerOwnerEmail = offer.userProfileResponseDto?.email;

  if (images !== null && offer.images.length > 0) {
    offerGallery = offer.images;
  } else {
    offerGallery = [
      {
        id: 1,
        imageUrl: `${import.meta.env.BASE_URL}no-gallery-default-image.avif`,
      },
    ];
  }

  const guestOfferPage: IGuestOfferPage = {
    id: offerId,
    firstName: offerOwnerName,
    secondName: offerOwnerSecondName,
    location: offerOwnerLocation,
    title: offerTitle,
    category: offerCategory,
    price: offerPrice,
    description: offerDescription,
    profilePicture: offerOwnerProfilePicture,
    gallery: offerGallery,
    phone: offerOwnerPhone,
    email: offerOwnerEmail,
  };

  return guestOfferPage;
};

export const transformUser = (user: any): IUser => {
  return {
    id: user.id,
    firstName: user.firstName || "",
    secondName: user.lastName || "",
    email: user.email,
    phone: user.phoneNumber || "",
    location: user.locationDto?.cityName || "",
    role: user.roles?.length > 0 ? user.roles[0].title : "",
    profilePicture: FixImgUrl(user.profilePicture) || "",
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
};
