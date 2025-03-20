/*export interface IOfferCard {
  id: number,firstName:string, secondName:string, location:string, title:string, category:string, price:number,description:string, profilePicture:string
    
    }
       
export interface IGuestOfferPage {
  id: number,firstName:string, secondName:string, location:string, title:string, category:string, price:number,description:string, profilePicture:string, gallery:string[]
    
    }

*/

const list = [
  { element: "Berlin" },
  { element: "Leipzig" },
  { element: "Magdeburg" },
  { element: "Halle" },
  { element: "Hamburg" },
].map(({ element }) => ({
  element,
  value: element.charAt(0).toLowerCase() + element.substring(1),
}));

const list2 = [
  { element: "Plumber" },
  { element: "Electrician" },
  { element: "Computer Technician " },
  { element: "Pet Care" },
  { element: "Cleaning" },
].map(({ element }) => ({
  element,
  value: element.charAt(0).toLowerCase() + element.substring(1),
}));

import {
  IOfferCard,
  IGuestOfferPage,
} from "../components/types/OfferInterfaces";
//all fields of Offer entity : id, userId(user), title, name(user), profilePicture(user), location(user), category, photos from gallery, price, description, email(user), phone number(user)

// IOfferGuest: title, name, profilePicture, location, category, photos from gallery, price, description
// IOfferUser: IOfferGuest + email(user), phone number(user)
// IOfferAdmin - IOfferUser +  id, userId(user)

export const offerCards: IOfferCard[] = [
  {
    id: 1,
    title: "title1",
    firstName: "name1",
    secondName: "lastName1",
    profilePicture: "profilePicture1",
    price: 5,
    category: "category1",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location1",
  },
  {
    id: 2,
    title: "title2",
    firstName: "name2",
    secondName: "lastName2",
    profilePicture: "profilePicture2",
    price: 5,
    category: "category2",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location2",
  },
  {
    id: 3,
    title: "title3",
    firstName: "name3",
    secondName: "lastName3",
    profilePicture: "profilePicture3",
    price: 10,
    category: "category3",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location3",
  },
  {
    id: 4,
    title: "title4",
    firstName: "name4",
    secondName: "lastName4",
    profilePicture: "profilePicture4",
    price: 7,
    category: "category4",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location4",
  },

  {
    id: 5,
    title: "title5",
    firstName: "name5",
    secondName: "lastName5",
    profilePicture: "profilePicture5",
    price: 20,
    category: "category5",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location5",
  },
  {
    id: 6,
    title: "title6",
    firstName: "name6",
    secondName: "lastName6",
    profilePicture: "profilePicture6",
    price: 3,
    category: "category6",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location6",
  },
  {
    id: 7,
    title: "title7",
    firstName: "name7",
    secondName: "lastName7",
    profilePicture: "profilePicture7",
    price: 8,
    category: "category7",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location7",
  },
  {
    id: 8,
    title: "title8",
    firstName: "name8",
    secondName: "lastName8",
    profilePicture: "profilePicture8",
    price: 10,
    category: "category8",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location8",
  },
  {
    id: 9,
    title: "title9",
    firstName: "name9",
    secondName: "lastName9",
    profilePicture: "profilePicture9",
    price: 15,
    category: "category9",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location9",
  },
  {
    id: 10,
    title: "title10",
    firstName: "name10",
    secondName: "lastName10",
    profilePicture: "profilePicture10",
    price: 5,
    category: "category10",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location10",
  },

  {
    id: 11,
    title: "title1",
    firstName: "name11",
    secondName: "lastName11",
    profilePicture: "profilePicture1",
    price: 5,
    category: "category1",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location1",
  },
  {
    id: 12,
    title: "title2",
    firstName: "name12",
    secondName: "lastName12",
    profilePicture: "profilePicture2",
    price: 5,
    category: "category2",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location2",
  },
  {
    id: 13,
    title: "title3",
    firstName: "name13",
    secondName: "lastName13",
    profilePicture: "profilePicture3",
    price: 10,
    category: "category3",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location3",
  },
  {
    id: 14,
    title: "title4",
    firstName: "name14",
    secondName: "lastName14",
    profilePicture: "profilePicture4",
    price: 7,
    category: "category4",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location4",
  },

  {
    id: 15,
    title: "title5",
    firstName: "name15",
    secondName: "lastName15",
    profilePicture: "profilePicture5",
    price: 20,
    category: "category5",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location5",
  },
  {
    id: 16,
    title: "title6",
    firstName: "name16",
    secondName: "lastName16",
    profilePicture: "profilePicture6",
    price: 3,
    category: "category6",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location6",
  },
  {
    id: 17,
    title: "title7",
    firstName: "name17",
    secondName: "lastName17",
    profilePicture: "profilePicture7",
    price: 8,
    category: "category7",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location7",
  },
  {
    id: 18,
    title: "title8",
    firstName: "name18",
    secondName: "lastName18",
    profilePicture: "profilePicture8",
    price: 10,
    category: "category8",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location8",
  },
  {
    id: 19,
    title: "title9",
    firstName: "name19",
    secondName: "lastName19",
    profilePicture: "profilePicture9",
    price: 15,
    category: "category9",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location9",
  },
  {
    id: 20,
    title: "title10",
    firstName: "name20",
    secondName: "lastName20",
    profilePicture: "profilePicture10",
    price: 5,
    category: "category10",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location10",
  },
];

