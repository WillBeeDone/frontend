
import style from "./Main.module.css";
import OfferCard from "../offer/OfferCard";
import { JSX } from "react";
import Banner from "../banner/Banner";

export default function Main(): JSX.Element {

    
  return (
    <>
      <div className={style.mainContainer}>
        

        <div className={style.inputZoneMainContainer}>

        <Banner/>

          <div className={style.inputZoneItem}>
          <p>control panel here</p>
          </div>
        </div>

       
        <OfferCard/>       
            
         
      </div>

     
    </>
  );
}


