
import {  JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { myProfile } from "../../features/auth/authActions";
import styles from "./MyProfile.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import validator from "validator";
import DropDown from "../dropDown/DropDown";


function MyProfile(): JSX.Element {

   // для удаления фото из инпута
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const storedCity = localStorage.getItem("selectedCity") || user.location || "all";
  const [selectedCity, setSelectedCity] = useState(storedCity);
  useEffect(() => {
    if (user.location) {
      setSelectedCity(user.location);
      localStorage.setItem("selectedCity", user.location);
    }
  }, [user.location]);
  
  

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
    phone: "",
    profilePicture: "",
  });

  useEffect(() => { 
    console.log("In MyProfile Form -  User from Redux:", user); // Додано для перевірки
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

  //юз ефект нужен только для поиска проблемы, в логике приложения - не принимает участия
  useEffect(() => {
    console.log("In MyProfile Form - Updated formData:", formData);
  }, [formData]);

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
  const validatePhone = (phone: string) => {
    if (!/^\+?[0-9]+$/.test(phone)) return "Only numbers and + symbol allowed.";
    if (phone.length > 30) return "Max length 30 characters.";
    return "";
  };
  const validateProfilePicture = (file: File | null) => {
    if (!file) return "No file selected.";
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(file.type)) return "Only JPG, PNG, and GIF are allowed.";
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) return "File size must be under 5MB.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    let newValue = name === "profilePicture" && files ? files[0] : value;
    //setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,  // Для файлів беремо перший обраний файл, для інших інпутів — значення
    }));
    
    setErrors((prev) => ({
      ...prev,
      [name]: name === "email" ? validateEmail(value) :
              name === "firstName" ? validateFirstName(value) :
              name === "secondName" ? validateSecondName(value) :
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


  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: "", // Видаляємо фото локально
    }));
    //заставляем перерисовать инпут
    setFileInputKey(Date.now());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>My Profile</h2>
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.inputGroup}>
        <div className={styles.imageContainer}>
        <img src={formData.profilePicture ? (typeof formData.profilePicture === "string" 
        ? formData.profilePicture 
        : URL.createObjectURL(formData.profilePicture)) : "/no-profilePicture-default-image.jpg"} 
        alt="User photo" />
        </div>
       
        {formData.profilePicture && typeof formData.profilePicture !== "string" ? (
       <MyButton text="Remove photo" func={handleRemovePhoto} />
       ) : null}
        
        <MyInput name="profilePicture" type="file" placeholder="" label="Upload photo" onChange={handleChange} key={fileInputKey}/>
        {errors.profilePicture && <p className={styles.error}>{errors.profilePicture}</p>}

      </div>

      <div className={styles.inputGroup}>
        <MyInput name="firstName" type="text" placeholder="Enter your first name" label="First name" required onChange={handleChange} value={formData.firstName}/>
        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="secondName" type="text" placeholder="Enter your second name" label="Second name" required onChange={handleChange} value={formData.secondName}/>
        {errors.secondName && <p className={styles.error}>{errors.secondName}</p>}
      </div>

     

      <div className={styles.inputGroup}>
      <MyInput name="email" type="email" placeholder="Enter your email"  label="Email" required onChange={handleChange} value={formData.email} />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.inputGroup}>
        <MyInput name="phone" type="text" placeholder="Enter your phone number" label="Phone" required onChange={handleChange} value={formData.phone}/>
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
      </div>

      <div className={styles.inputGroup}>
      <DropDown
        url="/api/locations"
        text="Choose city"
        onChange={(city) => {
        setSelectedCity(city);
        localStorage.setItem("selectedCity", city);
        }}
      />
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
