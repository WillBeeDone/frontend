import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { signInByEmailAndPass } from "../../features/auth/authActions";

import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import styles from "./SignIn.module.css";
import validator from 'validator';

function SignIn(): JSX.Element {
  
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  // валидация email
  const validateEmail = (email: string) => {
     return validator.isEmail(email) ? "" : "Incorrect email";
  };

   // валидация password
   const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password) ? "" : "Must contains upper&lower case, number, special character. Length 8 or more. ";
  

  // изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  // отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    
    dispatch(signInByEmailAndPass(formData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("SignIn error:", err);
      });
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.image}>
        <img src="./signInimage.jpeg" alt="Sign In" />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Sign In</h2>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.inputGroup}>
            <MyInput
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
              required
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.inputGroup}>
            <MyInput
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              required
              onChange={handleChange}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>
          <div className={styles.btnGroup}>
            <MyButton
              type="submit"
              text={isLoading ? "Loading..." : "Sign in"}
              disabled={isLoading}
            />
            <MyButton type="button" text="Go back" to="/" />
          </div>
          <div className={styles.links}>
            <MyButton type="button" text="Forget Password?" variant="easy" to="/" />
            <MyButton type="button" text="Don't have an account yet?" to="/sign-up-form" variant="easy" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;