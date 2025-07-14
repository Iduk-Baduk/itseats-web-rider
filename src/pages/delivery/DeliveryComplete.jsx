import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import DeliveryCompleteSummary from "../../components/delivery/DeliveryCompleteSummary";
import styles from "./DeliveryComplete.module.css";

export default function DeliveryComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation, uploadedImageUrl, completionData } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  console.log("배달 완료 - 전달받은 주문 데이터:", order);
  console.log("배달 완료 - 업로드된 사진 URL:", uploadedImageUrl);
  console.log("배달 완료 - 완료 처리 데이터:", completionData);
  console.log("배달 완료 - 총 금액:", order?.totalPrice);
  console.log("배달 완료 - 배달비:", order?.deliveryFee);

  // 컴포넌트 마운트 시 자동으로 배달 완료 API 호출 (이미 PhotoConfirm에서 완료되었다면 생략)
  useEffect(() => {
    if (order?.orderId && !isCompleted && !completionData) {
      handleDeliveryComplete();
    } else if (completionData) {
      // 이미 완료 처리된 경우
      setIsCompleted(true);
    }
  }, [order?.orderId, isCompleted, completionData]);

  // 배달 완료 API 호출
  const handleDeliveryComplete = async () => {
    if (!order?.orderId || isCompleted) return;

    setIsLoading(true);
    try {
      await apiClient.put(API_ENDPOINTS.COMPLETE_ORDER(order.orderId));
      console.log("배달 완료 처리 성공");
      setIsCompleted(true);
    } catch (error) {
      console.error("배달 완료 처리 실패:", error);
      // 에러가 발생해도 화면은 표시 (이미 사진 업로드가 완료된 상태)
      setIsCompleted(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 확인 버튼 클릭 시 메인 화면으로 이동
  const handleConfirm = () => {
    navigate("/delivery", { replace: true });
  };

  // 주문 데이터가 없을 경우 처리
  if (!order) {
    return (
      <div className={styles.wrapper}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>주문 정보를 찾을 수 없습니다.</h2>
          <p>메인 화면으로 돌아갑니다.</p>
          <button onClick={() => navigate("/delivery")}>메인으로</button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      {/* 지도(배경) */}
      <div className={styles.mapArea}>
        <img src="/images/map_sample.png" alt="지도" className={styles.mapImg} />
      </div>
      {/* 하단 배달완료 카드 */}
      <DeliveryCompleteSummary
        service={`${order.storeName} 배달`}
        amount={order.totalPrice ? 
          `${order.totalPrice.toLocaleString()}원` : 
          (order.orderPrice && order.deliveryFee ? 
            `${(order.orderPrice + order.deliveryFee).toLocaleString()}원` : 
            '0원'
          )
        }
        baseFee={`${order.deliveryFee?.toLocaleString() || '0'}원`}
        extraFee={order.extraFee ? `+${order.extraFee.toLocaleString()}원` : "+0원"}
        missionText="배달이 완료되었습니다!"
        missionProgress={`주문#${order.orderNumber || order.orderId}`}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </div>
  );
}
