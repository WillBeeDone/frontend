import { JSX } from "react";
import styles from "./Footer.module.css";
interface IFooterProps {
    height?:number, backgroundColor?:string
}

export default function Footer({height=50, backgroundColor="rgb(130, 130, 130)"}: IFooterProps) :JSX.Element{

  
  return (
    <div>
     <footer
      style={{
        backgroundColor,
        height: `${height}px`,
      }}
      className={styles.footer}
    >
      Footer
    </footer>
    </div>
  );
}
