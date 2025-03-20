import { ChangeEvent, JSX } from "react";
import styles from "./KeyWordInput.module.css"

interface IKeyWordInputProps {
  className:string, name:string, type:string, placeholder:string, label:string, require?:boolean, value: string,  onChange: (value: string) => void; 
}


function KeyWordInput({className, name, type, placeholder, label, require, value, onChange }:IKeyWordInputProps):JSX.Element {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <div>
        <label >{label}</label>
      </div>
      <div>
        {require === true ? (<input className="input" name={name} type={type} placeholder={placeholder} required/>) : (<input className={className} name={name} type={type} placeholder={placeholder} value={value} onChange={handleChange}/>)} 
      </div>
    </div>
  );
}

export default KeyWordInput;
