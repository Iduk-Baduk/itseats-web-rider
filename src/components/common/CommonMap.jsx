import { Map as KakaoMap, MapMarker, Polyline } from "react-kakao-maps-sdk";

/*
 * lat: 위도
 * lng: 경도
 *
 * markers: 마커 배열 [{ lat, lng, label }] <- 여러개의 마커를 표시 할 수 있습니다.
 * height: 맵 높이 (기본값: "300px")
 * level: 맵 레벨 (기본값: 3)
 *  target: "store" | "user" | null
 */
export default function CommonMap({ lat, lng, markers = [], height = "300px", level = 3 }) {
  //   카카오맵 로딩 상태 확인
  if (!window.kakao?.maps) {
    return (
      <div
        style={{
          width: "100%",
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <p>지도를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 좌표 유효성 검사
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    return (
      <div
        style={{
          width: "100%",
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <p>위치 정보를 확인할 수 없습니다.</p>
      </div>
    );
  }

  try {
    return (
      <KakaoMap center={{ lat, lng }} style={{ width: "100%", height }} level={level}>
        {markers.map((marker, index) => {
          // 마커 타입에 따라 이미지 소스 결정
          const markerImageSrc =
            marker.type === "store"
              ? "/icons/map/storeMarker.svg"
              : marker.type === "delivery"
              ? "/icons/map/myMarker.svg"
              : null;

          return (
            <MapMarker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              image={
                markerImageSrc
                  ? {
                      src: markerImageSrc,
                      size: { width: 32, height: 36 },
                      options: {
                        offset: {
                          x: 16,
                          y: 36,
                        },
                      },
                    }
                  : undefined
              }
            />
          );
        })}

        {markers.length >= 2 && (
          <Polyline
            path={markers.map(({ lat, lng }) => ({ lat, lng }))}
            strokeWeight={2.5}
            strokeColor="#000000"
            strokeOpacity={0.8}
            strokeStyle="dash"
          />
        )}
      </KakaoMap>
    );
  } catch (error) {
    console.error("카카오맵 렌더링 오류:", error);
    return (
      <div
        style={{
          width: "100%",
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <p>지도를 불러오는 데 문제가 발생했습니다.</p>
      </div>
    );
  }
}
