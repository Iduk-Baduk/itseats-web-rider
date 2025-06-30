import styles from "./StoreTipSection.module.css";

export default function StoreTipSection({ title, icon, tip, buttonLabel, onButtonClick }) {
  return (
    <div className={styles.section}>
      <div className={styles.titleRow}>
        {icon === "store" && <span className={styles.icon}>🏢</span>}
        {icon === "parking" && <span className={styles.icon}>🅿️</span>}
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.tip}>{tip}</div>
      {buttonLabel && (
        <button className={styles.button} onClick={onButtonClick}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
