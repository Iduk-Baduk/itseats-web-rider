import React, { useState, useCallback } from "react";
import { Map } from "react-kakao-maps-sdk";
import styles from './BasicMap.module.css';

/**
 * 공통 기본 맵 컴포넌트
 * - 카카오 맵의 기본 설정을 담당하는 재사용 가능한 컴포넌트
 * - 다양한 페이지에서 일관된 맵 설정으로 사용 가능
 * - 로딩 상태, 에러 처리, 기본 컨트롤 포함
 */
const BasicMap = ({
  center = { lat: 37.5665, lng: 126.978 }, // 기본값: 서울시청
  level = 3, // 확대/축소 레벨 (1-14, 숫자가 클수록 넓은 지역)
  width = "100%",
  height = "400px",
  children, // 마커, 폴리라인 등 자식 컴포넌트
  onCenterChanged, // 지도 중심 좌표 변경 이벤트
  onZoomChanged, // 지도 확대/축소 변경 이벤트
  onBoundsChanged, // 지도 영역 변경 이벤트
  onClick, // 지도 클릭 이벤트
  draggable = true, // 지도 드래그 가능 여부
  zoomable = true, // 지도 확대/축소 가능 여부
  scrollwheel = true, // 마우스 휠 확대/축소 가능 여부
  showControls = false, // 기본 컨트롤 표시 여부
  loading = false, // 로딩 상태
  error = null, // 에러 상태
  className = "", // 추가 CSS 클래스
  ...mapProps // 추가 맵 속성들
}) => {
  const [mapLevel, setMapLevel] = useState(level);
  const [mapCenter, setMapCenter] = useState(center);

  // 줌 인/아웃 핸들러
  const handleZoomIn = useCallback(() => {
    if (mapLevel > 1) {
      setMapLevel(mapLevel - 1);
    }
  }, [mapLevel]);

  const handleZoomOut = useCallback(() => {
    if (mapLevel < 14) {
      setMapLevel(mapLevel + 1);
    }
  }, [mapLevel]);

  // 현재 위치로 이동 핸들러
  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(newCenter);
        },
        (error) => {
          console.error("현재 위치를 가져올 수 없습니다:", error);
        }
      );
    }
  }, []);

  // 에러 상태 렌더링
  if (error) {
    return (
      <div className={`${styles.errorMessage} ${className}`} style={{ width, height }}>
        <p>지도를 불러올 수 없습니다</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`${styles.mapContainer} ${className}`} style={{ width, height }}>
      <Map
        center={mapCenter}
        level={mapLevel}
        style={{
          width: "100%",
          height: "100%",
        }}
        onCenterChanged={(map) => {
          const newCenter = {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          };
          setMapCenter(newCenter);
          onCenterChanged?.(newCenter);
        }}
        onZoomChanged={(map) => {
          const newLevel = map.getLevel();
          setMapLevel(newLevel);
          onZoomChanged?.(newLevel);
        }}
        onBoundsChanged={onBoundsChanged}
        onClick={onClick}
        draggable={draggable}
        zoomable={zoomable}
        scrollwheel={scrollwheel}
        {...mapProps}
      >
        {children}
      </Map>

      {/* 로딩 오버레이 */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div>지도를 불러오는 중...</div>
        </div>
      )}

      {/* 기본 컨트롤 */}
      {showControls && (
        <div className={styles.mapControls}>
          <button className={styles.controlButton} onClick={handleZoomIn} disabled={mapLevel <= 1}>
            +
          </button>
          <button
            className={styles.controlButton}
            onClick={handleZoomOut}
            disabled={mapLevel >= 14}
          >
            -
          </button>
          <button
            className={styles.controlButton}
            onClick={handleCurrentLocation}
            title="현재 위치로 이동"
          >
            📍
          </button>
        </div>
      )}
    </div>
  );
};

export default BasicMap;
