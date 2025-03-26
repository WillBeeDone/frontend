import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../myInput/MyInput";
import styles from "./RecoveryForm.module.css";
import MyButton from "../myButton/MyButton";

interface RecoveryFormProps {
  onCancel?: () => void; // Добавляем пропс для закрытия формы
}

function RecoveryForm({ onCancel }: RecoveryFormProps): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const validatePassword = (password: string) => {
    return password.length >= 8
      ? ""
      : "Password must be at least 8 characters long";
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    return password === confirmPassword ? "" : "The passwords do not match";
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ newPassword: "", confirmNewPassword: "" });

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
    // запрос на сохранение пароля
    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: formData.newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      alert("Password successfully changed! Now you can sign in.");
      navigate("/sign-in-form"); 
    } catch (error: unknown) {
      console.error("Password recovery error:", error);
      alert("Error updating password. Please try again later.");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Если передана кастомная функция, вызываем её
    } else {
      navigate("/"); // відмінити, повернення на домашню
    }
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
        {errors.newPassword && (
          <p className={styles.error}>{errors.newPassword}</p>
        )}
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
        {errors.confirmNewPassword && (
          <p className={styles.error}>{errors.confirmNewPassword}</p>
        )}
      </div>

      <div className={styles.btnGroup}>
        <MyButton type="submit" text="Save changes" />
        <MyButton type="button" text="Cancel" func={handleCancel} />
      </div>
    </form>
  );
}

export default RecoveryForm;