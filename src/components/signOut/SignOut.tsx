import { JSX } from "react";
import styles from "./SignOut.module.css";
import { useDispatch } from "react-redux";
import { signOut } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

interface ISignOutProps {
  onSignOut: () => void;
}

export default function SignOut({ onSignOut }: ISignOutProps): JSX.Element {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    onSignOut(); 
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
