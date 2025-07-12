import axios from "axios";
import { throttle } from "lodash";
import { API_CONFIG, API_ENDPOINTS } from "../config/api";
import { useEffect, useState, useCallback } from "react";

export default function useFetchOrders(location) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // throttle된 함수를 useCallback으로 메모이제이션
  const throttledFetchOrders = useCallback(
    throttle(async (position) => {
      console.log("8초마다 위치 기반 주문 조회", position);
      try {
        // endpoint는 파라미터 없이 호출
        const url = `${API_CONFIG.BASE_URL}/${API_ENDPOINTS.READY_ORDER()}`;
        const response = await axios.get(url);
        // 응답 데이터 구조에 따라 조정
        const ordersData = response.data.data || response.data || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setLoading(false);
      } catch (error) {
        setApiError(error.message);
        console.error("주문을 가져오는 중 오류 발생:", error);
        setLoading(false);
      }
    }, 8000), // 8초 간격
    []
  );

  useEffect(() => {
    if (!location) {
      console.warn("위치 정보가 없습니다. 주문을 가져올 수 없습니다.");
      setLoading(false);
      return;
    }
    // 위치가 변경될 때마다 throttled 함수 호출
    throttledFetchOrders(location);
  }, [location, throttledFetchOrders]);

  return { orders, loading, apiError };
}
