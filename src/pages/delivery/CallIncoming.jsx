import { useLocation } from "react-router-dom";
import DeliveryMap from "../../components/delivery/DeliveryMap";
import styles from "./CallIncoming.module.css";

export default function CallIncoming() {
  const location = useLocation();
  const { order, location: riderLocation } = location.state || {};

  console.log("전달받은 주문 데이터:", order);
  console.log("전달받은 위치 데이터:", riderLocation);

  // 주문 데이터가 없을 경우 기본값 처리
  if (!order) {
    return (
      <div className={styles.wrapper}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>주문 정보를 찾을 수 없습니다.</h2>
          <p>이전 페이지로 돌아가 주문을 다시 선택해주세요.</p>
        </div>
      </div>
    );
  }
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
          <span className={styles.serviceTitle}>{order.storeName}</span>
        </div>
        <div className={styles.price}>{order.deliveryFee?.toLocaleString()}원</div>
        <div className={styles.detailRow}>
          <span className={styles.distance}>배달거리 {order.distance}km (실제 경로)</span>
          <span className={styles.infoIcon}>ⓘ</span>
        </div>
        <div className={styles.detailRowSub}>
          거리/배달팁·지급금 포함
        </div>
        <div className={styles.orderInfo}>
          <div><strong>주문 번호:</strong> {order.orderId}</div>
          <div><strong>주문 금액:</strong> {order.orderPrice?.toLocaleString()}원</div>
          <div><strong>배달 주소:</strong> {order.address}</div>
          <div><strong>주문 상태:</strong> {order.orderStatus}</div>
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
