import DeliveryMap from "../../components/delivery/DeliveryMap";
import styles from "./CallIncoming.module.css";

export default function CallIncoming() {

  const {order } = location.state || {};
  return (
    <div className={styles.wrapper}>
      {/* 지도 영역 */}
      <div className={styles.mapArea}>
        {/* 실제 지도 또는 지도 이미지 */}
        <img src="/images/map_sample.png" alt="지도" className={styles.mapImg} />
        {/* 예시: 배달 경로, 배달지 마커 등은 추후 오버레이로 추가 */}
      </div>
      {/* 떠 있는 카드형 시트 */}
      <div className={styles.floatingSheet}>
        <div className={styles.serviceRow}>
          <span className={styles.serviceBadge}>일반</span>
          <span className={styles.serviceTitle}>쿠팡이츠서비스</span>
        </div>
        <div className={styles.price}>6,200원</div>
        <div className={styles.detailRow}>
          <span className={styles.distance}>배달거리 3.6km (실제 경로)</span>
          <span className={styles.infoIcon}>ⓘ</span>
        </div>
        <div className={styles.detailRowSub}>
          거리/배달팁·지급금 포함
        </div>
        <div className={styles.desc}>
          * 일부 매장의 조리완료 시간은 과거 배달 기록으로 계산됩니다.
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.rejectBtn}>거절</button>
          <button className={styles.acceptBtn}>주문 수락 · 31초</button>
        </div>
      </div>
    </div>
  );
}
