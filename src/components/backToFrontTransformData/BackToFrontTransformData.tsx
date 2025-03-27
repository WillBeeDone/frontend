import { IGallery, IGuestOfferPage, IOfferCard, IOfferForTransformOfferCardPagination } from "../types/OfferInterfaces";
import {FixAllImgUrl, FixArrayImgUrls, FixImgUrl} from "./FixImgUrl"


export const transformOfferCardPagination = (data: { content: any[] }): IOfferCard[] => {
  if (!data || !Array.isArray(data.content)) {
    console.error("Expected an array in data.content, received:", data);
    return [];
  }

  return data.content.map((offer:IOfferForTransformOfferCardPagination) => ({
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

export const transformOfferCard = (offers: any[]): IOfferCard[] => {
   
  return offers.map(({ 
    id, 
    title, 
    pricePerHour: price, 
    description, 
    categoryResponseDto, 
    userFilterResponseDto,
  }) => ({
    id,
    title,
    price,
    description,
    category: categoryResponseDto?.name || "Unknown",
    firstName: userFilterResponseDto?.firstName || "Unknown",
    secondName: userFilterResponseDto?.lastName || "Unknown",

    profilePicture: FixImgUrl(userFilterResponseDto?.profilePicture) || `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`,
   
    location: userFilterResponseDto?.locationResponseDto?.cityName || "Unknown"
  }));
};

export const transformGuestOfferPage = (offer: any): IGuestOfferPage => {
    const {
        id: offerId,
        title: offerTitle,
        pricePerHour: offerPrice,
        description: offerDescription,
        images // какая будет финальная вложенность?
    } = offer; 

     let offerGallery : IGallery[];

    const offerCategory = offer.categoryResponseDto?.name || "Unknown";
    const offerOwnerName = offer.userFilterResponseDto?.firstName || "Unknown";
    const offerOwnerSecondName = offer.userFilterResponseDto?.lastName || "Unknown";
    const offerOwnerProfilePicture = FixImgUrl(offer.userFilterResponseDto?.profilePicture) || `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`;
    const offerOwnerLocation = offer.userFilterResponseDto?.locationResponseDto?.cityName || "Unknown";
    console.log("in transformGuestOfferPage - ",offer.images);
    
    if(images !== null && offer.images.length > 0){
        offerGallery = offer.images//не знаю финальную вложенность и тип на фронте
        console.log("after data transfer", offerGallery);
        
    }
    else {
        offerGallery = [{id:1, imageUrl:`${import.meta.env.BASE_URL}no-gallery-default-image.avif`}];
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
        gallery: offerGallery
    };
    console.log("before return - ", guestOfferPage.gallery);
    
    return guestOfferPage;
}
    
        
