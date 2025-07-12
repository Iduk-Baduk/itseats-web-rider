import styles from "./DeliveryPhotoConfirm.module.css";

export default function DeliveryPhotoConfirm() {
  return (
    <div className={styles.wrapper}>
      {/* 상단 네비게이션(뒤로가기 등) */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} aria-label="뒤로가기">
          ←
        </button>
      </div>

      {/* 사진 미리보기 */}
      <div className={styles.photoPreview}>
        <img
          src="/images/sample_delivery_photo.jpg" // 실제 사진 경로로 교체
          alt="배달 인증 사진"
          className={styles.photoImg}
        />
      </div>

      {/* 안내문구 */}
      <div className={styles.infoText}>
        인증 사진은 고객님과 운영센터로 전달됩니다.
      </div>

      {/* 사진 다시 찍기 버튼 */}
      <button className={styles.retakeBtn}>
        <span className={styles.retakeIcon}>⟳</span>
        사진 다시 찍기
      </button>

      {/* 배달 완료 버튼 */}
      <button className={styles.completeBtn}>배달 완료</button>
    </div>
  );
}
