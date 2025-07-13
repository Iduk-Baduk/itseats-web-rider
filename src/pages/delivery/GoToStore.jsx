import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import { calculateDistance } from "../../services/locationService";
import styles from "./GoToStore.module.css";

export default function GoToStore() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation } = routerLocation.state || {};
  const [isLoading, setIsLoading] = useState(false);

  console.log("전달받은 주문 데이터:", order);
  console.log("전달받은 위치 데이터:", riderLocation);

  // 매장까지의 거리 계산
  const storeDistance = useMemo(() => {
    if (!order?.myLocation || !order?.storeLocation) {
      return null;
    }

    const distance = calculateDistance(
      order.myLocation.lat,
      order.myLocation.lng,
      order.storeLocation.lat,
      order.storeLocation.lng
    );

    return (distance / 1000).toFixed(1); // 미터를 킬로미터로 변환하고 소수점 1자리
  }, [order]);

  // 매장 도착 처리
  const handleStoreArrived = async () => {
    if (!order?.orderId) {
      alert("주문 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    console.log("🏪 매장 도착 처리 요청:", {
      orderId: order.orderId,
      endpoint: API_ENDPOINTS.ARRIVED_STORE(order.orderId),
    });

    try {
      const response = await apiClient.put(API_ENDPOINTS.ARRIVED_STORE(order.orderId));
      console.log("🏪 매장 도착 처리 성공:", response.data);
      alert("매장 도착이 완료되었습니다!");

      // Pickup 페이지로 이동
      navigate("/delivery/pickup", {
        state: { order, location: riderLocation },
      });
    } catch (error) {
      console.error("🏪 매장 도착 처리 실패:", error);
      console.error("🏪 에러 상세:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });

      const errorMessage = error.response?.data?.message || "매장 도착 처리에 실패했습니다.";
      alert(`매장 도착 실패: ${errorMessage}`);
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
    console.log("❌ 배차 취소 요청:", {
      orderId: order.orderId,
      cancelReason,
      endpoint: API_ENDPOINTS.REJECT_ORDER(order.orderId),
    });

    try {
      const response = await apiClient.put(API_ENDPOINTS.REJECT_ORDER(order.orderId), {
        rejectReason: cancelReason,
      });
      console.log("❌ 배차 취소 성공:", response.data);
      alert("주문이 취소되었습니다.");
      navigate("/delivery"); // Map (메인) 페이지로 이동
    } catch (error) {
      console.error("❌ 주문 취소 실패:", error);
      console.error("❌ 에러 상세:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });

      const errorMessage = error.response?.data?.message || "주문 취소에 실패했습니다.";
      alert(`취소 실패: ${errorMessage}`);
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
          <div className={styles.address}>{order.storeAddress}</div>
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              background: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
            }}
          >
            <div style={{ marginBottom: "6px", fontSize: "14px", color: "#333" }}>
              <strong>배달비:</strong>{" "}
              {order.deliveryFee ? order.deliveryFee.toLocaleString() : "정보 없음"}원
            </div>
            <div style={{ marginBottom: "6px", fontSize: "14px", color: "#333" }}>
              <strong>배달 타입:</strong> {order.deliveryType || "정보 없음"}
            </div>
            <div style={{ fontSize: "14px", color: "#333" }}>
              <strong>매장까지 거리:</strong> {storeDistance ? `${storeDistance}km` : "정보 없음"}
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
          <div className={styles.tip}>식당 뒷편 공용주차장에 주차하시면 됩니다.</div>
          <button className={styles.button}>매장에 전화</button>
        </div>
        {/* 액션 버튼 */}
        <div className={styles.actionRow}>
          <button
            className={styles.cancelBtn}
            onClick={handleCancelOrder}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
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
          style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          {isLoading ? "처리 중..." : "매장도착"}
        </button>
      </div>
    </div>
  );
}
