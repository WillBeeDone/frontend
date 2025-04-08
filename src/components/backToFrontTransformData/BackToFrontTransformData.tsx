import { IGallery, IGuestOfferPage, IMyOfferCard, IOfferCard, IOfferForTransformOfferCardPagination } from "../types/OfferInterfaces";
import { IUser } from "../types/UserInterfaces";
import { FixImgUrl} from "./FixImgUrl"



export const transformOfferCardPagination = (data: { content: any[] }): IOfferCard[] => {
  if (!data || !Array.isArray(data.content)) {
    console.error("Expected an array in data.content, received:", data);
    return [];
  }
  console.log("внутри transformOfferCardPagination - ", data.content);
  
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


export const transformMyOfferCard = (data: any): IMyOfferCard[] => {
  console.log("на входе transformMyOfferCard - ", data);
  
  if (!Array.isArray(data)) {
    console.error("Expected an array, received:", data);
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
    active:offer.active,
  }));
};


[
  {
      "id": 7,
      "title": "Professional Car Fixes at Great Rates",
      "categoryDto": {
          "name": "Computer Technician"
      },
      "pricePerHour": 13.00,
      "description": "<p>I’m a professional auto mechanic. I provide car repairs, part replacements, and diagnostics. Fast and affordable services, available weekends. Get your vehicle running smoothly with expert care!</p>><br><p>Whether your car needs a simple oil change, brake replacement, or a full engine overhaul, I’ve got you covered. With years of experience and a passion for fixing cars, I ensure top-quality service every time. 🔧</p><h3>Services Offered:</h3><p style=\"text-align: left;\">✅ Engine diagnostics & tune-ups</p><p style=\"text-align: left;\">✅ Brake repair & replacement</p><p style=\"text-align: left;\">✅ Transmission services</p><p style=\"text-align: left;\">✅ Battery testing & replacement</p><p style=\"text-align: left;\">✅ Oil changes & fluid checks</p><p style=\"text-align: left;\">✅ Tire rotations & replacements</p><p style=\"text-align: left;\">✅ Suspension & alignment</p><p style=\"text-align: left;\">✅ Check engine light diagnostics</p><br><p>I work on all makes and models, using high-quality parts and the latest tools to get the job done right the first time. 🚗</p><h3>Why Choose Me?</h3><p style=\"text-align: left;\">✔️ Fast turnaround – Get your car back on the road quickly.</p><p style=\"text-align: left;\">✔️ Affordable rates – Competitive pricing with no hidden fees.</p><p style=\"text-align: left;\">✔️ Weekend availability – Because car troubles don’t wait!</p><p style=\"text-align: left;\">✔️ Honest service – I explain the problem and solution in simple terms.</p><p style=\"text-align: left;\">✔️ Customer satisfaction guaranteed – I take pride in my work!</p><br><p>📅 <strong>Schedule an Appointment:</strong> Don’t let car troubles slow you down! Contact me today to book a repair.</p><p>Follow me for car maintenance tips and special offers! 🚘</p>",
      "active": true,
      "userFilterResponseDto": {
          "firstName": "RealUserName",
          "lastName": "RealUserLastName",
          "profilePicture": "https://imgur.com/Y46XwHn",
          "locationDto": {
              "cityName": "Halle"
          }
      }
  }
]








export const transformOfferCard = (offers: any[]): IOfferCard[] => {
   
  return offers.map(({ 
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

    profilePicture: FixImgUrl(userFilterResponseDto?.profilePicture) || `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`,
   
    location: userFilterResponseDto?.locationDto?.cityName || "Unknown"
  }));
};

export const transformGuestOfferPage = (offer: any): IGuestOfferPage => {
    const {
        id: offerId,
        title: offerTitle,
        pricePerHour: offerPrice,
        description: offerDescription,
        images 
    } = offer; 

     let offerGallery : IGallery[];

    const offerCategory = offer.categoryDto?.name || "Unknown";
    const offerOwnerName = offer.userProfileResponseDto?.firstName || "Unknown";
    const offerOwnerSecondName = offer.userProfileResponseDto?.lastName || "Unknown";
    const offerOwnerProfilePicture = FixImgUrl(offer.userProfileResponseDto?.profilePicture) || `${import.meta.env.BASE_URL}no-profilePicture-default-image.jpg`;
    const offerOwnerLocation = offer.userProfileResponseDto?.locationDto?.cityName || "Unknown";

    const offerOwnerPhone = offer.userProfileResponseDto?.phoneNumber;
    const offerOwnerEmail = offer.userProfileResponseDto?.email;
    console.log(`phone - ${offerOwnerPhone} & email - ${offerOwnerEmail}`);
    

    console.log("in transformGuestOfferPage - ",offer.images);
    
    if(images !== null && offer.images.length > 0){
        offerGallery = offer.images
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
        gallery: offerGallery,
        phone:offerOwnerPhone,
        email:offerOwnerEmail,
    };
    console.log("before return - ", guestOfferPage.gallery);
    
    return guestOfferPage;
}
    
        
export const transformUser = (user: any): IUser => {
  console.log("inside transformUser - ", user);
  
  return {
    id: user.id,
    firstName: user.firstName || '',
    secondName: user.lastName || '',
    email: user.email,
    phone: user.phoneNumber || '',
    location: user.locationDto?.cityName || '',
    role: user.roles?.length > 0 ? user.roles[0].title : '', 
    profilePicture: FixImgUrl(user.profilePicture) || '',
    accessToken: user.accessToken,
    refreshToken: user.refreshToken
  };
};
