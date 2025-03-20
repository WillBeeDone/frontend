
import { useState } from "react";
import styles from "./MyInput.module.css";

interface IMyInputProps {
  className?: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function MyInput({
  className,
  name,
  type,
  placeholder,
  label,
  required,
  onChange,
}: IMyInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // видимость Password
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          className={className}
          name={name}
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
        {type === "password" && (
          <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {isPasswordVisible ? "👁" : "🐝"}
          </span>
        )}
      </div>
    </div>
  );
}

export default MyInput;