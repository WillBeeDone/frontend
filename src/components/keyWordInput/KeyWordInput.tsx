import { ChangeEvent, JSX } from "react";
import styles from "./KeyWordInput.module.css";

interface IKeyWordInputProps {
  className: string;
  name: string;
  type: string;
  placeholder: string;
  require?: boolean;
  value: string;
  imageSrc?: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // стандартный реактовский пропс передачи функции реагирования на нажатие клавиши клавиатуры
}

function KeyWordInput({
  className,
  name,
  type,
  placeholder,
  require,
  value,
  onChange,
  imageSrc,
  onKeyDown,
}: IKeyWordInputProps): JSX.Element {
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 100);
    onChange(newValue);
  };

  return (
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          {imageSrc && <img src={imageSrc} alt="search icon" className={styles.icon} />}
          <input
            className={className}
            name={name}
            type={type}
            placeholder={placeholder}
            required={require}
            value={value}
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
  );
}

export default KeyWordInput;