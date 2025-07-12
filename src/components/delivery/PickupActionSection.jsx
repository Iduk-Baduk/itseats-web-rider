import styles from "./PickupActionSection.module.css";

export default function PickupActionSection() {
  return (
    <div className={styles.actionSection}>
      <button className={styles.supportBtn}>
        <span className={styles.icon}>🛎️</span>
        파트너 지원센터에 전화
      </button>
      <button className={styles.pickupBtn}>픽업 완료</button>
    </div>
  );
}
