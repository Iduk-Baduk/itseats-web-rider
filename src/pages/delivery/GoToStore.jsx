import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import { calculateDistance } from "../../services/locationService";
import useDetailOrder from "../../hooks/useDetailOrder";
import BasicMap from "../../components/common/BasicMap";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";
import styles from "./GoToStore.module.css";

export default function GoToStore() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation } = routerLocation.state || {};
  const [isLoading, setIsLoading] = useState(false);

  // 바텀 시트 드래그 상태
  const [sheetHeight, setSheetHeight] = useState(60); // 초기 높이 60%
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(60);

  // 주문 상세 정보 조회 (수락 후 라이더에게 배정된 주문)
  const {
    orderDetail,
    loading: detailLoading,
    error: detailError,
  } = useDetailOrder(order?.orderId);

  console.log("전달받은 주문 데이터:", order);
  console.log("전달받은 위치 데이터:", riderLocation);
  console.log("주문 상세 조회 결과:", orderDetail);

  // 기본 order 데이터와 상세 조회 데이터를 병합
  const displayOrder = orderDetail ? { ...order, ...orderDetail } : order;

  // 매장까지의 거리 계산
  const storeDistance = useMemo(() => {
    const orderData = displayOrder || order;
    if (!orderData?.myLocation || !orderData?.storeLocation) {
      return null;
    }

    const distance = calculateDistance(
      orderData.myLocation.lat,
      orderData.myLocation.lng,
      orderData.storeLocation.lat,
      orderData.storeLocation.lng
    );

    return (distance / 1000).toFixed(1); // 미터를 킬로미터로 변환하고 소수점 1자리
  }, [displayOrder, order]);

  // 드래그 시작
  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    setStartHeight(sheetHeight);
  };

  // 드래그 중
  const handleDragMove = (e) => {
    if (!isDragging) return;

    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = startY - clientY;
    const windowHeight = window.innerHeight;
    const deltaPercent = (deltaY / windowHeight) * 100;

    let newHeight = startHeight + deltaPercent;

    // 최소 30%, 최대 90%로 제한
    newHeight = Math.max(30, Math.min(90, newHeight));

    setSheetHeight(newHeight);
  };

  // 드래그 끝
  const handleDragEnd = () => {
    setIsDragging(false);

    // 스냅 효과: 특정 위치로 자동 조정
    if (sheetHeight < 45) {
      setSheetHeight(30); // 최소 높이
    } else if (sheetHeight > 75) {
      setSheetHeight(90); // 최대 높이
    } else {
      setSheetHeight(60); // 기본 높이
    }
  };

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
      console.log("🔍 Pickup으로 전달할 displayOrder:", displayOrder);
      console.log("🔍 displayOrder.orderNumber:", displayOrder?.orderNumber);
      alert("매장 도착이 완료되었습니다!");

      // Pickup 페이지로 이동 (병합된 상세 데이터 전달)
      navigate("/delivery/pickup", {
        state: {
          order: displayOrder, // 병합된 데이터 전달
          location: riderLocation,
        },
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
            lat: riderLocation.latitude,
            lng: riderLocation.longitude,
          }}
          level={4}
          width="100%"
          height="100%"
          showControls={false}
        >
          {/* 라이더 현재 위치 마커 */}
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

          {/* 매장 위치 마커 */}
          {displayOrder.storeLocation && (
            <>
              <MapMarker
                position={{
                  lat: displayOrder.storeLocation.lat,
                  lng: displayOrder.storeLocation.lng,
                }}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                  size: {
                    width: 32,
                    height: 40,
                  },
                }}
                title={`${displayOrder.storeName} (목적지)`}
              />

              {/* 라이더에서 매장까지의 경로선 */}
              <Polyline
                path={[
                  {
                    lat: riderLocation.latitude,
                    lng: riderLocation.longitude,
                  },
                  {
                    lat: displayOrder.storeLocation.lat,
                    lng: displayOrder.storeLocation.lng,
                  },
                ]}
                strokeWeight={3}
                strokeColor="#FF6B35"
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

      {/* 드래그 가능한 바텀 시트 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: `${sheetHeight}%`,
          background: "white",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
          transition: isDragging ? "none" : "height 0.3s ease",
          zIndex: 1000,
          overflow: "hidden", // 이 부분이 중요합니다.
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 드래그 핸들 */}
        <div
          style={{
            padding: "15px 0",
            textAlign: "center",
            cursor: "grab",
            borderBottom: "1px solid #f0f0f0",
            background: "white",
            flexShrink: 0, // 핸들 영역 고정
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
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
            padding: "20px 20px calc(20px + env(safe-area-inset-bottom, 0px)) 20px", // 모든 방향 패딩, 하단은 Safe Area 고려
          }}
        >
          <div
            className={styles.mainCard}
            style={{
              background: "transparent",
              boxShadow: "none",
              margin: 0,
              padding: 0,
              height: "auto",
            }}
          >
            {/* 매장 정보 */}
            <div className={styles.section}>
              <div className={styles.serviceRow}>
                <span className={styles.serviceTitle}>{displayOrder.storeName}</span>
                <span className={styles.type}>픽업</span>
                <span className={styles.badge}>주문#{displayOrder.orderNumber}</span>
              </div>
              <div className={styles.address}>
                {displayOrder.storeAddress || displayOrder.address}
              </div>
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
                  {displayOrder.deliveryFee
                    ? displayOrder.deliveryFee.toLocaleString()
                    : "정보 없음"}
                  원
                </div>
                <div style={{ fontSize: "14px", color: "#333" }}>
                  <strong>매장까지 거리:</strong>{" "}
                  {storeDistance ? `${storeDistance}km` : "정보 없음"}
                </div>
                {orderDetail?.menu && (
                  <div style={{ marginTop: "8px", fontSize: "14px", color: "#333" }}>
                    <strong>주문 메뉴:</strong>
                    <ul style={{ margin: "4px 0", paddingLeft: "20px" }}>
                      {orderDetail.menu.map((item, index) => (
                        <li key={index}>
                          {item.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {detailLoading && (
                  <div style={{ color: "#666", fontSize: "12px", marginTop: "8px" }}>
                    📋 주문 상세 정보 로딩 중...
                  </div>
                )}
                {detailError && (
                  <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "8px" }}>
                    ⚠️ 상세 정보 조회 실패: {detailError}
                  </div>
                )}
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
                style={{
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
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
              style={{
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
                marginTop: "16px",
              }}
            >
              {isLoading ? "처리 중..." : "매장도착"}
            </button>
          </div>
        </div>
      </div>

      {/* 전역 터치 이벤트 처리 */}
      {isDragging && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            touchAction: "none", // 터치 스크롤 방지
          }}
          onMouseMove={handleDragMove}
          onTouchMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
        />
      )}
    </div>
  );
}
