import styles from "./PickupOrderInfo.module.css";

export default function PickupOrderInfo({
  service,
  type,
  address,
  badge,
  menu,
  price,
  detail,
  totalPrice,
  request,
}) {
  return (
    <div className={styles.section}>
      <div className={styles.serviceRow}>
        <span className={styles.serviceTitle}>{service}</span>
        <span className={styles.type}>{type}</span>
        <span className={styles.badge}>{badge}</span>
      </div>
      <div className={styles.address}>{address}</div>
      <div className={styles.storeName}>{badge}</div>
      <div className={styles.menuRow}>
        <span>{menu}</span>
        <span className={styles.menuPrice}>{price}</span>
      </div>
      <div className={styles.detail}>{detail}</div>
      <div className={styles.menuRow}>
        <span className={styles.menuLabel}>주문금액</span>
        <span className={styles.menuPrice}>{totalPrice}</span>
      </div>
      <div className={styles.request}>{request}</div>
    </div>
  );
}
