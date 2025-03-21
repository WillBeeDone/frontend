
 //тип для оффера в общем списке в режиме Guest и User 
export interface IOfferCard {
    id: number,firstName:string, secondName:string, location:string, title:string, category:string, price:number,description:string, profilePicture:string
      
      }
     
       //тип для конкретного оффера в режиме Guest 
export interface IGuestOfferPage {
    id: number,firstName:string, secondName:string, location:string, title:string, category:string, price:number,description:string, profilePicture:string, gallery:string[]
      
      }
  
      //тип для конкретного оффера в режиме User  
  export interface IUserOfferPage extends IGuestOfferPage{
      email:string, phone:string
  }
  
  
  export interface IAdminOfferPage extends IUserOfferPage {
  userId:number, isActive:boolean
  }