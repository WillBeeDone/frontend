import { JSX } from "react";
import styles from "./CategorySelector.module.css";
import DropDown from "../dropDown/DropDown";


interface ICategorySelectorProps {
  setSelectedCategory: (category: string) => void;
}

export default function CategorySelector({setSelectedCategory}: ICategorySelectorProps): JSX.Element {
 

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
