
import styles from "./Gallery.module.css";

interface GalleryProps {
  gallery: { id: number; imageUrl: string }[];
  currentIndex: number;
  openModal: (imageUrl: string, index: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  className?: string;
}

export default function Gallery({
  gallery,
  currentIndex,
  openModal,
  handlePrev,
  handleNext,
  className,
}: GalleryProps) {
  
  return (
    <div className={`${styles.galleryContainer} ${className || ""}`}>
      <img
        className={styles.parenthesis}
        src="./Leftparenthesis.png"
        alt="Left parenthesis"
        onClick={handlePrev}
      />

      {gallery.length > 0 ? (
        gallery.slice(currentIndex, currentIndex + 4).map((image, index) => (
          <img
            key={image.id}
            src={image.imageUrl}
            alt="Gallery item picture"
            className={styles.galleryItem}
            onClick={() => openModal(image.imageUrl, index)}
          />
        ))
      ) : (
        <img
          src={`/no-gallery-default-image.avif`}
          alt="Default picture"
          className={styles.galleryItem}
        />
      )}

      <img
        className={styles.parenthesis}
        src="./Right parenthesis.png"
        alt="Right parenthesis"
        onClick={handleNext}
      />
    </div>
  );
}
