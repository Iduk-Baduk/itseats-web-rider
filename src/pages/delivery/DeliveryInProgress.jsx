import { useLocation, useNavigate } from "react-router-dom";
import useRealtimeMyLocation from "../../hooks/useRealtimeMyLocation"; // 추가
import DeliveryHeader from "../../components/delivery/DeliveryHeader";
import DeliveryRequest from "../../components/delivery/DeliveryRequest";
import BasicMap from "../../components/common/BasicMap";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";
import styles from "./DeliveryInProgress.module.css";

export default function DeliveryInProgress() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { order } = routerLocation.state || {}; // location 제거
  const { location: riderLocation, error: locationError } = useRealtimeMyLocation(); // 실시간 위치 훅 사용

  console.log("배달 진행 - 전달받은 주문 데이터:", order);
  console.log("배달 진행 - 실시간 위치 데이터:", riderLocation);
  console.log("배달 진행 - 주문 메뉴 정보:", order?.orderItems || order?.menu);
  console.log("배달 진행 - 총 금액:", order?.totalPrice);

  // 사진 촬영 페이지로 이동
  const handlePhotoCapture = () => {
    navigate("/delivery/photo-confirm", {
      state: { order, location: riderLocation }, // 최신 위치 전달
    });
  };

  // 위치 에러 처리
  if (locationError) {
    return (
      <div className={styles.wrapper}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>위치 정보를 가져올 수 없습니다.</h2>
          <p>오류: {locationError}</p>
        </div>
      </div>
    );
  }

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
        height: "100dvh", // 동적 뷰포트 높이 (웹앱 최적화)
        overflow: "hidden",
      }}
    >
      {/* 전체 화면 지도 */}
      {riderLocation && order && (
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
              src: "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
              size: {
                width: 32,
                height: 40,
              },
            }}
            title="현재 위치 (라이더)"
          />

          {/* 배달지 위치 마커 (사용자 위치) */}
          {order.destination && (
            <>
              {console.log("배달지 위치:", order.destination.lat, order.destination.lng)}
              <MapMarker
                position={{
                  lat: order.destination.lat,
                  lng: order.destination.lng,
                }}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
                  size: {
                    width: 28,
                    height: 40,
                  },
                }}
                title={`배달지 (사용자 위치)`}
              />

              {/* 라이더에서 사용자까지의 경로선 */}
              <Polyline
                path={[
                  {
                    lat: riderLocation.latitude,
                    lng: riderLocation.longitude,
                  },
                  {
                    lat: order.destination.lat,
                    lng: order.destination.lng,
                  },
                ]}
                strokeWeight={3}
                strokeColor="#4A90E2"
                strokeOpacity={0.8}
                strokeStyle="shortdash"
              />
            </>
          )}
        </BasicMap>
      )}

      {/* 위치 정보가 없을 때 fallback */}
      {(!riderLocation || !order) && (
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

      {/* 배달 진행 정보 바텀 시트 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
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
            <DeliveryHeader
              service={`${order.storeName} 배달`}
              address={order.customerAddress || order.address || order.storeAddress}
              orderCode={`주문#${order.orderNumber || order.orderId}`}
            />

            <DeliveryRequest
              request={
                order.customerRequest ||
                order.request ||
                "고객 요청사항: 문고리에 걸어 두시고 문자 주세요! 벨은 누르지 말아주세요."
              }
            />

            <div className={styles.menuSection}>
              <div className={styles.orderCode}>주문</div>
              <div className={styles.menuTitle}>주문 상세 메뉴</div>

              {/* 주문 메뉴 목록 표시 */}
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item, index) => (
                  <div key={index} className={styles.menuItem}>
                    <div className={styles.menuRow}>
                      <span className={styles.menuName}>
                        {item.menuName} x {item.quantity}
                      </span>
                      <span className={styles.menuPrice}>
                        {(item.totalPrice || item.menuPrice)?.toLocaleString()}원
                      </span>
                    </div>
                    {item.options && <div className={styles.menuOption}>옵션: {item.options}</div>}
                  </div>
                ))
              ) : order.menu && order.menu.length > 0 ? (
                order.menu.map((item, index) => (
                  <div key={index} className={styles.menuItem}>
                    <div className={styles.menuRow}>
                      <span className={styles.menuName}>
                        {item.menuName} x {item.quantity}
                      </span>
                      <span className={styles.menuPrice}>
                        {(item.totalPrice || item.menuPrice)?.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.menuRow}>
                  <span>주문 메뉴 정보</span>
                  <span className={styles.menuPrice}>{order.orderPrice?.toLocaleString()}원</span>
                </div>
              )}

              <div className={styles.priceSection}>
                <div className={styles.menuDetail}>
                  배달비: {order.deliveryFee?.toLocaleString()}원
                </div>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>총 주문금액</span>
                  <span className={styles.totalPrice}>
                    {order.totalPrice
                      ? order.totalPrice.toLocaleString()
                      : order.orderPrice && order.deliveryFee
                      ? (order.orderPrice + order.deliveryFee).toLocaleString()
                      : "N/A"}
                    원
                  </span>
                </div>
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
                배달 완료 후 인증 사진을 꼭 찍어주세요
                <br />
                <span className={styles.photoGuideSub}>
                  (다만 계좌번호 등 개인정보가 사진에 노출되지 않도록 유의)
                </span>
              </span>
            </div>

            <button className={styles.photoBtn} onClick={handlePhotoCapture}>
              배달상태 촬영
            </button>

            <div className={styles.bottomNotice}>
              ※ 배달 완료 후 CS 발생시 사진이 없으면 배달완료 처리가 어려울 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}