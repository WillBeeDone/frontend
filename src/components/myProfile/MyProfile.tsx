import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { myProfile } from "../../features/auth/authActions";

import styles from "./MyProfile.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import validator from "validator";
import DropDown from "../dropDown/DropDown";
import { useOffers } from "../../context/OffersContext";


function MyProfile(): JSX.Element {

  const { setSelectedCity } = useOffers();


  //для регистрации
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    secondName: "",
    location: "",
    phone: "",
    profilePicture: "",
    agree: false,
  });

  

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    location: "",
    phone: "",
    profilePicture: "",
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


    const nameError = validateEmail(formData.email);
    const locationError = validateEmail(formData.email);
    const phoneError = validateEmail(formData.email);
    const profilePictureError = validateEmail(formData.email);



    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    const agreeError = formData.agree ? "" : "Agreement is required";

    if (emailError || passwordError || confirmPasswordError || agreeError || nameError || locationError || phoneError ||  profilePictureError) {
      setErrors({ email: emailError, password: passwordError, confirmPassword: confirmPasswordError, agree: agreeError, name: nameError, location: locationError, phone: phoneError, profilePicture: profilePictureError });
      return;
    }


    dispatch(myProfile({ id: user.id, firstName: formData.firstName, secondName: formData.secondName,  email: formData.email, phone: formData.phone, location: formData.location, profilePicture: formData.profilePicture, accessToken: user.accessToken }))
      .unwrap()
      .then(() => {
        setFormData({ email: "", password: "", confirmPassword: "", firstName: "", secondName: "",  location: "", phone: "", agree: false, profilePicture: "" }); // очистка формы   
        navigate("/");
      })
      .catch(() => {}); 
  };
  
  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>My Profile</h2>

      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.inputGroup}>
      <div className={styles.imageContainer}>< img src="/no-profilePicture-default-image.jpg" alt="User photo"/></div>
      <MyButton text="Remove photo" />
      <MyInput name="profilePicture" type="file" placeholder="" label="Upload photo" required onChange={handleChange} />
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="firstName" type="text" placeholder="Enter your first name" label="First name" required onChange={handleChange} />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="secondName" type="text" placeholder="Enter your second name" label="Second name" required onChange={handleChange} />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="location" type="text" placeholder="Enter location for your offers" label="Location" required onChange={handleChange} />
        {errors.location && <p className={styles.error}>{errors.location}</p>}
      </div>

      {/* <div className={styles.inputGroup}>
      <div className={styles.dropdown}>
        <DropDown
          url="/api/locations"
          text="Choose city"
          onChange={setSelectedCity}
        />
      </div>
      </div> */}

      <div className={styles.inputGroup}>
        <MyInput name="email" type="email" placeholder="Enter your email" label="Email" required onChange={handleChange} />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="phone" type="text" placeholder="Enter your phone number" label="Phone" required onChange={handleChange} />
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
      </div>
      
      <div className={styles.link}>
        <MyButton type="button" text="Change password" func={() => navigate("/sign-in-form")} variant="easy" />
      </div>

      <div className={styles.btnGroup}>
        <MyButton type="submit" text={isLoading ? "Loading…" : "Save changes"} disabled={isLoading} />
        <MyButton type="button" text="Go Back" to="/" />
      </div>
    </form>
  );
}

export default MyProfile;