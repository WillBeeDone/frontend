import { JSX } from "react"
import Button from "../button/Button"
import style from "./Banner.module.css"
import MyButton from "../myButton/MyButton"



export default function Banner(): JSX.Element {
  return (
    <div className={style.boxForBanner}>
      <div className={style.searchByKeyWord}>
        
        <label htmlFor="key-word">What do you need help with?</label>
        <input type="text" name="" id="key-word" />
        <MyButton type="button" text="Search"/>


      </div>
    
    </div>
  )
}
