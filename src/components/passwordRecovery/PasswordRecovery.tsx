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

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

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
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: validatePassword(value),
      }));
    } else if (name === "confirmNewPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmNewPassword: validateConfirmPassword(
          formData.newPassword,
          value
        ),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPasswordError = validatePassword(formData.newPassword);
    const confirmNewPasswordError = validateConfirmPassword(
      formData.newPassword,
      formData.confirmNewPassword
    );

    if (newPasswordError || confirmNewPasswordError) {
      setErrors({
        newPassword: newPasswordError,
        confirmNewPassword: confirmNewPasswordError,
      });
      return;
    }

    dispatch(
      passwordRecovery({
        password: formData.newPassword,
        confirmationCode: confirmationCode || "",
      })
    )
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
    <div className={styles.passwordRecoveryContainer}>
      <div className={styles.image}></div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Password recovery</h2>

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <MyInput
                name="newPassword"
                type="password"
                placeholder="Please enter new password"
                label="New password"
                required
                onChange={handleChange}
                data-testid="MyInputPasswordRecovery_KjfyhH"
              />
              {errors.newPassword && (
                <p className={styles.error}>{errors.newPassword}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <MyInput
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm new password"
                label="Confirm password"
                required
                onChange={handleChange}
                data-testid="MyInputPasswordRecovery_HyftdTytyH"
              />
              {errors.confirmNewPassword && (
                <p className={styles.error}>{errors.confirmNewPassword}</p>
              )}
            </div>
          </div>
          <div className={styles.btnGroup}>
            <MyButton
              type="submit"
              variant="easy"
              text="Save new password"
              data-testid="MyButtonPasswordRecovery_HgftFdgtd"
            />
            <MyButton
              type="button"
              variant="danger"
              text="Cancel"
              to="/"
              data-testid="MyButtonPasswordRecovery_mnbhGfytd"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecovery;