export const guestOfferPage: IGuestOfferPage = {
  id: 1,
  title: "title1",
  firstName: "name1",
  secondName: "lastName1",
  profilePicture: "profilePicture1",
  price: 5,
  category: "category1",
  description:
    "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
  location: "location1",
  gallery: ["image1", "image2"],
};

export const guestOfferPageList: IGuestOfferPage[] = [
  {
    id: 1,
    title: "title1",
    firstName: "name1",
    secondName: "lastName1",
    profilePicture: "profilePicture1",
    price: 5,
    category: "category1",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location1",
    gallery: ["image1", "image2"],
  },

  {
    id: 2,
    title: "title2",
    firstName: "name2",
    secondName: "lastName2",
    profilePicture: "profilePicture2",
    price: 5,
    category: "category2",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location2",
    gallery: ["image1", "image2"],
  },
  {
    id: 3,
    title: "title3",
    firstName: "name3",
    secondName: "lastName3",
    profilePicture: "profilePicture3",
    price: 5,
    category: "category3",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location3",
    gallery: ["image1", "image2"],
  },
];
/*export const offersListForUser: IOfferUser[] = [
  {
    id: 1,
    title: "title1",
    name: "name1",
    profilePicture: "profilePicture1",
    price: 5,
    category: "category1",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location1",
    gallery: ["image1", "image2"],
    email: "email1",
    phone: "phone1",
  },
  {
    id: 2,
    title: "title2",
    name: "name2",
    profilePicture: "profilePicture2",
    price: 5,
    category: "category2",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location2",
    gallery: ["image1", "image2"],
    email: "email2",
    phone: "phone2",
  },
  {
    id: 3,
    title: "title3",
    name: "name3",
    profilePicture: "profilePicture3",
    price: 10,
    category: "category3",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location3",
    gallery: ["image1", "image2", "image3"],
    email: "email3",
    phone: "phone3",
  },
  {
    id: 4,
    title: "title4",
    name: "name4",
    profilePicture: "profilePicture4",
    price: 7,
    category: "category4",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location4",
    gallery: ["image1"],
    email: "email4",
    phone: "phone4",
  },

  {
    id: 5,
    title: "title5",
    name: "name5",
    profilePicture: "profilePicture5",
    price: 20,
    category: "category5",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location5",
    gallery: ["image1", "image2", "image3"],
    email: "email5",
    phone: "phone5",
  },
  {
    id: 6,
    title: "title6",
    name: "name6",
    profilePicture: "profilePicture6",
    price: 3,
    category: "category6",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location6",
    gallery: ["image1"],
    email: "email6",
    phone: "phone6",
  },
  {
    id: 7,
    title: "title7",
    name: "name7",
    profilePicture: "profilePicture7",
    price: 8,
    category: "category7",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location7",
    gallery: ["image1", "image2", "image3"],
    email: "email7",
    phone: "phone7",
  },
  {
    id: 8,
    title: "title8",
    name: "name8",
    profilePicture: "profilePicture8",
    price: 10,
    category: "category8",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location8",
    gallery: ["image1", "image2"],
    email: "email8",
    phone: "phone8",
  },
  {
    id: 9,
    title: "title9",
    name: "name9",
    profilePicture: "profilePicture9",
    price: 15,
    category: "category9",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location9",
    gallery: ["image1", "image2"],
    email: "email9",
    phone: "phone19",
  },
  {
    id: 10,
    title: "title10",
    name: "name10",
    profilePicture: "profilePicture10",
    price: 5,
    category: "category10",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location10",
    gallery: ["image1", "image2"],
    email: "email10",
    phone: "phone10",
  },
];

export const offersListForAdmin: IOfferAdmin[] = [
  {
    id: 1,
    userId: 1,
    title: "title1",
    name: "name1",
    profilePicture: "profilePicture1",
    price: 5,
    category: "category1",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location1",
    gallery: ["image1", "image2"],
    email: "email1",
    phone: "phone1",
  },
  {
    id: 2,
    userId: 2,
    title: "title2",
    name: "name2",
    profilePicture: "profilePicture2",
    price: 5,
    category: "category2",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location2",
    gallery: ["image1", "image2"],
    email: "email2",
    phone: "phone2",
  },
  {
    id: 3,
    userId: 3,
    title: "title3",
    name: "name3",
    profilePicture: "profilePicture3",
    price: 10,
    category: "category3",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location3",
    gallery: ["image1", "image2", "image3"],
    email: "email3",
    phone: "phone3",
  },
  {
    id: 4,
    userId: 4,
    title: "title4",
    name: "name4",
    profilePicture: "profilePicture4",
    price: 7,
    category: "category4",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location4",
    gallery: ["image1"],
    email: "email4",
    phone: "phone4",
  },

  {
    id: 5,
    userId: 5,
    title: "title5",
    name: "name5",
    profilePicture: "profilePicture5",
    price: 20,
    category: "category5",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location5",
    gallery: ["image1", "image2", "image3"],
    email: "email5",
    phone: "phone5",
  },
  {
    id: 6,
    userId: 6,
    title: "title6",
    name: "name6",
    profilePicture: "profilePicture6",
    price: 3,
    category: "category6",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location6",
    gallery: ["image1"],
    email: "email6",
    phone: "phone6",
  },
  {
    id: 7,
    userId: 7,
    title: "title7",
    name: "name7",
    profilePicture: "profilePicture7",
    price: 8,
    category: "category7",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location7",
    gallery: ["image1", "image2", "image3"],
    email: "email7",
    phone: "phone7",
  },
  {
    id: 8,
    userId: 8,
    title: "title8",
    name: "name8",
    profilePicture: "profilePicture8",
    price: 10,
    category: "category8",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location8",
    gallery: ["image1", "image2"],
    email: "email8",
    phone: "phone8",
  },
  {
    id: 9,
    userId: 9,
    title: "title9",
    name: "name9",
    profilePicture: "profilePicture9",
    price: 15,
    category: "category9",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location9",
    gallery: ["image1", "image2"],
    email: "email9",
    phone: "phone19",
  },
  {
    id: 10,
    userId: 10,
    title: "title10",
    name: "name10",
    profilePicture: "profilePicture10",
    price: 5,
    category: "category10",
    description:
      "descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
    location: "location10",
    gallery: ["image1", "image2"],
    email: "email10",
    phone: "phone10",
  },
];
*/
