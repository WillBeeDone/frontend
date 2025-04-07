import { JSX } from "react";
import styles from "./SignOut.module.css";
import { useDispatch } from "react-redux";
import { signOut } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useOffers } from "../../context/OffersContext";

interface ISignOutProps {
  onSignOut: () => void;
}

export default function SignOut({ onSignOut }: ISignOutProps): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setSelectedCategory, setSelectedKeyWord, fetchOffers } = useOffers();

  const handleSignOut = () => {
    dispatch(signOut());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    onSignOut(); 
    setSelectedCategory("all");
    setSelectedKeyWord("");
    fetchOffers("all", "all", "");
    navigate("/");
  };

  return (
    <Link
      to="/"
      className={styles.buttonSignOut}
      onClick={handleSignOut}
      data-testid="sign-out-link"
    >
      Sign out
    </Link>
  );
}
