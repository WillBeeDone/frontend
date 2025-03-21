import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SignUp.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";

function SignUp(): JSX.Element {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate("/sign-in-form");
  };
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

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Incorrect email";
  };

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
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(formData.password, value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    const agreeError = formData.agree
      ? ""
      : "Agreement to terms and conditions is required";

    if (emailError || passwordError || confirmPasswordError || agreeError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        agree: agreeError,
      });
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Please check your email to finish the registration process.");
        navigate("/guest-home");
      } else {
        setMessage(data.message || "Error during registration");
      }
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Network error. Try again later."
      );
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Registration</h2>
      <div className={styles.inputGroup}>
        <MyInput
          name="email"
          type="email"
          placeholder="Please enter your email"
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
          placeholder="Please enter your password"
          label="Password"
          required
          onChange={handleChange}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>
      <div className={styles.inputGroup}>
        <MyInput
          name="confirmPassword"
          type="password"
          placeholder="Please Confirm your password"
          label="Confirm password"
          required
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
        />
        <label>
          I agree with<a href="#"> user agreement</a>
        </label>
      </div>
      {errors.agree && <p className={styles.error}>{errors.agree}</p>}
      <div className={styles.link}>
        <MyButton
          type="button"
          text="Already have an account?"
          func={goToSignIn}
          variant="easy"
        />
      </div>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.btnGroup}>
        <MyButton
          type="submit"
          text={isLoading ? "Loading…" : "Sign up"}
          disabled={isLoading}
        />
        <MyButton type="button" text="Go Back" func={() => navigate("/")} />
      </div>
    </form>
  );
}

export default SignUp;