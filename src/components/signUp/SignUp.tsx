import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { signUp } from "../../features/auth/authActions";

import styles from "./SignUp.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import validator from "validator";

function SignUp(): JSX.Element {
  //для регистрации
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agree: "",
  });

  // валидация email
    const validateEmail = (email: string) => {
       return validator.isEmail(email) ? "" : "Incorrect email";
    };
  
     // валидация password
     const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password) ? "" : "Must contains upper&lower case, number, special character. Length 8 or more. ";
    
  
  const validateConfirmPassword = (password: string, confirmPassword: string) =>
    password === confirmPassword ? "" : "The passwords do not match";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

    if (name === "email") setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "password") setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    if (name === "confirmPassword")
      setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(formData.password, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    const agreeError = formData.agree ? "" : "Agreement is required";

    if (emailError || passwordError || confirmPasswordError || agreeError) {
      setErrors({ email: emailError, password: passwordError, confirmPassword: confirmPasswordError, agree: agreeError });
      return;
    }

    dispatch(signUp({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        alert("Please, check your email.");
        setFormData({ email: "", password: "", confirmPassword: "", agree: false }); // очистка форми
        navigate("/");
      })
      .catch(() => {}); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Registration</h2>

      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.inputGroup}>
        <MyInput name="email" type="email" placeholder="Enter your email" label="Email" required onChange={handleChange} />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="password" type="password" placeholder="Enter your password" label="Password" required onChange={handleChange} />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="confirmPassword" type="password" placeholder="Confirm your password" label="Confirm password" required onChange={handleChange} />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
        <label>I agree with <a href="#">user agreement</a></label>
      </div>
      {errors.agree && <p className={styles.error}>{errors.agree}</p>}

      <div className={styles.link}>
        <MyButton type="button" text="Already have an account?" func={() => navigate("/sign-in-form")} variant="easy" />
      </div>

      <div className={styles.btnGroup}>
        <MyButton type="submit" text={isLoading ? "Loading…" : "Sign up"} disabled={isLoading} />
        <MyButton type="button" text="Go Back" to="/" />
      </div>
    </form>
  );
}

export default SignUp;