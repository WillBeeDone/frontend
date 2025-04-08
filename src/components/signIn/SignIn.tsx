import { JSX, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearAuthError, signInByEmailAndPass } from "../../features/auth/authActions";

import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import styles from "./SignIn.module.css";
import validator from "validator";

function SignIn(): JSX.Element {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Флаг для отслеживания отправки формы
  const [isSubmitted, setIsSubmitted] = useState(false);

  // валидация email
  const validateEmail = (email: string) =>
    validator.isEmail(email) ? "" : "Invalid login or password.";

  // валидация password
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
      ? ""
      : "Invalid login or password.";

  // изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Показываем ошибки только если форма уже была отправлена
    if (isSubmitted) {
      setErrors({
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
      });
    }
  };

  // отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true); // Флаг выставляется при попытке отправки

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    dispatch(signInByEmailAndPass(formData))
      .unwrap()
      .then(() => {
        setFormData({ email: "", password: "" });

        // Очистка ошибок и сброс флага отправки после успешного входа
        setErrors({ email: "", password: "" });
        setIsSubmitted(false);

        navigate("/");
      })
      .catch((err) => {
        console.error("SignIn error:", err);
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
          <h2 className={styles.title}>Sign In</h2>
          <div className={styles.signInLinkContainer}>
            <p>Don’t have an acount?</p>
            <Link data-testid="LinkToSignUp_HyftR" to="/sign-Up-form">
              Sign Up
            </Link>
          </div>

          {/* визуализация ошибки об протухании рефреш токена или аксес токена */}
          {/* {error && <p className={styles.error}>{error}</p>} */}

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <MyInput
                name="email"
                type="email"
                placeholder="Enter your email"
                label="Email"
                required
                onChange={handleChange}
                data-testid="MyInputSignIp_KiuyyfY"
                autoComplete="off"
              />
            </div>

            <div className={styles.inputContainer}>
              <MyInput
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
                required
                onChange={handleChange}
                data-testid="MyInputSignIn_JhYtf"
                autoComplete="off"
              />

              {/* Ошибка теперь показывается только после отправки формы */}
              {isSubmitted && (errors.email || errors.password) && (
                <p className={styles.error}>
                  {errors.email || errors.password}
                </p>
              )}
            </div>
          </div>
          <div className={styles.signBtn}>

            <div className={styles.forgotPassword}>
              <Link
                data-testid="LinkToPasswordRecovery_HgFtg"
                to="/email-for-password-recovery-form"
              >
                Forget Password?
              </Link>
            </div>
            <MyButton
              type="submit"
              text={isLoading ? "Loading..." : "Sign in"}
              disabled={isLoading}
              variant="easy"
              data-testid="MyButtonSignIn_JuhYt"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
