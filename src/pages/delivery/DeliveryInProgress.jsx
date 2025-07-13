import { useLocation, useNavigate } from "react-router-dom";
import DeliveryHeader from "../../components/delivery/DeliveryHeader";
import DeliveryRequest from "../../components/delivery/DeliveryRequest";
import styles from "./DeliveryInProgress.module.css";

export default function DeliveryInProgress() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation } = location.state || {};

  console.log("배달 진행 - 전달받은 주문 데이터:", order);
  console.log("배달 진행 - 전달받은 위치 데이터:", riderLocation);

  // 사진 촬영 페이지로 이동
  const handlePhotoCapture = () => {
    navigate("/delivery/photo-confirm", {
      state: { order, location: riderLocation }
    });
  };

  // 주문 데이터가 없을 경우 처리
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
      <div className={styles.mainCard}>
        <DeliveryHeader
          service={`${order.storeName} 배달`}
          address={order.address}
          orderCode={`주문#${order.orderId}`}
        />

        <DeliveryRequest
          request="고객 요청사항: 문고리에 걸어 두시고 문자 주세요! 벨은 누르지 말아주세요."
        />

        <div className={styles.menuSection}>
          <div className={styles.orderCode}>주문#{order.orderId}</div>
          <div className={styles.menuRow}>
            <span>주문 상세 메뉴</span>
            <span className={styles.menuPrice}>{order.orderPrice?.toLocaleString()}원</span>
          </div>
          <div className={styles.menuDetail}>배달비: {order.deliveryFee?.toLocaleString()}원</div>
          <div className={styles.menuRow}>
            <span className={styles.menuLabel}>총 주문금액</span>
            <span className={styles.menuPrice}>{(order.orderPrice + order.deliveryFee)?.toLocaleString()}원</span>
          </div>
          <div className={styles.menuNotice}>
            고객 계좌정보가 보이면 노출되지 않도록 유의해주세요.
          </div>
        </div>

        <button className={styles.supportBtn}>
          <span className={styles.supportIcon}>☎️</span>
          파트너 지원센터에 전화
        </button>

        <div className={styles.photoGuide}>
          <span className={styles.photoIcon}>📷</span>
          <span>
            배달 완료 후 인증 사진을 꼭 찍어주세요<br />
            <span className={styles.photoGuideSub}>
              (다만 계좌번호 등 개인정보가 사진에 노출되지 않도록 유의)
            </span>
          </span>
        </div>

        <button 
          className={styles.photoBtn}
          onClick={handlePhotoCapture}
        >
          배달상태 촬영
        </button>

        <div className={styles.bottomNotice}>
          ※ 배달 완료 후 CS 발생시 사진이 없으면 배달완료 처리가 어려울 수 있습니다.
        </div>
      </div>
    </div>
  );
}
