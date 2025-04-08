import { JSX, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearAuthError, myProfile } from "../../features/auth/authActions";
import styles from "./MyProfile.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
//import validator from "validator";
import DropDown from "../dropDown/DropDown";

function MyProfile(): JSX.Element {
  // для удаления фото из инпута
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const storedCity =
    localStorage.getItem("selectedCity") || user.location || "all";
  const [selectedCity, setSelectedCity] = useState(storedCity);
  console.log(selectedCity);

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
    //email: "",
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
        profilePicture:
          user.profilePicture || "/no-profilePicture-default-image.jpg",
      });
    }
  }, [user]);

  //юз ефект нужен только для поиска проблемы, в логике приложения - не принимает участия
  useEffect(() => {
    console.log("In MyProfile Form - Updated formData:", formData);
  }, [formData]);

  //const validateEmail = (email: string) => validator.isEmail(email) ? "" : "Incorrect email";
  const validateFirstName = (firstName: string) => {
    if (!/^[A-Z][a-zA-Z]*$/.test(firstName))
      return "Start with upper case, letters only.";
    if (firstName.length > 30) return "Max length 30 characters.";
    return "";
  };
  const validateSecondName = (secondName: string) => {
    if (!/^[A-Z][a-zA-Z]*$/.test(secondName))
      return "Start with upper case, letters only.";
    if (secondName.length > 40) return "Max length 40 characters.";
    return "";
  };
  const validatePhone = (phone: string) => {
    if (!/^\+?[0-9]+$/.test(phone)) return "Only numbers and + symbol allowed.";
    if (phone.length > 30) return "Max length 30 characters.";
    return "";
  };

  const validateProfilePicture = (picture: string | File): string => {
    if (typeof picture === "string") return ""; // старе фото, не валідовуємо
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(picture.type))
      return "Only JPG, PNG, and GIF are allowed.";
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (picture.size > maxSize) return "File size must be under 5MB.";
    return "";
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    let newValue = name === "profilePicture" && files ? files[0] : value;
    //setFormData((prev) => ({ ...prev, [name]: newValue }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value, // Для файлів беремо перший обраний файл, для інших інпутів — значення
    }));

    setErrors((prev) => ({
      ...prev,
      //name === "email" ? validateEmail(value) :
      [name]:
        name === "firstName"
          ? validateFirstName(value)
          : name === "secondName"
          ? validateSecondName(value)
          : name === "phone"
          ? validatePhone(value)
          : name === "profilePicture"
          ? validateProfilePicture(newValue)
          : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      // email: validateEmail(formData.email),
      firstName: validateFirstName(formData.firstName),
      secondName: validateSecondName(formData.secondName),
      phone: validatePhone(formData.phone),
      profilePicture: validateProfilePicture(formData.profilePicture),
    };
    if (Object.values(validationErrors).some((err) => err)) {
      setErrors(validationErrors);
      return;
    }
    dispatch(
      myProfile({
        firstName: formData.firstName,
        secondName: formData.secondName,
        phone: formData.phone,
        location: formData.location,
        profilePicture: formData.profilePicture,
      })
    )
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

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  return (
    <div className={styles.myProfileContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.bannerProfile}>
          <h2 className={styles.firstName}>
            {formData.firstName ? `Welcome, ${formData.firstName}.` : "Welcome"}
          </h2>
        </div>

        <div className={styles.mainPart}>
          <div className={styles.leftPart}>
            <div className={styles.imageContainer}>
              <img
                src={
                  formData.profilePicture
                    ? typeof formData.profilePicture === "string"
                      ? formData.profilePicture
                      : URL.createObjectURL(formData.profilePicture)
                    : "/no-profilePicture-default-image.jpg"
                }
                alt="User photo"
              />
              <h3 className={styles.imageTitle}>
                <div className={styles.name}>
                  <p> {formData.firstName}</p>
                  <p>{formData.secondName}</p>
                </div>
                {formData.email}
              </h3>
            </div>
            <div className={styles.uploadInputContainer}>
              {/* цей варіант добре працює якщо в юзера є фото */}
              {formData.profilePicture &&
                formData.profilePicture !==
                  "/no-profilePicture-default-image.jpg" && (
                  <div className={styles.removeButton}>
                    <MyButton
                      data-testid="removeButton_NbdgTff"
                      text="Remove photo"
                      func={handleRemovePhoto}
                      variant="remove"
                    />
                  </div>
                )}

              <MyInput
                name="profilePicture"
                type="file"
                placeholder=""
                label=""
                onChange={handleChange}
                key={fileInputKey}
                variant="upload"
                isPhoto={true}
              />
              {errors.profilePicture && (
                <p className={styles.error}>{errors.profilePicture}</p>
              )}
            </div>
          </div>

          {/* цей варіант добре працює якщо в юзера НЕМАЄ фото */}
          {/* {formData.profilePicture && typeof formData.profilePicture !== "string" ? (
          <MyButton text="Remove photo" func={handleRemovePhoto} />
          ) : null} */}
          <div className={styles.rightPart}>
            <div className={styles.dropDownCity}>
              {" "}
              <p>Choose your city</p>
              <DropDown
                url="/api/locations"
                text="Choose city"
                onChange={(city) => {
                  setSelectedCity(city);
                  localStorage.setItem("selectedCity", city);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.nameInput}>
                <div className={styles.inputContainer}>
                  <MyInput
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    label="First name"
                    required
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                  {errors.firstName && (
                    <p className={styles.error}>{errors.firstName}</p>
                  )}
                </div>

                <div className={styles.inputContainer}>
                  <MyInput
                    name="secondName"
                    type="text"
                    placeholder="Enter your second name"
                    label="Second name"
                    required
                    onChange={handleChange}
                    value={formData.secondName}
                  />
                  {errors.secondName && (
                    <p className={styles.error}>{errors.secondName}</p>
                  )}
                </div>
              </div>

              <div className={styles.contactsInput}>
                <div className={styles.inputContainer}>
                  <MyInput
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    value={formData.email}
                    isReadOnly={true}
                  />
                  {/* {errors.email && <p className={styles.error}>{errors.email}</p>} */}
                </div>

                <div className={styles.inputContainer}>
                  <MyInput
                    name="phone"
                    type="text"
                    placeholder="Enter your phone number"
                    label="Phone"
                    required
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  {errors.phone && (
                    <p className={styles.error}>{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.btnGroup}>
              <MyButton
                type="submit"
                text={isLoading ? "Loading…" : "Save"}
                disabled={isLoading}
              />
            </div>
            <div className={styles.changePasswordLink}>
              <Link to="/password-change-form">Change password</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MyProfile;
