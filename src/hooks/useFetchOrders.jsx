import axios from "axios";
import { API_CONFIG, API_ENDPOINTS } from "../config/api";
import { useEffect, useState } from "react";

export default function useFetchOrders(location) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (!location) {
      console.warn("위치 정보가 없습니다. 주문을 가져올 수 없습니다.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);

      try {
        const { latitude, longitude } = location;

        const endPoint = API_ENDPOINTS.READY_ORDER(latitude, longitude);
        const response = await axios.get(`${API_CONFIG.BASE_URL}${endPoint}`);

        setOrders(response.data);
      } catch (error) {
        setApiError(error.message);
        console.error("주문을 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [location]);

  return { orders, loading, apiError };
}
