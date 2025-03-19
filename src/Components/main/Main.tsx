
import style from "./Main.module.css";


import OfferCard from "../offer/OfferCard";


export default function Main(): JSX.Element {

    

  return (
    <>
      <div className={style.mainContainer}>
        

        <div className={style.inputZoneMainContainer}>
        
          <div className={style.inputZoneItem}>
          <p>control panel here</p>
          </div>
        </div>

       
        <OfferCard/>       
            
         
      </div>

     
    </>
  );
}


