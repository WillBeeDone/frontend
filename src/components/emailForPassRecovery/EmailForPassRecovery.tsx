import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { emailForPassRecovery } from "../../features/auth/authActions";

import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import styles from "./EmailForPassRecovery.module.css";
import validator from 'validator';

function EmailForPassRecovery(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  
  const validateEmail = (email: string) => validator.isEmail(email) ? "" : "Incorrect email";

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validateEmail(email);

    if (errorMsg) {
      setEmailError(errorMsg);
      return;
    }

    dispatch(emailForPassRecovery({ email }))
      .unwrap()
      .then(() => {
        alert("Check your email please");
        setEmail("");
        navigate("/");
      })
      .catch(() => {
        setEmailError("Unknown email.");
      });
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.image}>
        <img src="./signInimage.jpeg" alt="Sign In" />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <MyInput
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Input your email"
              required
              onChange={handleChange}
              value={email}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={styles.btnGroup}>
            <MyButton type="submit" text="Send" />
            <MyButton type="button" text="Go back" to="/" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailForPassRecovery;
