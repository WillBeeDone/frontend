import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearAuthError, emailForPassRecovery } from "../../features/auth/authActions";

import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import styles from "./EmailForPassRecovery.module.css";
import validator from 'validator';

function EmailForPassRecovery(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

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

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);
  
  return (
    <div className={styles.signInContainer}>
      <div className={styles.image}></div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Forgot Password?</h2>
          <div className={styles.dontWory}>
            <p>Dont wory. We can help.</p>
            </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <MyInput
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Input your email"
              required
              onChange={handleChange}
              value={email}
              data-testid="MyInputPassRecovery_HdgfY"
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          </div>
          <div className={styles.btnGroup}>
            <MyButton data-testid="MyButtonPassRecovery_PhedgfY" type="submit" text={isLoading ? "Loading…" : "Send"} variant="easy"/>
            
           </div>
        </form>
      </div>
    </div>
  );
}

export default EmailForPassRecovery;
