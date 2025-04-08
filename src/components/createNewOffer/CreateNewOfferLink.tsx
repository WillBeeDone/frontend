import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styles from "./CreateNewOfferLink.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateNewOfferLink() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const isProfileComplete =
    user?.firstName && user?.secondName && user?.phone && user?.location;

  const handleClick = (e: React.MouseEvent) => {
    if (!isProfileComplete) {
      e.preventDefault(); // остановить переход по ссылке
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  return (
    <div className={styles.menuLinkCreateOffer}>
      <Link
        to="/create-new-offer"
        onClick={handleClick}
        className={styles.linkButton}
      >
        Create new Offer
      </Link>
      {showTooltip && (
        <div className={styles.tooltip}>Fill out My Profile first.</div>
      )}
    </div>
  );
}

export default CreateNewOfferLink;
