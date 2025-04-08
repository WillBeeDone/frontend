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
  value?: string | number;
  error?: boolean; // Добавляем пропс для ошибок
  variant?: "default" | "signInUp" | "upload";
  "data-testid"?: string;
  autoComplete?: string;
  isReadOnly?: boolean;
  isPhoto?: boolean;
  isGallery?: boolean;
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
  autoComplete = "off",
  isReadOnly = false,
  isPhoto = false,
  isGallery = false,
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
      [styles.readOnly]: isReadOnly, // стилизация заблокированного инпута
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
          autoComplete={autoComplete}
          readOnly={isReadOnly}
          accept={isPhoto ? "image/*" : undefined}
          {...(isGallery ? { multiple: true } : {})}
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
