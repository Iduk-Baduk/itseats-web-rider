import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import PickupOrderInfo from "../../components/delivery/PickupOrderInfo";
import PickupActionSection from "../../components/delivery/PickupActionSection";
import BasicMap from "../../components/common/BasicMap";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";
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
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        height: "100dvh", // 동적 뷰포트 높이 (웹앱 최적화)
        overflow: "hidden",
      }}
    >
      {/* 전체 화면 지도 */}
      {riderLocation && displayOrder && (
        <BasicMap
          center={{
            lat: displayOrder.deliveryLocation?.lat || riderLocation.latitude,
            lng: displayOrder.deliveryLocation?.lng || riderLocation.longitude,
          }}
          level={4}
          width="100%"
          height="100%"
          showControls={false}
        >
          {/* 라이더 현재 위치 마커 (매장 위치) */}
          <MapMarker
            position={{
              lat: riderLocation.latitude,
              lng: riderLocation.longitude,
            }}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: {
                width: 24,
                height: 35,
              },
            }}
            title="현재 위치 (라이더)"
          />

          {/* 배달지 위치 마커 */}
          {displayOrder.deliveryLocation && (
            <>
              <MapMarker
                position={{
                  lat: displayOrder.deliveryLocation.lat,
                  lng: displayOrder.deliveryLocation.lng,
                }}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_blue.png",
                  size: {
                    width: 32,
                    height: 40,
                  },
                }}
                title={`배달지 (목적지)`}
              />

              {/* 라이더에서 배달지까지의 경로선 */}
              <Polyline
                path={[
                  {
                    lat: riderLocation.latitude,
                    lng: riderLocation.longitude,
                  },
                  {
                    lat: displayOrder.deliveryLocation.lat,
                    lng: displayOrder.deliveryLocation.lng,
                  },
                ]}
                strokeWeight={3}
                strokeColor="#4A90E2"
                strokeOpacity={0.8}
                strokeStyle="dash"
              />
            </>
          )}
        </BasicMap>
      )}

      {/* 위치 정보가 없을 때 fallback */}
      {(!riderLocation || !displayOrder) && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            color: "#666",
          }}
        >
          지도를 불러오는 중...
        </div>
      )}

      {/* 픽업 정보 바텀 시트 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "white",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 핸들 */}
        <div
          style={{
            padding: "15px 0",
            textAlign: "center",
            borderBottom: "1px solid #f0f0f0",
            background: "white",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              background: "#ccc",
              borderRadius: "2px",
              margin: "0 auto",
            }}
          />
        </div>

        {/* 스크롤 가능한 컨텐츠 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 20px calc(20px + env(safe-area-inset-bottom, 0px)) 20px",
          }}
        >
          <div
            style={{
              background: "transparent",
              boxShadow: "none",
              margin: 0,
              padding: 0,
              height: "auto",
            }}
          >
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
                style={{
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "처리 중..." : "취소하기"}
              </button>
            </div>
            
            {/* 추가 주문 정보 */}
            {displayOrder && (
              <div style={{
                marginTop: "16px",
                padding: "12px",
                background: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e9ecef"
              }}>
                <div style={{ fontSize: "13px", color: "#333" }}>
                  <div>📞 매장: {displayOrder.storePhone || '정보 없음'}</div>
                  <div>📱 고객: {displayOrder.memberPhone || '정보 없음'}</div>
                  {displayOrder.storeRequest && <div>🏪 매장 요청: {displayOrder.storeRequest}</div>}
                  {displayOrder.riderRequest && <div>🚚 배달 요청: {displayOrder.riderRequest}</div>}
                  {displayOrder.orderStatus && <div>📋 주문 상태: {displayOrder.orderStatus}</div>}
                  {displayOrder.orderTime && <div>🕐 주문 시간: {new Date(displayOrder.orderTime).toLocaleString()}</div>}
                  {displayOrder.deliveryLocation && (
                    <div>🏠 배달 주소: {displayOrder.deliveryAddress || "주소 정보 없음"}</div>
                  )}
                </div>
              </div>
            )}
            
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
                opacity: isLoading ? 0.6 : 1,
                marginTop: "16px"
              }}
            >
              {isLoading ? "처리 중..." : "픽업 완료"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
