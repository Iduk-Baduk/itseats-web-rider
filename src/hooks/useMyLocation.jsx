import { useEffect, useState } from "react";

/* 사용자의 현재 위치를 추적하는 커스텀 훅
 * 이 훅은 사용자의 위치를 실시간으로 추적하고, 위치가 변경될 때마다 상태를 업데이트합니다.
 * 또한 위치 추적 중 오류가 발생할 경우 오류 메시지를 반환합니다.
 * 이 훅은 컴포넌트가 마운트될 때 위치 추적을 시작하고, 컴포넌트가 언마운트될 때 위치 추적을 중지합니다.
 */
export default function () {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    let lastPosition = null;
    const MINIMUM_DISTANCE = 100; // 최소 100미터 이동 시에만 업데이트

    // 두 좌표 간의 거리를 계산하는 함수 (미터 단위)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371000; // 지구의 반지름 (미터)
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // 위치 추적을 시작하고, 위치가 변경될 때마다 상태를 업데이트
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // 이전 위치가 있고, 이동 거리가 임계값보다 작으면 업데이트하지 않음
        if (lastPosition) {
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
      },
      (err) => {
        setError(err.message);
        if (err.code === error.POSITION_UNAVAILABLE) {
          console.warn("일시적으로 위치를 가져올 수 없습니다. 재시도 중...");
          return;
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
  }, []);

  return { location, error };
}
