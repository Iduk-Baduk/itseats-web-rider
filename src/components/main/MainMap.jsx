import styles from "./MainMap.module.css";

export default function MainMap() {
  return (
    <div className={styles.mapArea}>
      <img src="/images/map_sample.png" alt="지도" className={styles.mapImg} />
    </div>
  );
}
