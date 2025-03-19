import { JSX } from "react"
import Button from "../button/Button"
import style from "./Banner.module.css"



export default function Banner(): JSX.Element {
  return (
    <div className={style.boxForBanner}>
      <div>
        
        <label htmlFor="key-word">What do you need help with?</label>
        <input type="text" name="" id="key-word" />
        <Button type="button" text="Search"/>


      </div>
      <img src="/5871.png" alt="" />
      <img src="/girl1.png" alt="" />
      <img src="/portrait-young-beautiful1.png" alt="" />
      <img src="/pngkit_cleaning-lady-png_5559431.png" alt="" />
    </div>
  )
}
