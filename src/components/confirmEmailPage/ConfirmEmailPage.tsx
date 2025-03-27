import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const confirmationCode = searchParams.get("code");
  const [message, setMessage] = useState("Confirming your email...");
  const [userId, setUserId] = useState<string | null>(null); // позитивный сценарий - прийдет id юзера

  useEffect(() => {
    if (confirmationCode) {
      axios
        .get(`/api/register/${confirmationCode}`)
        .then((response) => {
          if (response.data.userId) {
            setUserId(response.data.userId);
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
    <div>
      {userId ? (
        <>
          <h2>Welcome!</h2>
          <p>{message}</p>
          <Link to="/sign-in-form">Please, Sign In.</Link>
        </>
      ) : (
        <>
          <h2>Oops!</h2>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}
