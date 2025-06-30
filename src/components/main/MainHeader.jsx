import styles from "./MainHeader.module.css";

export default function MainHeader({
  onProfileClick,
  statusText = "배달을 시작해보세요",
  toggleValue = false,
  onToggle,
}) {
  return (
    <div className={styles.topBar}>
      <button className={styles.profileBtn} onClick={onProfileClick}>
        <img src="/images/profile.png" alt="프로필" className={styles.profileImg} />
      </button>
      <span className={styles.statusText}>{statusText}</span>
      <div className={styles.toggleArea}>
        <label className={styles.switch}>
          <input type="checkbox" checked={toggleValue} onChange={onToggle} />
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
}
