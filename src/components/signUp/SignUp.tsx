import { JSX, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearAuthError, signUp } from "../../features/auth/authActions";
import styles from "./SignUp.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import validator from "validator";

function SignUp(): JSX.Element {
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
    const hasCyrillic = /[а-яА-ЯёЁ]/;

    if (!validator.isEmail(email)) {
      return "Incorrect email";
    }

    if (hasCyrillic.test(email)) {
      return "Only Latin characters allowed";
    }

    return "";
  };

  // валидация password
  const validatePassword = (password: string) =>
    /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
      ? ""
      : "Must be 8 characters long or more. No white spaces. Must contain at least one: uppercase and lowercase letter, a number, a special character.";

  const validateConfirmPassword = (password: string, confirmPassword: string) =>
    password === confirmPassword ? "" : "The passwords do not match";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
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

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    const agreeError = formData.agree ? "" : "Agreement is required";

    if (emailError || passwordError || confirmPasswordError || agreeError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        agree: agreeError,
      });
      return;
    }

    dispatch(signUp({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        alert("Please, check your email.");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          agree: false,
        }); // очистка формы
        navigate("/");
      })
      .catch(() => {});
  };

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.image}></div>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <h2 className={styles.title}>Sign Up</h2>
          <div className={styles.signInLinkContainer}>
            <p>Already have an account?</p>
            <Link data-testid="LinkToSignIn_Jhfy" to="/sign-in-form">
              Sign In
            </Link>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <MyInput
                name="email"
                type="email"
                placeholder="Enter your email"
                label="Email address"
                required
                onChange={handleChange}
                data-testid="MyInputSignUp_Hgvsl"
                autoComplete="off"
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.inputContainer}>
              <MyInput
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
                required
                onChange={handleChange}
                data-testid="MyInputSignUp_Pgdts"
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
                data-testid="MyInputSignUp_Ytdr"
                autoComplete="off"
              />
              {errors.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              data-testid="SignUpCheckBox_Nhgy"
            />
            <label>
              I agree with{" "}
              <a data-testid="IAgreeWith" href="#/user-agreement">
                user agreement
              </a>
            </label>
          </div>
          {errors.agree && <p className={styles.error}>{errors.agree}</p>}

          <div className={styles.signBtn}>
            <MyButton
              type="submit"
              text={isLoading ? "Loading…" : "Sign up"}
              disabled={isLoading}
              variant="easy"
              data-testid="MyButtonSignUp_jhYgj"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
