import { JSX } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";


interface IProtectedRouteProps {
  outlet: JSX.Element;
}

export default function ProtectedRoute({ outlet }: IProtectedRouteProps): JSX.Element {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated){
        return outlet;
    }
  return <Navigate to="/sign-in-form"/> 
}