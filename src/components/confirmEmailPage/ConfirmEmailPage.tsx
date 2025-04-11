import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ConfirmEmailPage.module.css";
import axios from "axios";

export default function ConfirmEmailPage() {
  const { confirmationCode } = useParams(); // получаем код подтверждения из адресной строки
  const [message, setMessage] = useState("Confirming your email...");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (confirmationCode) {
      axios
        .get(`/api/register/${confirmationCode}`)
        .then((response) => {
          if (response.data) {
            setUserId(response.data);
            setMessage("✅ Email confirmed successfully!");
          }
        })
        .catch(() =>
          setMessage(
            "❌ Invalid or expired confirmation code. Please, try again."
          )
        );
    }
  }, [confirmationCode]);

  return (
    <div className={styles.confirmEmailContainer}>
      {userId ? (
        <>
          <img
            className={styles.Logo}
            src="/logoWillBeeDone1.png"
            alt="logo icon"
          />{" "}
          <h2>Welcome!</h2>
          <p>{message}</p>
          <p>
            Please,<Link to="/sign-in-form"> Sign In.</Link>{" "}
          </p>
        </>
      ) : (
        <>
          <img
            className={styles.Logo}
            src="/logoWillBeeDone1.png"
            alt="logo icon"
          />{" "}
          <h2>Oops!</h2>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}
