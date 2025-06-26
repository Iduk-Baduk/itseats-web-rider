import styles from "./Button.module.css";

export default function Button({ children, onClick, className = "", disabled = false, size = "md" }) {
  return (
    <button className={`${styles.button} ${className} ${styles[size]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
