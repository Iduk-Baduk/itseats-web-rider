import styles from "./DeliveryMap.module.css";

export default function DeliveryMap() {
  return (
    <div className={styles.mapArea}>
      <img src="/images/map_sample.png" alt="지도" className={styles.mapImg} />
    </div>
  );
}
