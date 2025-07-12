import styles from "./DeliveryHeader.module.css";

export default function DeliveryHeader({ service, address, orderCode }) {
  return (
    <div className={styles.headerSection}>
      <div className={styles.topRow}>
        <span className={styles.service}>{service}</span>
        <span className={styles.orderCode}>{orderCode}</span>
      </div>
      <div className={styles.addressRow}>
        <span className={styles.address}>{address}</span>
        <button className={styles.copyBtn}>복사</button>
      </div>
    </div>
  );
}
