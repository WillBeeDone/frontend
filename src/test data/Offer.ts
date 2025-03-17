//all fields of Offer entity : id, userId(user), title, name(user), profilePicture(user), location(user), category, photos from gallery, price, description, email(user), phone number(user)

// IOfferGuest: title, name, profilePicture, location, category, photos from gallery, price, description
// IOfferUser: IOfferGuest + email(user), phone number(user)
// IOfferAdmin - IOfferUser +  id, userId(user)

interface IOfferGuest {
  title:string, name:string,profilePicture:string,location:string,category:string, gallery:string[], price:number,description:string
    
    }

interface IOfferUser extends IOfferGuest{
    email:string,phone:string
}


interface IOfferAdmin extends IOfferUser {
id:number,userId:number

}

export const offersListForGuest:IOfferGuest[] = [
    {
        title:"title1",
        name: "name1",
        profilePicture:"profilePicture1",
        price:5,
        category:"category1",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location1",
        gallery: ["image1", "image2"],
      },
      {
        title:"title2",
        name: "name2",
        profilePicture:"profilePicture2",
        price:5,
        category:"category2",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location2",
        gallery: ["image1", "image2"],
      },
      {
        title:"title3",
        name: "name3",
        profilePicture:"profilePicture3",
        price:10,
        category:"category3",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location3",
        gallery: ["image1", "image2","image3"],
      },
      {
        title:"title4",
        name: "name4",
        profilePicture:"profilePicture4",
        price:7,
        category:"category4",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location4",
        gallery: ["image1"],
      },
     
      {
        title:"title5",
        name: "name5",
        profilePicture:"profilePicture5",
        price:20,
        category:"category5",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location5",
        gallery: ["image1", "image2", "image3"],
      },
      {
        title:"title6",
        name: "name6",
        profilePicture:"profilePicture6",
        price:3,
        category:"category6",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location6",
        gallery: ["image1"],
      },
      {
        title:"title7",
        name: "name7",
        profilePicture:"profilePicture7",
        price:8,
        category:"category7",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location7",
        gallery: ["image1", "image2", "image3"],
      },
      {
        title:"title8",
        name: "name8",
        profilePicture:"profilePicture8",
        price:10,
        category:"category8",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location8",
        gallery: ["image1", "image2"],
      },
      {
        title:"title9",
        name: "name9",
        profilePicture:"profilePicture9",
        price:15,
        category:"category9",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location9",
        gallery: ["image1", "image2"],
      },
      {
        title:"title10",
        name: "name10",
        profilePicture:"profilePicture10",
        price:5,
        category:"category10",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location10",
        gallery: ["image1", "image2"],
      },




      {
        title:"title1",
        name: "name1",
        profilePicture:"profilePicture1",
        price:5,
        category:"category1",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location1",
        gallery: ["image1", "image2"],
      },
      {
        title:"title2",
        name: "name2",
        profilePicture:"profilePicture2",
        price:5,
        category:"category2",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location2",
        gallery: ["image1", "image2"],
      },
      {
        title:"title3",
        name: "name3",
        profilePicture:"profilePicture3",
        price:10,
        category:"category3",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location3",
        gallery: ["image1", "image2","image3"],
      },
      {
        title:"title4",
        name: "name4",
        profilePicture:"profilePicture4",
        price:7,
        category:"category4",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location4",
        gallery: ["image1"],
      },
     
      {
        title:"title5",
        name: "name5",
        profilePicture:"profilePicture5",
        price:20,
        category:"category5",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location5",
        gallery: ["image1", "image2", "image3"],
      },
      {
        title:"title6",
        name: "name6",
        profilePicture:"profilePicture6",
        price:3,
        category:"category6",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location6",
        gallery: ["image1"],
      },
      {
        title:"title7",
        name: "name7",
        profilePicture:"profilePicture7",
        price:8,
        category:"category7",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location7",
        gallery: ["image1", "image2", "image3"],
      },
      {
        title:"title8",
        name: "name8",
        profilePicture:"profilePicture8",
        price:10,
        category:"category8",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location8",
        gallery: ["image1", "image2"],
      },
      {
        title:"title9",
        name: "name9",
        profilePicture:"profilePicture9",
        price:15,
        category:"category9",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location9",
        gallery: ["image1", "image2"],
      },
      {
        title:"title10",
        name: "name10",
        profilePicture:"profilePicture10",
        price:5,
        category:"category10",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location10",
        gallery: ["image1", "image2"],
      }

];

