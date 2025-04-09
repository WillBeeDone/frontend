export interface IUser {
    id: number
    firstName:string
    secondName:string

    email: string
    phone:string
    location:string

    role:string
   
    profilePicture: string

    accessToken: string
    refreshToken: string
}

export interface IAuthState  {
    user: IUser,
    isLoading: boolean,
    error: string,
    isAuthenticated?: string,
    userSelectedCity: string;
  };

