import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styles from "./CreateNewOfferLink.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateNewOfferLink({
  className = "",
}: {
  className?: string;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showTooltip, setShowTooltip] = useState(false);

  const isProfileComplete =
    user?.firstName && user?.secondName && user?.phone && user?.location;

  const handleClick = (e: React.MouseEvent) => {
    if (!isProfileComplete) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  return (
    <div className={`${styles[className]}`}>
      <Link
        to="/create-new-offer"
        onClick={handleClick}
        className={styles.linkButton}
      >
        Create Offer
      </Link>

      {showTooltip && (
        <div className={styles.tooltip}>
          <p>Fill out </p>
          <Link to="/my-profile" className={styles.menuItem}>
            My Profile
          </Link>
          <p> first.</p>
        </div>
      )}
    </div>
  );
}
