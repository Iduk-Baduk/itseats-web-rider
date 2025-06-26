import styles from "./LineButton.module.css";

export default function LineButton({ children, onClick, className = "", disabled = false, size = "md" }) {
  return (
    <button className={`${styles.button} ${className} ${styles[size]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
