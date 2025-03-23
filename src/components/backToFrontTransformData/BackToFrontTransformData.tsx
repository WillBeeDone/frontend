import { IGuestOfferPage, IOfferCard } from "../types/OfferInterfaces";
import {FixAllImgUrl, FixArrayImgUrls, FixImgUrl} from "./FixImgUrl"


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
        gallery // какая будет финальная вложенность?
    } = offer; 

     let offerGallery : string [];

    const offerCategory = offer.categoryResponseDto?.name || "Unknown";
    const offerOwnerName = offer.userFilterResponseDto?.firstName || "Unknown";
    const offerOwnerSecondName = offer.userFilterResponseDto?.lastName || "Unknown";
    const offerOwnerProfilePicture = FixImgUrl(offer.userFilterResponseDto?.profilePicture) || `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`;
    const offerOwnerLocation = offer.userFilterResponseDto?.locationResponseDto?.cityName || "Unknown";
    
    if(gallery !== null && offer.gallery.imageUrl.length > 0){
        offerGallery = offer.gallery.imageUrl//не знаю финальную вложенность и тип на фронте
    }
    else {
        offerGallery = [`${import.meta.env.BASE_URL}no-gallery-default-image.avif`];
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
    
    return guestOfferPage;
}
    
        
