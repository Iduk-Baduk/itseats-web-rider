import { useEffect, useState } from "react";

export default function useMyLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      },
      { enableHighAccuracy: true } // 높은 정확도 요청
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // 화면에서 벗어날 때 위치 추적 중지
    };
  }, []);

  return { location, error };
}
