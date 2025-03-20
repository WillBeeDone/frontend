<<<<<<< HEAD:src/Components/keyWordInput/KeyWordInput.tsx
import { ChangeEvent, JSX } from "react";

interface IKeyWordInputProps {
  className:string, name:string, type:string, placeholder:string, label:string, require?:boolean, value: string,  onChange: (value: string) => void; 
=======
import { JSX } from "react";

interface IMyInputProps {
  className:string, name:string, type:string, placeholder:string, label:string, require:boolean
>>>>>>> b89861218eff363f519c4a822f6c6b4c1c1b2cad:src/Components/myInput/MyInput.tsx
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
