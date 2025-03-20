import { ChangeEvent, JSX } from "react";

interface IKeyWordInputProps {
  className: string;
  name: string;
  type: string;
  placeholder: string;
  require?: boolean;
  value: string;
  imageSrc?: string;
  onChange: (value: string) => void;
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
}: IKeyWordInputProps): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <div>
      {imageSrc && <img src={imageSrc} alt="search icon" />}
        {require === true ? (
          <input
            className="input"
            name={name}
            type={type}
            placeholder={placeholder}
            required
          />
        ) : (
          <input
            className={className}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}

export default KeyWordInput;
