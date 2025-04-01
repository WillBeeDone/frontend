import { JSX, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { passwordRecovery } from "../../features/auth/authActions";

import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import styles from "./PasswordRecovery.module.css";

function PasswordRecovery(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { confirmationCode } = useParams<{ confirmationCode: string }>(); // Отримуємо код підтвердження з URL

  const [formData, setFormData] = useState({ newPassword: "", confirmNewPassword: "" });
  const [errors, setErrors] = useState({ newPassword: "", confirmNewPassword: "" });

  
  const validatePassword = (password: string) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
      ? ""
      : "Must contain upper & lower case, number, special character. Length 8 or more.";

 
  const validateConfirmPassword = (password: string, confirmPassword: string) =>
    password === confirmPassword ? "" : "The passwords do not match";

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "newPassword") {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: validatePassword(value) }));
    } else if (name === "confirmNewPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmNewPassword: validateConfirmPassword(formData.newPassword, value),
      }));
    }
  };

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPasswordError = validatePassword(formData.newPassword);
    const confirmNewPasswordError = validateConfirmPassword(formData.newPassword, formData.confirmNewPassword);

    if (newPasswordError || confirmNewPasswordError) {
      setErrors({ newPassword: newPasswordError, confirmNewPassword: confirmNewPasswordError });
      return;
    }

    
    dispatch(passwordRecovery({ password: formData.newPassword, confirmationCode: confirmationCode || "" }))
      .unwrap()
      .then(() => {
        alert("Password successfully changed!");
        navigate("/sign-in-form");
      })
      .catch(() => {
        alert("Something went wrong... Password not changed.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Password recovery</h2>

      <div className={styles.inputGroup}>
        <MyInput
          name="newPassword"
          type="password"
          placeholder="Please enter new password"
          label="New password"
          required
          onChange={handleChange}
        />
        {errors.newPassword && <p className={styles.error}>{errors.newPassword}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput
          name="confirmNewPassword"
          type="password"
          placeholder="Confirm new password"
          label="Confirm password"
          required
          onChange={handleChange}
        />
        {errors.confirmNewPassword && <p className={styles.error}>{errors.confirmNewPassword}</p>}
      </div>

      <div className={styles.btnGroup}>
        <MyButton type="submit" text="Save new password" />
        <MyButton type="button" text="Cancel" to="/" />
      </div>
    </form>
  );
}

export default PasswordRecovery;