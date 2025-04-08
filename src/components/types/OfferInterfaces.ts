//тип для оффера в общем списке в режиме Guest и User
export interface IOfferCard {
  id: number;
  firstName: string;
  secondName: string;
  location: string;
  title: string;
  category: string;
  price: number;
  description: string;
  profilePicture: string;
}

//тип для галереи оффера - не знаю финальную нужную структуру, не знаю финальную структуру responce от БЕК-енда, id:number, imageId:number, imageUrl:string
export interface IGallery {
  id: number;
  imageUrl: string;
}

//тип для конкретного оффера в режиме Guest, скорее всего нужны изменения в зависимости от структуры IUserOfferPageGallery
export interface IGuestOfferPage {
  id: number;
  firstName: string;
  secondName: string;
  location: string;
  title: string;
  category: string;
  price: number;
  description: string;
  profilePicture: string;
  gallery: IGallery[];
  email: string;
  phone: string;
}

//тип для конкретного оффера в режиме User
// export interface IUserOfferPage extends IGuestOfferPage {
//   email: string;
//   phone: string;
// }

// export interface IAdminOfferPage extends IUserOfferPage {
//   userId: number;
//   isActive: boolean;
// }

export interface IOfferForTransformOfferCardPagination {
  id: number;
  title: string;
  categoryDto: {
    name: string;
  };
  pricePerHour: number;
  description: string;
  userFilterResponseDto: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    locationDto: {
      cityName: string;
    };
  };
}


export interface IMyOfferForTransformOfferCardPagination {
  id: number;
  title: string;
  categoryDto: {
    name: string;
  };
  pricePerHour: number;
  description: string;
  userFilterResponseDto: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    locationDto: {
      cityName: string;
    };
  };
  active:boolean;
}

export interface IOfferState  {
    offer: IGuestOfferPage,
    isLoading: boolean,
    error: string,
  };


  //тип для моего оффера в общем списке
export interface IMyOfferCard extends IOfferCard{
  active: boolean;
}




