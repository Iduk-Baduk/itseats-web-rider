import { useEffect, useState, useRef } from "react";
import { isAuthenticated } from "../config/auth";
import { calculateDistance, updateRiderLocationNormal } from "../services/locationService.js";

/* 사용자의 현재 위치를 추적하는 커스텀 훅
 * 이 훅은 사용자의 위치를 실시간으로 추적하고, 위치가 변경될 때마다 상태를 업데이트합니다.
 * 또한 위치 추적 중 오류가 발생할 경우 오류 메시지를 반환합니다.
 * 이 훅은 컴포넌트가 마운트될 때 위치 추적을 시작하고,
 * 컴포넌트가 언마운트될 때 위치 추적을 중지합니다.
 *
 * 추가로 라이더의 위치를 서버로 자동 전송합니다.
 */
export default function useMyLocation(onLocationUpdate) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const lastUploadedPosition = useRef(null);
  const uploadAttempts = useRef(0);

  // 위치 업데이트를 서버로 전송하는 함수
  const sendLocationToServer = async (position) => {
    // 로그인되지 않은 경우 전송하지 않음
    if (!isAuthenticated()) {
      console.log("로그인되지 않음 - 위치 업데이트 건너뜀");
      return;
    }

    console.log("📤 서버로 전송할 좌표:", {
      latitude: position.latitude,
      longitude: position.longitude,
    });

    try {
      await updateRiderLocationNormal(position.latitude, position.longitude);
      lastUploadedPosition.current = position;
      uploadAttempts.current = 0; // 성공 시 재시도 횟수 초기화
      console.log("✅ 라이더 위치 서버 업데이트 성공:", position);
      
      // 위치 업데이트 성공 시 콜백 호출 (주문 목록 새로고침 등)
      if (onLocationUpdate && typeof onLocationUpdate === 'function') {
        console.log("📱 위치 업데이트 성공 - 콜백 호출");
        onLocationUpdate(position);
      }
    } catch (error) {
      uploadAttempts.current++;
      console.error(`라이더 위치 서버 업데이트 실패 (시도: ${uploadAttempts.current}):`, error);

      // 3번 실패 후에는 더 이상 시도하지 않음
      if (uploadAttempts.current >= 3) {
        console.warn("위치 업데이트 최대 재시도 횟수 초과");
      }
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    let lastPosition = null;
    const MINIMUM_DISTANCE = 100; // 최소 100미터 이동 시에만 업데이트

    // 위치 추적을 시작하고, 위치가 변경될 때마다 상태를 업데이트
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log("🌍 브라우저에서 받은 원본 좌표:", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          rawCoords: position.coords,
        });

        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log("🔍 newPosition 객체:", newPosition);

        // 이전 위치가 있고, 이동 거리가 임계값보다 작으면 업데이트하지 않음
        if (lastPosition) {
          // 두 좌표 간의 거리를 계산하는 함수 (미터 단위)
          const distance = calculateDistance(
            lastPosition.latitude,
            lastPosition.longitude,
            newPosition.latitude,
            newPosition.longitude
          );

          if (distance < MINIMUM_DISTANCE) {
            console.log(`이동 거리 ${distance.toFixed(2)}m - 업데이트 건너뜀`);
            return;
          }
        }

        console.log("위치 업데이트:", newPosition);
        lastPosition = newPosition;
        setLocation(newPosition);

        // 🚀 서버로 위치 정보 전송 (실패해도 UI는 계속 동작)
        sendLocationToServer(newPosition);
      },
      (err) => {
        if (err.code === error.POSITION_UNAVAILABLE || err.code === 2) {
          console.warn("일시적으로 위치를 가져올 수 없습니다. 재시도 중...");
        } else {
          setError(err.message);
        }
      },
      {
        enableHighAccuracy: true, // 높은 정확도 요청
        maximumAge: 10000, // 10초 동안 캐시된 위치 사용
        timeout: 5000, // 5초 후에 타임아웃
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // 화면에서 벗어날 때 위치 추적 중지
    };
  }, [onLocationUpdate]); // onLocationUpdate 의존성 추가

  return { location, error };
}
