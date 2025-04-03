import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import MyButton from "../myButton/MyButton";
import styles from "./CreateNewOfferButton.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNewOfferButton() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const isProfileComplete = user?.firstName && user?.secondName && user?.phone && user?.location;

  const handleClick = () => {
    if (isProfileComplete) {
      navigate("/create-new-offer");
    } else {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <MyButton
        text="Create new Offer"
        func={handleClick} 
      />
      {showTooltip && (
        <div className={styles.tooltip}>
          Fill out My Profile first.
        </div>
      )}
    </div>
  );
}

export default CreateNewOfferButton;