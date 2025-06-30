import styles from "./StoreActionSection.module.css";

export default function StoreActionSection({ onCancel, onCall, onArrive }) {
  return (
    <div className={styles.section}>
      <div className={styles.actionRow}>
        <button className={styles.cancelBtn} onClick={onCancel}>배차 취소하기</button>
        <button className={styles.callBtn} onClick={onCall}>
          <span className={styles.icon}>📞</span>
          파트너 지원센터에 전화
        </button>
      </div>
      <button className={styles.arriveBtn} onClick={onArrive}>매장도착</button>
    </div>
  );
}
