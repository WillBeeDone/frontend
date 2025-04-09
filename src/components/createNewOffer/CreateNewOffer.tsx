import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import styles from "./CreateNewOffer.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import DropDown from "../dropDown/DropDown";
import { createNewOffer } from "../../features/offer/offerActions";
import { clearAuthError } from "../../features/auth/authActions";

function CreateNewOffer(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    secondName: "",
    location: "",
    phone: "",
    profilePicture: "",
    title: "",
    category: "",
    price: 0,
    description: "",
    gallery: [] as string[],
  });

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    gallery: "",
  });

  //юз ефект нужен только для поиска проблемы, в логике приложения - не принимает участия
  useEffect(() => {
    console.log("In MyProfile Form - Updated formData:", formData);
  }, [formData]);

  const validateTitle = (title: string) => {
    if (!/^[A-Z][a-zA-Z]{1,39}$/.test(title))
      return "Start with upper case, letters only, max length 40 characters.";
    return "";
  };

  const validatePrice = (price: number) => {
    if (isNaN(price)) return "Price must be a valid number.";
    if (price < 1 || price > 500) return "Price must be between 1 and 500.";
    return "";
  };

  const validateCategory = (category: string) => {
    if (!category) return "Category is required.";
    return "";
  };

  const validateDescription = (description: string) => {
    if (description.length > 1500) return "Max length 1500 characters.";
    return "";
  };

  const validateGallery = (files: FileList | null) => {
    if (!files || files.length < 1) return "At least one file is required.";
    if (files.length > 7) return "You can upload a maximum of 7 files.";

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type))
        return "Only JPG, PNG, and GIF are allowed.";
      if (file.size > 5 * 1024 * 1024) return "File size must be under 5MB.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "gallery" && files) {
      if (formData.gallery.length >= 7) {
        setErrors((prev) => ({ ...prev, gallery: "Maximum 7 files allowed." }));
        return;
      }

      const newFiles = Array.from(files).slice(0, 7 - formData.gallery.length); // Обмеження 7 файлів
      const newGallery = [
        ...formData.gallery,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ];

      setFormData((prev) => ({
        ...prev,
        gallery: newGallery,
      }));

      setErrors((prev) => ({ ...prev, gallery: validateGallery(files) }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? value.replace(/[^0-9]/g, "") : value, // Зберігаємо price як рядок
      }));

      setErrors((prev) => ({
        ...prev,
        [name]:
          name === "title"
            ? validateTitle(value)
            : name === "price"
            ? validatePrice(Number(value) || 0)
            : name === "category"
            ? validateCategory(value)
            : name === "description"
            ? validateDescription(value)
            : "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      title: validateTitle(formData.title),
      price: validatePrice(formData.price),
      category: validateCategory(formData.category),
      description: validateDescription(formData.description),
      gallery: validateGallery(
        formData.gallery.length ? new DataTransfer().files : null
      ),
    };

    if (Object.values(validationErrors).some((err) => err)) {
      setErrors(validationErrors);
      return;
    }

    dispatch(
      createNewOffer({
        accessToken: user.accessToken,
        title: formData.title,
        category: formData.category,
        price: formData.price,
        description: formData.description,
        gallery: formData.gallery,
      })
    )
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  const handleRemovePhoto = (picture: string) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((img) => img !== picture),
    }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  return (
    <div className={styles.createOfferContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.bannerProfile}>
          <h2>My new offer</h2>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.mainPart}>
          <div className={styles.leftPart}>
            <div className={styles.imageContainer}>
              <img
                src={
                  user.profilePicture !== ""
                    ? user.profilePicture
                    : "/no-profilePicture-default-image.jpg"
                }
                alt="User photo"
              />
            </div>
            <div>
            <h3 className={styles.imageTitle}>
                <div className={styles.name}>
                  <p> {user.firstName}</p>
                  <p>{user.secondName}</p>
                  <p>{user.email}</p>
                </div>
                {formData.email}
              </h3>
              </div>
            <div className={styles.inputGroup}>
              <MyInput
                name="gallery"
                type="file"
                placeholder=""
                label="Upload image for gallery"
                onChange={handleChange}
                isPhoto={true}
                isGallery={true}
              />
              {/* <input type="file" name="gallery" accept="image/*" multiple onChange={handleChange} /> */}
              {errors.gallery && <p className="error">{errors.gallery}</p>}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.galleryContainer}>
                {formData.gallery.map((picture, index) => (
                  <div key={index} className={styles.galleryItemContainer}>
                    <img src={picture} alt="User uploaded" />
                    <MyButton
                      text="Remove photo"
                      func={() => handleRemovePhoto(picture)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <MyInput
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                label="First name"
                required
                value={user.firstName}
                isReadOnly={true}
              />
            </div>

            <div className={styles.inputGroup}>
              <MyInput
                name="secondName"
                type="text"
                placeholder="Enter your second name"
                label="Second name"
                required
                value={user.secondName}
                isReadOnly={true}
              />
            </div>

            <div className={styles.inputGroup}>
              <MyInput
                name="title"
                type="text"
                placeholder="Offer title"
                label="Title"
                required
                onChange={handleChange}
                value={formData.title}
              />
              {errors.title && <p className={styles.error}>{errors.title}</p>}
            </div>

            <div className={styles.inputGroup}>
              <MyInput
                name="price"
                type="number"
                placeholder="Price per hour"
                label="Price per hour"
                required
                onChange={handleChange}
                value={formData.price}
              />
              {errors.price && <p className={styles.error}>{errors.price}</p>}
            </div>

            <div className={styles.inputGroup}>
              <MyInput
                name="description"
                type="text"
                placeholder="Tell us about your abilities"
                label="Offer description"
                required
                onChange={handleChange}
                value={formData.description}
              />
              {errors.description && (
                <p className={styles.error}>{errors.description}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <DropDown
                url="/api/categories"
                switcher={3}
                text="Choose category"
              />
            </div>

            <div className={styles.inputGroup}>
              <MyInput
                name="email"
                type="email"
                placeholder="Enter your email"
                label="Email"
                required
                value={user.email}
                isReadOnly={true}
              />
            </div>

            <div className={styles.inputGroup}>
              <MyInput
                name="phone"
                type="text"
                placeholder="Enter your phone number"
                label="Phone"
                required
                value={user.phone}
                isReadOnly={true}
              />
            </div>

            <div className={styles.inputGroup}>
              <DropDown
                url="/api/locations"
                text="Choose city"
                isReadOnly={true}
              />
            </div>

            <div className={styles.btnGroup}>
              <MyButton
                type="submit"
                text={isLoading ? "Loading…" : "Publish"}
                disabled={isLoading}
              />
              <MyButton type="button" text="Go Back" to="/" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateNewOffer;
