import { JSX } from "react";
import styles from "./CategorySelector.module.css";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../../context/OffersContext";

export default function CategorySelector(): JSX.Element {
  const { setSelectedCategory } = useOffers();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.categorySelector}>
      <p>Most Popular Categories</p>

      <div className={styles.buttonContainer}>
        {[
          "Plumber",
          "Auto Mechanic",
          "Pet Care",
          "Moving",
          "Computer Technician"
        ].map((category) => (
          <button key={category} onClick={() => handleCategorySelect(category)}>
            <img
              className={styles.imgStyle}
              src={`./categoryIcon/${category}.png`}
              alt={`${category} category icon`}
            />
            <span>{category}</span>
          </button>
        ))}
      </div>
      <div className={styles.dropdown}>
        <DropDown 
          url="/api/categories"
          onChange={setSelectedCategory}
          switcher={2}
          data-testid="DropDownCategoriesHomePage_yHfgzdgG"
        />
      </div>
      
    </div>
  );
}
