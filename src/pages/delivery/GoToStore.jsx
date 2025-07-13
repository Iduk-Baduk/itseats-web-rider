import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import styles from "./GoToStore.module.css";

export default function GoToStore() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  console.log("전달받은 주문 데이터:", order);
  console.log("전달받은 위치 데이터:", riderLocation);

  // 매장 도착 처리
  const handleStoreArrived = async () => {
    if (!order?.orderId) {
      alert("주문 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.put(API_ENDPOINTS.ARRIVED_STORE(order.orderId));
      alert("매장 도착이 완료되었습니다!");
      // Pickup 페이지로 이동
      navigate("/delivery/pickup", {
        state: { order, location: riderLocation }
      });
    } catch (error) {
      console.error("매장 도착 처리 실패:", error);
      alert("매장 도착 처리에 실패했습니다. 다시 시도해주세요.");
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
      navigate("/delivery"); // Map (메인) 페이지로 이동
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
        {/* 매장 정보 */}
        <div className={styles.section}>
          <div className={styles.serviceRow}>
            <span className={styles.serviceTitle}>{order.storeName}</span>
            <span className={styles.type}>픽업</span>
            <span className={styles.badge}>주문#{order.orderId}</span>
          </div>
          <div className={styles.address}>{order.address}</div>
          <div style={{
            marginTop: "12px",
            padding: "12px",
            background: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e9ecef"
          }}>
            <div style={{ marginBottom: "6px", fontSize: "14px", color: "#333" }}>
              <strong>주문 금액:</strong> {order.orderPrice?.toLocaleString()}원
            </div>
            <div style={{ marginBottom: "6px", fontSize: "14px", color: "#333" }}>
              <strong>배달비:</strong> {order.deliveryFee?.toLocaleString()}원
            </div>
            <div style={{ fontSize: "14px", color: "#333" }}>
              <strong>거리:</strong> {order.distance}km
            </div>
          </div>
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
          <button 
            className={styles.cancelBtn}
            onClick={handleCancelOrder}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            {isLoading ? "처리 중..." : "배차 취소하기"}
          </button>
          <button className={styles.callBtn}>
            <span className={styles.callIcon}>📞</span>
            파트너 지원센터에 전화
          </button>
        </div>
        <button 
          className={styles.arriveBtn}
          onClick={handleStoreArrived}
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? "처리 중..." : "매장도착"}
        </button>
      </div>
    </div>
  );
}
