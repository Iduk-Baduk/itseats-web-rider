import styles from "./StoreImageSection.module.css";

export default function StoreImageSection({ imageUrl, alt }) {
  return (
    <div className={styles.imageBox}>
      <img src={imageUrl} alt={alt} className={styles.image} />
    </div>
  );
}
