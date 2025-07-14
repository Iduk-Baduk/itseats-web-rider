import { throttle } from "lodash";
import apiClient from "../services/apiClient";
import { API_ENDPOINTS } from "../config/api";
import { useEffect, useState, useCallback } from "react";

export default function useFetchOrders(location) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // 주문을 가져오는 함수 (즉시 실행용)
  const fetchOrders = useCallback(async (position) => {
    if (!position) {
      console.warn("위치 정보가 없습니다. 주문을 가져올 수 없습니다.");
      setLoading(false);
      return;
    }

    console.log("📍 위치 기반 주문 조회 시작:", position);
    setLoading(true);
    setApiError(null);

    try {
      const response = await apiClient.get(API_ENDPOINTS.READY_ORDER());
      console.log("📦 API 응답 전체:", response.data);
      
      // 응답 데이터 구조에 따라 조정
      const responseData = response.data.data || response.data;
      console.log("📦 추출된 데이터:", responseData);
      
      // 단일 객체인 경우 배열로 변환, 배열인 경우 그대로 사용
      let ordersData;
      if (Array.isArray(responseData)) {
        ordersData = responseData;
      } else if (responseData && typeof responseData === 'object') {
        // 단일 주문 객체를 배열로 변환
        ordersData = [responseData];
      } else {
        ordersData = [];
      }
      
      console.log("📦 최종 주문 데이터:", ordersData);
      setOrders(ordersData);
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
      console.error("주문을 가져오는 중 오류 발생:", error);
      setLoading(false);
    }
  }, []);

  // throttle된 함수를 useCallback으로 메모이제이션 (정기적 새로고침용)
  const throttledFetchOrders = useCallback(
    throttle(async (position) => {
      console.log("⏰ 8초마다 정기 주문 조회", position);
      await fetchOrders(position);
    }, 8000), // 8초 간격
    [fetchOrders]
  );

  // 즉시 새로고침 함수
  const refetch = useCallback(() => {
    console.log("🔄 주문 목록 즉시 새로고침");
    if (location) {
      fetchOrders(location);
    }
  }, [location, fetchOrders]);

  useEffect(() => {
    if (!location) {
      console.warn("위치 정보가 없습니다. 주문을 가져올 수 없습니다.");
      setLoading(false);
      return;
    }

    // 위치가 변경될 때마다 즉시 한 번 실행하고, 이후 throttled 함수 시작
    fetchOrders(location);
    throttledFetchOrders(location);
  }, [location, fetchOrders, throttledFetchOrders]);

  return { orders, loading, apiError, refetch };
}
