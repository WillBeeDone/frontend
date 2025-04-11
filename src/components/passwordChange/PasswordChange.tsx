import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearAuthError, passwordChange } from "../../features/auth/authActions";

import styles from "./PasswordChange.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";


function PasswordChange(): JSX.Element {
  //для регистрации
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  // валидация currentPassword
  const validateCurrentPassword = (currentPassword: string) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(currentPassword)
    ? ""
    : "Must contains upper&lower case, number, special character. Length 8 or more. ";
  

  // валидация password
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
      ? ""
      : "Must contains upper&lower case, number, special character. No white spaces. Length 8 or more. ";

  const validateConfirmPassword = (password: string, confirmPassword: string) =>
    password === confirmPassword ? "" : "The passwords do not match";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "currentPassword")
      setErrors((prev) => ({ ...prev, currentPassword: validateCurrentPassword(value) }));
    if (name === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    if (name === "confirmPassword")
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(formData.password, value),
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentPasswordError = validateCurrentPassword(formData.currentPassword);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
   

    if (currentPasswordError || passwordError || confirmPasswordError) {
      setErrors({
        currentPassword: currentPasswordError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

 dispatch(
      passwordChange({
        currentPassword: formData.currentPassword,
        newPassword: formData.password,
      })
    )
      .unwrap()
      .then(() => {
        alert("Password successfully changed!");
        setFormData({
            currentPassword: "",
            password: "",
            confirmPassword: "",
          });
        navigate("/");
      })
      .catch(() => {
        alert("Something went wrong... Password not changed.");
      });
    }
    
      useEffect(() => {
        return () => {
          dispatch(clearAuthError());
        };
      }, [dispatch]);

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.image}></div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
          <h2 className={styles.title}>Change password</h2>
          
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <MyInput
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                label="Current password"
                required
                onChange={handleChange}
                 data-testid="myInputpassword_khjfdbhbHBhjbfd"
                autoComplete="off"            
              />
              {errors.currentPassword && <p className={styles.error}>{errors.currentPassword}</p>}
            </div>

            <div className={styles.inputContainer }>
              <MyInput
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
                required
                onChange={handleChange}
                 data-testid="myInputPassword_Mmnbchvbvbv"
                autoComplete="off"   
              />
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <MyInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                label="Confirm password"
                required
                onChange={handleChange}
                data-testid="myInputConfirmPassword_HJgfgJnhfgvd" 
                autoComplete="off"   
              />
              {errors.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>
          </div>
         
          <div className={styles.btnGroup}>
        <MyButton  data-testid="myButtonChangePassword_Hghdhvgvd" type="submit" text={isLoading ? "Loading…" : "Save changes"} disabled={isLoading} variant="easy" />
        
        </div>
        </form>
      </div>
    </div>
  );
}


export default PasswordChange;