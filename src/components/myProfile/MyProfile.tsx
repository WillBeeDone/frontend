
import {  JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { myProfile } from "../../features/auth/authActions";
import styles from "./MyProfile.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import validator from "validator";

function MyProfile(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    secondName: "",
    location: "",
    phone: "",
    profilePicture: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    secondName: "",
    location: "",
    phone: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        firstName: user.firstName || "",
        secondName: user.secondName || "",
        location: user.location || "",
        phone: user.phone || "",
        profilePicture: user.profilePicture || "/no-profilePicture-default-image.jpg",
      });
    }
  }, [user]);

  const validateEmail = (email: string) => validator.isEmail(email) ? "" : "Incorrect email";
  const validateFirstName = (firstName: string) => {
    if (!/^[A-Z][a-zA-Z]*$/.test(firstName)) return "Start with upper case, letters only.";
    if (firstName.length > 30) return "Max length 30 characters.";
    return "";
  };
  const validateSecondName = (secondName: string) => {
    if (!/^[A-Z][a-zA-Z]*$/.test(secondName)) return "Start with upper case, letters only.";
    if (secondName.length > 40) return "Max length 40 characters.";
    return "";
  };
  const validateLocation = (location: string) => {
    if (!/^[A-Z][a-zA-Z- ]*$/.test(location)) return "Start with upper case, letters, spaces, and hyphens only.";
    if (location.length > 20) return "Max length 20 characters.";
    return "";
  };
  const validatePhone = (phone: string) => {
    if (!/^\+?[0-9]+$/.test(phone)) return "Only numbers and + symbol allowed.";
    if (phone.length > 30) return "Max length 30 characters.";
    return "";
  };
  const validateProfilePicture = (file: File | null) => {
    if (!file) return "No file selected.";
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) return "Only JPG, PNG, and GIF are allowed.";
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) return "File size must be under 5MB.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    let newValue = name === "profilePicture" && files ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({
      ...prev,
      [name]: name === "email" ? validateEmail(value) :
              name === "firstName" ? validateFirstName(value) :
              name === "secondName" ? validateSecondName(value) :
              name === "location" ? validateLocation(value) :
              name === "phone" ? validatePhone(value) :
              name === "profilePicture" ? validateProfilePicture(newValue as File | null) : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      email: validateEmail(formData.email),
      firstName: validateFirstName(formData.firstName),
      secondName: validateSecondName(formData.secondName),
      location: validateLocation(formData.location),
      phone: validatePhone(formData.phone),
      profilePicture: validateProfilePicture(formData.profilePicture as unknown as File | null),
    };
    if (Object.values(validationErrors).some((err) => err)) {
      setErrors(validationErrors);
      return;
    }
    dispatch(myProfile({
      id: user.id,
      firstName: formData.firstName,
      secondName: formData.secondName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      profilePicture: formData.profilePicture,
      accessToken: user.accessToken,
    }))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>My Profile</h2>
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.inputGroup}>
        <div className={styles.imageContainer}>
          <img src={typeof formData.profilePicture === "string" ? formData.profilePicture : URL.createObjectURL(formData.profilePicture)} alt="User photo" />
        </div>
        <MyButton text="Remove photo" />
        <MyInput name="profilePicture" type="file" placeholder="" label="Upload photo" onChange={handleChange} />
        {errors.profilePicture && <p className={styles.error}>{errors.profilePicture}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="firstName" type="text" placeholder="Enter your first name" label="First name" required onChange={handleChange} />
        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="secondName" type="text" placeholder="Enter your second name" label="Second name" required onChange={handleChange} />
        {errors.secondName && <p className={styles.error}>{errors.secondName}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="location" type="text" placeholder="Enter location for your offers" label="Location" required onChange={handleChange} />
        {errors.location && <p className={styles.error}>{errors.location}</p>}
      </div>

      <div className={styles.inputGroup}>
      <MyInput name="email" type="email" placeholder="Enter your email"  label="Email" required onChange={handleChange} value={formData.email} />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
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
