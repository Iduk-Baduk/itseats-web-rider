import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import PickupOrderInfo from "../../components/delivery/PickupOrderInfo";
import PickupActionSection from "../../components/delivery/PickupActionSection";
import styles from "./Pickup.module.css";

export default function Pickup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  console.log("전달받은 주문 데이터:", order);
  console.log("전달받은 위치 데이터:", riderLocation);

  // 픽업 완료 처리
  const handlePickupComplete = async () => {
    if (!order?.orderId) {
      alert("주문 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.put(API_ENDPOINTS.PICKUP_ORDER(order.orderId));
      alert("픽업이 완료되었습니다!");
      // 배달 진행 페이지로 이동
      navigate("/delivery/in-progress", {
        state: { order, location: riderLocation }
      });
    } catch (error) {
      console.error("픽업 완료 처리 실패:", error);
      alert("픽업 완료 처리에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 배차 취소 처리
  const handleCancelOrder = async () => {
    if (!order?.orderId) return;

    const cancelReason = prompt("취소 사유를 입력해주세요:");
    if (!cancelReason) return;

    setIsLoading(true);
    try {
      await apiClient.put(API_ENDPOINTS.REJECT_ORDER(order.orderId), {
        rejectReason: cancelReason
      });
      alert("주문이 취소되었습니다.");
      navigate("/delivery");
    } catch (error) {
      console.error("주문 취소 실패:", error);
      alert("주문 취소에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
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
        <PickupOrderInfo
          service={order.storeName}
          type="픽업"
          address={order.address}
          badge={`주문#${order.orderId}`}
          menu="주문 상세 정보"
          price={`${order.orderPrice?.toLocaleString()}원`}
          detail={`배달비: ${order.deliveryFee?.toLocaleString()}원`}
          totalPrice={`${(order.orderPrice + order.deliveryFee)?.toLocaleString()}원`}
          request="고객 요청사항 없음"
        />
        <button className={styles.storeCallBtn}>매장에 전화</button>
        <div className={styles.cancelRow}>
          <span className={styles.cancelLabel}>배정</span>
          <button 
            className={styles.cancelBtn}
            onClick={handleCancelOrder}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            {isLoading ? "처리 중..." : "취소하기"}
          </button>
        </div>
        <div style={{ padding: "0 20px" }}>
          <button 
            onClick={handlePickupComplete}
            disabled={isLoading}
            style={{ 
              width: "100%",
              background: "#178351",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              padding: "16px 0",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? "처리 중..." : "픽업 완료"}
          </button>
        </div>
      </div>
    </div>
  );
}
