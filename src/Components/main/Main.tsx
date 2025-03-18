import { useFormik } from "formik";
import { useState } from "react";
import style from "./Main.module.css";
import Button from "../button/Button";
import ShowAllElements from "../showAllElements/ShowAllElements";
import { offersListForAdmin, offersListForGuest } from "../../test data/Offer";
import GuestOffer from "../offer/GuestOffer";


interface IMain {
  text?: string;
}




export default function Main({
  text = "text",
}: IMain): JSX.Element {
  
    



  return (
    <>
      <div className={style.mainContainer}>
        

        <div className={style.inputZoneMainContainer}>
        
          <div className={style.inputZoneItem}>
          <p>control panel here</p>
          </div>
        </div>

       
        <GuestOffer/>       
            
         
      </div>

     
    </>
  );
}


