import styles from "./MissionCard.module.css";

export default function MissionCard({
  count = 400,
  badgeText = "남음",
  title = "400건 배달",
  period = "8.31까지",
  reward = "15만원",
  maxReward = "완료시 최대 50만원",
}) {
  return (
    <div className={styles.missionSection}>
      <div className={styles.missionHeader}>
        <span className={styles.headerTitle}>오늘의 미션</span>
        <span className={styles.headerMaxReward}>{maxReward}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.badgeArea}>
          <div className={styles.badge}>
            <span className={styles.badgeCount}>{count}</span>
            <span className={styles.badgeText}>{badgeText}</span>
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.title}>{title}</div>
          <div className={styles.period}>{period}</div>
        </div>
        <div className={styles.rewardArea}>
          <span className={styles.reward}>{reward}</span>
          <span className={styles.arrow}>&#8250;</span>
        </div>
      </div>
    </div>
  );
}
