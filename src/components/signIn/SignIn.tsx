import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../myInput/MyInput";
import styles from "./SignIn.module.css";
import MyButton from "../myButton/MyButton";

function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Incorrect email";
  };

  const validatePassword = (password: string) => {
    return password.length >= 8
      ? ""
      : "Password must be at least 8 characters long";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        //alert("Login successful! Going to User Home Page....");
        navigate("/"); // путь к странице авторизированного пользователя
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error: unknown) {
      console.error("SignIn error:", error);
      setMessage("Network error. Please try again later.");
    }
    setIsLoading(false);
  };

  const handleGoBack = () => {
    //alert("Go back to Guest Home Page...");
    navigate("/"); // путь к странице гостя
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Sign In</h2>
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
      {message && <p className={styles.error}>{message}</p>}
      <div className={styles.btnGroup}>
        <MyButton
          type="submit"
          text={isLoading ? "Loading..." : "Sign in"}
          disabled={isLoading}
        />
        <MyButton type="button" text="Go back" func={handleGoBack} />
      </div>
      <div className={styles.links}>
        {/* добавить путь на форму восстановления пароля */}
        <MyButton type="button" text="Forget Password?" variant="easy" to="/"/>
        <MyButton
          type="button"
          text="Don't have an account yet?"
          to="/sign-up-form"
          variant="easy"
        />
      </div>
    </form>
  );
}

export default SignIn;