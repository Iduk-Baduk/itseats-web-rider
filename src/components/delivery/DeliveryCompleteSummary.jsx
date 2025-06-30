import styles from "./DeliveryCompleteSummary.module.css";

export default function DeliveryCompleteSummary({
  service,
  amount,
  baseFee,
  extraFee,
  missionText,
  missionProgress,
  onConfirm,
}) {
  return (
    <div className={styles.sheet}>
      <div className={styles.title}>
        <span>{service}</span> <b>배달 완료</b>
      </div>
      <div className={styles.amount}>{amount}</div>
      <div className={styles.feeBox}>
        <div className={styles.feeRow}>
          <span>기본 수수료</span>
          <span>{baseFee}</span>
        </div>
        <div className={styles.feeRow}>
          <span>추가 수수료</span>
          <span>{extraFee}</span>
        </div>
      </div>
      <div className={styles.missionRow}>
        <span className={styles.missionHighlight}>{missionText}</span>
        <span className={styles.missionProgress}>{missionProgress}</span>
      </div>
      <button className={styles.confirmBtn} onClick={onConfirm}>확인</button>
    </div>
  );
}
