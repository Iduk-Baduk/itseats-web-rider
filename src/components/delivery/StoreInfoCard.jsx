import styles from "./StoreInfoCard.module.css";

export default function StoreInfoCard({ service, type, address, badge }) {
  return (
    <div className={styles.card}>
      <div>
        <span className={styles.service}>{service}</span>
        <span className={styles.type}> {type}</span>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.address}>{address}</div>
    </div>
  );
}
