export interface IOfferGuest {
    id: number,title:string, name:string,profilePicture:string,location:string,category:string, gallery:string[], price:number,description:string
      
      }
  
  export interface IOfferUser extends IOfferGuest{
      email:string,phone:string
  }
  
  
  export interface IOfferAdmin extends IOfferUser {
  userId:number
  }