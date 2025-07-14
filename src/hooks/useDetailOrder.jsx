import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { API_ENDPOINTS } from "../config/api";

export default function useDetailOrder(orderId) {
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      console.warn("orderId가 없습니다. 주문 상세 조회를 건너뜁니다.");
      return;
    }

    const fetchOrderDetail = async () => {
      setLoading(true);
      setError(null);

      console.log("📋 주문 상세 조회 요청:", {
        orderId,
        endpoint: API_ENDPOINTS.ORDER_DETAILS(orderId),
      });

      try {
        const response = await apiClient.get(API_ENDPOINTS.ORDER_DETAILS(orderId));

        console.log("📋 주문 상세 조회 성공:", {
          status: response.status,
          data: response.data,
        });

        const orderData = response.data.data || response.data;
        setOrderDetail(orderData);
      } catch (err) {
        console.error("📋 주문 상세 조회 실패:", err);
        console.error("📋 에러 상세:", {
          status: err.response?.status,
          message: err.response?.data?.message || err.message,
          data: err.response?.data,
        });

        const errorMessage = err.response?.data?.message || "주문 상세 조회에 실패했습니다.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  return { orderDetail, loading, error };
}
