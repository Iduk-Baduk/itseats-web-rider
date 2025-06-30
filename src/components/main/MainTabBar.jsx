import styles from "./MainTabBar.module.css";

export default function MainTabBar({ active = "미션", onTabChange }) {
  return (
    <div className={styles.tabBar}>
      <button
        className={`${styles.tab} ${active === "미션" ? styles.active : ""}`}
        onClick={() => onTabChange && onTabChange("미션")}
      >
        미션
      </button>
      <button
        className={`${styles.tab} ${active === "대기주문" ? styles.active : ""}`}
        onClick={() => onTabChange && onTabChange("대기주문")}
      >
        대기주문
      </button>
    </div>
  );
}
