import styles from "./GoToStore.module.css";

export default function GoToStore() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainCard}>
        {/* 매장 정보 */}
        <div className={styles.section}>
          <div className={styles.serviceRow}>
            <span className={styles.serviceTitle}>쿠팡이츠서비스</span>
            <span className={styles.type}>픽업</span>
            <span className={styles.badge}>GRMTON</span>
          </div>
          <div className={styles.address}>서울시 강남구 쿠팡이츠 1-1</div>
        </div>
        {/* 매장찾기 팁 */}
        <div className={styles.section}>
          <div className={styles.tipTitleRow}>
            <span className={styles.tipIcon}>🏢</span>
            <span className={styles.tipTitle}>매장찾기 팁</span>
          </div>
          <div className={styles.tip}>
            엘리베이터를 타고 올라오면 왼쪽으로 300m 에서 뒤를 돌아보면 빨간색 간판입니다.
          </div>
        </div>
        {/* 매장 이미지 */}
        <div className={`${styles.section} ${styles.imageBox}`}>
          <img src="/images/store_sample.jpg" alt="매장 이미지" className={styles.image} />
        </div>
        {/* 주차 팁 */}
        <div className={styles.section}>
          <div className={styles.tipTitleRow}>
            <span className={styles.tipIcon}>🅿️</span>
            <span className={styles.tipTitle}>주차 팁</span>
          </div>
          <div className={styles.tip}>
            식당 뒷편 공용주차장에 주차하시면 됩니다.
          </div>
          <button className={styles.button}>매장에 전화</button>
        </div>
        {/* 액션 버튼 */}
        <div className={styles.actionRow}>
          <button className={styles.cancelBtn}>배차 취소하기</button>
          <button className={styles.callBtn}>
            <span className={styles.callIcon}>📞</span>
            파트너 지원센터에 전화
          </button>
        </div>
        <button className={styles.arriveBtn}>매장도착</button>
      </div>
    </div>
  );
}
