
   
export interface IOfferCard {
    id: number,firstName:string, secondName:string, location:string, title:string, category:string, price:number,description:string, profilePicture:string
      
      }
         
export interface IGuestOfferPage {
    id: number,firstName:string, secondName:string, location:string, title:string, category:string, price:number,description:string, profilePicture:string, gallery:string[]
      
      }
  
  export interface IUserOfferPage extends IGuestOfferPage{
      email:string, phone:string
  }
  
  
  export interface IAdminOfferPage extends IUserOfferPage {
  userId:number
  }