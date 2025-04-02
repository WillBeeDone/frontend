
import { useState } from "react";
import styles from "./MyInput.module.css";
import classNames from "classnames";

interface IMyInputProps {
  className?: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean; // Добавляем пропс для ошибок
  variant?: "default" | "signInUp" ;
  "data-testid"?: string;
}

function MyInput({
  className,
  name,
  type,
  placeholder,
  label,
  required,
  onChange,
  value,
  error,
  variant = "default", 
  "data-testid": dataTestId = "default",
}: IMyInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // видимость Password
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputClass = classNames(
    styles.input, // Базовый стиль
    className, // Переданный класс
    styles[variant], // Стиль в зависимости от варианта
    {
      [styles.error]: error, // Если есть ошибка, добавляем стиль ошибки
    }
  );

  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          className={inputClass}
          name={name}
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={value}
          data-testid={dataTestId}
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