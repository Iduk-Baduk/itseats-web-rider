import { useEffect, useState } from "react";

/* 사용자의 현재 위치를 실시간으로 추적하는 커스텀 훅 (거리 제한 및 서버 전송 없음)
 * 이 훅은 사용자의 위치를 실시간으로 추적하고, 위치가 변경될 때마다 상태를 업데이트합니다.
 * 오직 디바이스의 위치 정보만 필요한 경우에 사용합니다.
 */
export default function useRealtimeMyLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    // 위치 추적을 시작하고, 위치가 변경될 때마다 상태를 업데이트
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(newPosition);
      },
      (err) => {
        console.error("🚨 실시간 위치 추적 에러:", err);
        setError(err.message);
      },
      {
        enableHighAccuracy: true, // 높은 정확도 요청
        maximumAge: 0, // 캐시된 위치 사용 안함
        timeout: 5000, // 5초 후에 타임아웃
      }
    );

    // 컴포넌트가 언마운트될 때 위치 추적 중지
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  return { location, error };
}