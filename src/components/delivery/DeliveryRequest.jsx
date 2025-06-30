import styles from "./DeliveryRequest.module.css";

export default function DeliveryRequest({ request }) {
  return (
    <div className={styles.requestBox}>
      <div className={styles.titleRow}>
        <span className={styles.icon}>👤</span>
        <span className={styles.title}>고객 요청</span>
      </div>
      <div className={styles.requestText}>"{request}"</div>
      <div className={styles.buttonRow}>
        <button className={styles.subBtn}>고객에게 전화</button>
        <button className={styles.subBtn}>자동 문자 예약</button>
      </div>
    </div>
  );
}
