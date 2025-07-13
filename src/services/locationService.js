import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

// 라이더 위치 업데이트 (원본 - 정상적인 순서)
export const updateRiderLocationNormal = async (latitude, longitude) => {
  try {
    const location = {
      latitude,
      longitude,
    };

    console.log("🚀 [정상순서] locationService에서 서버로 전송하는 데이터:", {
      함수매개변수: { latitude, longitude },
      최종객체: location,
    });

    const response = await apiClient.post(API_ENDPOINTS.UPDATE_LOCATION(), location);

    console.log("라이더 위치 업데이트 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("라이더 위치 업데이트 실패:", error);
    throw error;
  }
};

// 위치 변경 감지를 위한 유틸리티 함수
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371e3; // 지구 반지름 (미터)
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c; // 미터 단위 거리
};
