import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import PickupOrderInfo from "../../components/delivery/PickupOrderInfo";
import PickupActionSection from "../../components/delivery/PickupActionSection";
import styles from "./Pickup.module.css";

export default function Pickup() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation } = routerLocation.state || {};
  const [isLoading, setIsLoading] = useState(false);

  console.log("GoToStore에서 전달받은 병합된 주문 데이터:", order);
  console.log("전달받은 위치 데이터:", riderLocation);
  console.log("🔍 orderNumber 확인:", order?.orderNumber);
  console.log("🔍 orderId 확인:", order?.orderId);
  console.log("🔍 displayOrder 확인:", order);

  // order는 이미 GoToStore에서 병합된 데이터 (기본 + 상세 조회)
  const displayOrder = order;

  // 픽업 완료 처리
  const handlePickupComplete = async () => {
    if (!order?.orderId) {
      alert("주문 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    console.log("📦 픽업 완료 처리 요청:", {
      orderId: order.orderId,
      orderNumber: order.orderNumber,
      endpoint: API_ENDPOINTS.PICKUP_ORDER(order.orderId)
    });

    try {
      const response = await apiClient.put(API_ENDPOINTS.PICKUP_ORDER(order.orderId));
      console.log("📦 픽업 완료 처리 성공:", response.data);
      alert("픽업이 완료되었습니다!");
      
      // 배달 진행 페이지로 이동
      navigate("/delivery/in-progress", {
        state: { order: displayOrder, location: riderLocation }
      });
    } catch (error) {
      console.error("📦 픽업 완료 처리 실패:", error);
      console.error("📦 에러 상세:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
      
      const errorMessage = error.response?.data?.message || "픽업 완료 처리에 실패했습니다.";
      alert(`픽업 실패: ${errorMessage}`);
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
    console.log("❌ 픽업 단계 배차 취소 요청:", {
      orderId: order.orderId,
      orderNumber: order.orderNumber,
      cancelReason,
      endpoint: API_ENDPOINTS.REJECT_ORDER(order.orderId)
    });

    try {
      const response = await apiClient.put(API_ENDPOINTS.REJECT_ORDER(order.orderId), {
        rejectReason: cancelReason
      });
      console.log("❌ 배차 취소 성공:", response.data);
      alert("주문이 취소되었습니다.");
      navigate("/delivery");
    } catch (error) {
      console.error("❌ 주문 취소 실패:", error);
      console.error("❌ 에러 상세:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
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
        <PickupOrderInfo
          service={displayOrder.storeName}
          type="픽업"
          address={displayOrder.storeAddress || displayOrder.address}
          badge={`주문#${displayOrder?.orderNumber || displayOrder?.orderId || '알 수 없음'}`}
          menu={displayOrder.orderItems ? 
            displayOrder.orderItems.map(item => 
              `${item.menuName} x ${item.quantity}${item.options ? ` (${item.options})` : ''}`
            ).join(', ') : 
            (displayOrder.menu ? 
              displayOrder.menu.map(item => `${item.name} x ${item.quantity}`).join(', ') :
              "주문 상세 정보"
            )
          }
          price={`${displayOrder.totalPrice?.toLocaleString() || displayOrder.orderPrice?.toLocaleString() || '0'}원`}
          detail={`배달비: ${displayOrder.deliveryFee?.toLocaleString() || '0'}원`}
          totalPrice={`${((displayOrder.totalPrice || displayOrder.orderPrice || 0) + (displayOrder.deliveryFee || 0))?.toLocaleString()}원`}
          request={displayOrder.storeRequest || displayOrder.riderRequest || "고객 요청사항 없음"}
          storePhone={displayOrder.storePhone}
          memberPhone={displayOrder.memberPhone}
        />
        <button className={styles.storeCallBtn}>
          {displayOrder.storePhone ? `매장에 전화 (${displayOrder.storePhone})` : "매장에 전화"}
        </button>
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
        
        {/* 주문 상세 정보 표시 */}
        {(displayOrder.orderItems || displayOrder.menu) && (
          <div style={{ 
            margin: "16px 20px", 
            padding: "12px", 
            background: "#f8f9fa", 
            borderRadius: "8px",
            border: "1px solid #e9ecef"
          }}>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "bold" }}>📋 주문 상세</h4>
            
            {/* orderItems 우선 표시 (GoToStore에서 받은 상세 데이터) */}
            {displayOrder.orderItems ? (
              displayOrder.orderItems.map((item, index) => (
                <div key={index} style={{ marginBottom: "4px", fontSize: "13px" }}>
                  • {item.menuName} x {item.quantity} - {item.menuPrice?.toLocaleString()}원
                  {item.options && <div style={{ color: "#666", fontSize: "12px", marginLeft: "8px" }}>옵션: {item.options}</div>}
                </div>
              ))
            ) : (
              /* menu가 있는 경우 (Mock 서버 데이터) */
              displayOrder.menu && displayOrder.menu.map((item, index) => (
                <div key={index} style={{ marginBottom: "4px", fontSize: "13px" }}>
                  • {item.name} x {item.quantity}
                </div>
              ))
            )}
            
            <hr style={{ margin: "8px 0", border: "none", borderTop: "1px solid #ddd" }} />
            <div style={{ fontSize: "13px", color: "#333" }}>
              <div>📞 매장: {displayOrder.storePhone || '정보 없음'}</div>
              <div>📱 고객: {displayOrder.memberPhone || '정보 없음'}</div>
              {displayOrder.storeRequest && <div>🏪 매장 요청: {displayOrder.storeRequest}</div>}
              {displayOrder.riderRequest && <div>🚚 배달 요청: {displayOrder.riderRequest}</div>}
              {displayOrder.orderStatus && <div>📋 주문 상태: {displayOrder.orderStatus}</div>}
              {displayOrder.orderTime && <div>🕐 주문 시간: {new Date(displayOrder.orderTime).toLocaleString()}</div>}
            </div>
          </div>
        )}
        
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
