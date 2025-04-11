import { JSX } from "react";
import styles from "./Footer.module.css";
interface IFooterProps {
  height?: number;
  backgroundColor?: string;
}

export default function Footer({}: IFooterProps): JSX.Element {
  return (
    <footer className={styles.footer}>
      <span>©WillBeeDone</span>
      <span>admin@willbeedone.com</span>
    </footer>
  );
}
