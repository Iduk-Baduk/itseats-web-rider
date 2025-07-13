import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import DeliveryMap from "../../components/delivery/DeliveryMap";
import styles from "./CallIncoming.module.css";

export default function CallIncoming() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation } = routerLocation.state || {}; // routerLocation에서 상태 가져오기
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  console.log("전달받은 주문 데이터:", order);
  console.log("전달받은 위치 데이터:", riderLocation);

  // 타이머 기능
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // 시간이 다 됐을 때 자동으로 거절 처리
      alert("응답 시간이 초과되었습니다. 주문이 자동으로 거절됩니다.");
      navigate("/delivery");
    }
  }, [timeLeft, navigate]);

  // 주문 거절 처리
  const handleRejectOrder = async () => {
    if (!order?.orderId) {
      alert("주문 정보가 없습니다.");
      return;
    }

    const rejectReason = prompt("거절 사유를 입력해주세요:");
    if (!rejectReason) return;

    setIsLoading(true);
    console.log("🚫 주문 거절 요청:", {
      orderId: order.orderId,
      rejectReason,
      endpoint: API_ENDPOINTS.REJECT_ORDER(order.orderId)
    });

    try {
      const response = await apiClient.put(API_ENDPOINTS.REJECT_ORDER(order.orderId), {
        rejectReason,
      });
      
      console.log("🚫 주문 거절 성공:", response.data);
      alert("주문이 거절되었습니다.");
      navigate("/delivery"); // 메인 페이지로 돌아가기
    } catch (error) {
      console.error("🚫 주문 거절 실패:", error);
      console.error("🚫 에러 상세:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
      
      const errorMessage = error.response?.data?.message || "주문 거절에 실패했습니다.";
      alert(`거절 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 주문 수락 처리
  const handleAcceptOrder = async () => {
    if (!order?.orderId) {
      alert("주문 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    console.log("✅ 주문 수락 요청:", {
      orderId: order.orderId,
      endpoint: API_ENDPOINTS.ACCEPT_ORDER(order.orderId)
    });

    try {
      const response = await apiClient.put(API_ENDPOINTS.ACCEPT_ORDER(order.orderId));
      
      console.log("✅ 주문 수락 성공:", response.data);
      alert("주문이 수락되었습니다!");
      
      // 매장으로 이동하는 페이지로 이동
      navigate("/delivery/go-to-store", {
        state: { order, location: riderLocation },
      });
    } catch (error) {
      console.error("✅ 주문 수락 실패:", error);
      console.error("✅ 에러 상세:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
      
      const errorMessage = error.response?.data?.message || "주문 수락에 실패했습니다.";
      alert(`수락 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className={styles.detailRowSub}>거리/배달팁·지급금 포함</div>
        <div className={styles.orderInfo}>
          <div>
            <strong>주문 번호:</strong> {order.orderId}
          </div>
          <div>
            <strong>주문 금액:</strong> {order.orderPrice?.toLocaleString()}원
          </div>
          <div>
            <strong>배달 주소:</strong> {order.address}
          </div>
          <div>
            <strong>주문 상태:</strong> {order.orderStatus}
          </div>
        </div>
        <div className={styles.desc}>
          * 일부 매장의 조리완료 시간은 과거 배달 기록으로 계산됩니다.
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.rejectBtn} onClick={handleRejectOrder} disabled={isLoading}>
            {isLoading ? "처리 중..." : "거절"}
          </button>
          <button className={styles.acceptBtn} onClick={handleAcceptOrder} disabled={isLoading}>
            {isLoading ? "처리 중..." : `주문 수락 · ${timeLeft}초`}
          </button>
        </div>
      </div>
    </div>
  );
}
