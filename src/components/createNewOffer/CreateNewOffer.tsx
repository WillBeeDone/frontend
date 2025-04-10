import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import styles from "./CreateNewOffer.module.css";
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import DropDown from "../dropDown/DropDown";
import { createNewOffer } from "../../features/offer//offerActions";
import { clearAuthError } from "../../features/auth/authActions";

function CreateNewOffer(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.offer);
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  type IFormDataType = {
    email: string;
    firstName: string;
    secondName: string;
    location: string;
    phone: string;
    profilePicture: string;
    title: string;
    category: string;
    price: number;
    description: string;
    gallery: File[];
  };

  const [formData, setFormData] = useState<IFormDataType>({
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
    gallery: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    price: "",
    description: "",
    gallery: "",
  });


  const validateTitle = (title: string) => {
    if (!/^[A-Z][a-zA-Z0-9 ]{1,39}$/.test(title))
      return "Start with upper case, letters & spaces only, max length 40 characters.";
    return "";
  };

  const validatePrice = (price: number) => {
    if (isNaN(price)) return "Price must be a valid number.";
    if (price < 1 || price > 500) return "Price must be between 1 and 500.";
    return "";
  };

  const validateDescription = (description: string) => {
    if (description.length > 4000) return "Max length 4000 characters.";
    return "";
  };

  const validateGallery = (files: File[]) => {
    if (!files || files.length < 1) return "At least one file is required.";
    if (files.length > 8) return "You can upload a maximum of 8 files.";

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type))
        return "Only JPG, PNG, and GIF are allowed.";
      if (!allowedTypes.includes(file.type))
        return "Only JPG, PNG, and GIF are allowed.";
      if (file.size > 5 * 1024 * 1024) return "File size must be under 5MB.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "gallery" && files) {
      if (formData.gallery.length >= 8) {
        setErrors((prev) => ({ ...prev, gallery: "Maximum 8 files allowed." }));
        return;
      }

      const newFiles = Array.from(files).slice(0, 8 - formData.gallery.length); // обмеження 8
      const newGallery = [...formData.gallery, ...newFiles]; // просто додаємо файли

      setFormData((prev) => ({
        ...prev,
        gallery: newGallery, // <-- тепер це масив File[]
      }));

      setErrors((prev) => ({ ...prev, gallery: validateGallery(newGallery) }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? value.replace(/[^0-9]/g, "") : value,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]:
          name === "title"
            ? validateTitle(value)
            : name === "price"
            ? validatePrice(Number(value) || 0)
            : name === "description"
            ? validateDescription(value)
            : "",
      }));
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: name === "description" ? validateDescription(value) : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      title: validateTitle(formData.title),
      price: validatePrice(formData.price),
      description: validateDescription(formData.description),
      gallery: validateGallery(formData.gallery),
    };

    if (
      Object.values(validationErrors).some((err) =>  err)
    ) {
      setErrors(validationErrors);
      return;
    }

    console.log("щас БУДЕТ ФЕТЧ - КАТЕГОРИЯ");
    console.log("КАТЕГОРИЯ - ", selectedCategory);

    dispatch(
      createNewOffer({
        title: formData.title,
        category: String(selectedCategory),
        price: formData.price,
        description: formData.description,
        gallery: formData.gallery,
      })
    )
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  const handleRemovePhoto = (picture: File) => {
    URL.revokeObjectURL(URL.createObjectURL(picture)); // звільняємо попередній URL
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter(
        (img: File) => !(img.name === picture.name && img.size === picture.size)
      ),
    }));
  };

  const handleCancel = () => {
    setFormData({
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
      gallery: [],
    });

    setErrors({
      title: "",
      price: "",
      description: "",
      gallery: "",
    });
    navigate("/");
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

              <div>
                <h3 className={styles.imageTitle}>
                  <div className={styles.name}>
                    <p> {user.firstName}</p>
                    <p>{user.secondName}</p>
                  </div>
                  <p>{user.email}</p>
                  {formData.email}
                </h3>
              </div>
            </div>
            <div className={styles.inputGallery}>
              <div className={styles.inputGroupGallery}>
                <MyInput
                  name="gallery"
                  type="file"
                  placeholder=""
                  label=""
                  variant="upload"
                  onChange={handleChange}
                  isPhoto={true}
                  isGallery={true}
                />
                {/* <input type="file" name="gallery" accept="image/*" multiple onChange={handleChange} /> */}
                {errors.gallery && <p className="error">{errors.gallery}</p>}
              </div>

              <div className={styles.renderGallery}>
                {formData.gallery.map((picture: File, index: number) => (
                  <div key={index} className={styles.galleryItemContainer}>
                    <img
                      src={URL.createObjectURL(picture)}
                      alt={`preview-${index}`}
                    />
                    <p
                      onClick={() => handleRemovePhoto(picture)}
                      className={styles.removePhoto}
                    >
                      X
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightPart}>
            <div className={styles.dropDownContainer}>
              <div>
                <DropDown
                  url="/api/categories"
                  switcher={3}
                  text="Choose category"
                  onChange={(category) => setSelectedCategory(category)}
                />
              </div>

              <div>
                <DropDown
                  url="/api/locations"
                  text="Choose city"
                  isReadOnly={true}
                  forMyProfile = {true}
                />
              </div>
            </div>
            <div className={styles.inputBlock}>
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
            </div>
            <div className={styles.inputBlock}>
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
            </div>
            <div className={styles.inputBlock}>
              <div className={styles.inputGroupProblem}>
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

              <div className={styles.inputGroupProblem}>
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
            </div>
            <div className={styles.inputDescription}>
              <label htmlFor="description">Describe your offer</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleTextAreaChange}
              />
              {errors.description && (
                <p className={styles.error}>{errors.description}</p>
              )}
              <div className={styles.downPart}>
                <div className={styles.btnGroup}>
                  <MyButton
                    type="submit"
                    text={isLoading ? "Loading…" : "Publish"}
                    disabled={isLoading}
                  />
                  <MyButton
                    type="button"
                    text="Cancel"
                    func={handleCancel}
                    variant="danger"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateNewOffer;