export const offersListForUser:IOfferUser[] = [
    {
        title:"title1",
        name: "name1",
        profilePicture:"profilePicture1",
        price:5,
        category:"category1",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location1",
        gallery: ["image1", "image2"],
        email:"email1",
        phone:"phone1"
      },
      {
        title:"title2",
        name: "name2",
        profilePicture:"profilePicture2",
        price:5,
        category:"category2",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location2",
        gallery: ["image1", "image2"],
         email:"email2",
        phone:"phone2"
      },
      {
        title:"title3",
        name: "name3",
        profilePicture:"profilePicture3",
        price:10,
        category:"category3",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location3",
        gallery: ["image1", "image2","image3"],
         email:"email3",
        phone:"phone3"
      },
      {
        title:"title4",
        name: "name4",
        profilePicture:"profilePicture4",
        price:7,
        category:"category4",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location4",
        gallery: ["image1"],
         email:"email4",
        phone:"phone4"
      },
     
      {
        title:"title5",
        name: "name5",
        profilePicture:"profilePicture5",
        price:20,
        category:"category5",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location5",
        gallery: ["image1", "image2", "image3"],
         email:"email5",
        phone:"phone5"
      },
      {
        title:"title6",
        name: "name6",
        profilePicture:"profilePicture6",
        price:3,
        category:"category6",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location6",
        gallery: ["image1"],
         email:"email6",
        phone:"phone6"
      },
      {
        title:"title7",
        name: "name7",
        profilePicture:"profilePicture7",
        price:8,
        category:"category7",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location7",
        gallery: ["image1", "image2", "image3"],
         email:"email7",
        phone:"phone7"
      },
      {
        title:"title8",
        name: "name8",
        profilePicture:"profilePicture8",
        price:10,
        category:"category8",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location8",
        gallery: ["image1", "image2"],
         email:"email8",
        phone:"phone8"
      },
      {
        title:"title9",
        name: "name9",
        profilePicture:"profilePicture9",
        price:15,
        category:"category9",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location9",
        gallery: ["image1", "image2"],
         email:"email9",
        phone:"phone19"
      },
      {
        title:"title10",
        name: "name10",
        profilePicture:"profilePicture10",
        price:5,
        category:"category10",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location10",
        gallery: ["image1", "image2"],
         email:"email10",
        phone:"phone10"
      }
];

export const offersListForAdmin:IOfferAdmin[] = [
    {
        id: 1,
        userId: 1,
        title:"title1",
        name: "name1",
        profilePicture:"profilePicture1",
        price:5,
        category:"category1",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location1",
        gallery: ["image1", "image2"],
        email:"email1",
        phone:"phone1"
      },
      {
        id: 2,
        userId: 2,
        title:"title2",
        name: "name2",
        profilePicture:"profilePicture2",
        price:5,
        category:"category2",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location2",
        gallery: ["image1", "image2"],
         email:"email2",
        phone:"phone2"
      },
      {
        id: 3,
        userId: 3,
        title:"title3",
        name: "name3",
        profilePicture:"profilePicture3",
        price:10,
        category:"category3",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location3",
        gallery: ["image1", "image2","image3"],
         email:"email3",
        phone:"phone3"
      },
      {
        id: 4,
        userId: 4,
        title:"title4",
        name: "name4",
        profilePicture:"profilePicture4",
        price:7,
        category:"category4",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location4",
        gallery: ["image1"],
         email:"email4",
        phone:"phone4"
      },
     
      {
        id: 5,
        userId: 5,
        title:"title5",
        name: "name5",
        profilePicture:"profilePicture5",
        price:20,
        category:"category5",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location5",
        gallery: ["image1", "image2", "image3"],
         email:"email5",
        phone:"phone5"
      },
      {
        id: 6,
        userId: 6,
        title:"title6",
        name: "name6",
        profilePicture:"profilePicture6",
        price:3,
        category:"category6",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location6",
        gallery: ["image1"],
         email:"email6",
        phone:"phone6"
      },
      {
        id: 7,
        userId: 7,
        title:"title7",
        name: "name7",
        profilePicture:"profilePicture7",
        price:8,
        category:"category7",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location7",
        gallery: ["image1", "image2", "image3"],
         email:"email7",
        phone:"phone7"
      },
      {
        id: 8,
        userId: 8,
        title:"title8",
        name: "name8",
        profilePicture:"profilePicture8",
        price:10,
        category:"category8",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location8",
        gallery: ["image1", "image2"],
         email:"email8",
        phone:"phone8"
      },
      {
        id: 9,
        userId: 9,
        title:"title9",
        name: "name9",
        profilePicture:"profilePicture9",
        price:15,
        category:"category9",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location9",
        gallery: ["image1", "image2"],
         email:"email9",
        phone:"phone19"
      },
      {
        id: 10,
        userId: 10,
        title:"title10",
        name: "name10",
        profilePicture:"profilePicture10",
        price:5,
        category:"category10",
        description:"descriptiption1 + descriptiption2 + descriptiption3 + descriptiption4 + descriptiption5 + descriptiption6 + descriptiption7 + descriptiption8 + descriptiption9 + descriptiption10 +",
        location:"location10",
        gallery: ["image1", "image2"],
         email:"email10",
        phone:"phone10"
      }
];
