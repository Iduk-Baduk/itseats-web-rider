import { Link, useNavigate } from "react-router-dom";
import useMyLocation from "../../hooks/useMyLocation";
import useFetchOrders from "../../hooks/useFetchOrders";
import BasicMap from "../../components/common/BasicMap";
import { MapMarker } from "react-kakao-maps-sdk";
import React, { useEffect, useCallback, useRef } from "react";

export default function Map() {
  const navigate = useNavigate();
  const refetchRef = useRef(null);

  // 위치 업데이트 후 주문 목록 새로고침을 위한 콜백
  const handleLocationUpdate = useCallback((newLocation) => {
    console.log("📍 위치 업데이트 완료 - 주문 목록 즉시 새로고침:", newLocation);
    // 위치 업데이트 성공 시 주문 목록을 즉시 새로고침
    if (refetchRef.current) {
      refetchRef.current();
    }
  }, []);

  const { error, location } = useMyLocation(handleLocationUpdate); // 위치 업데이트 콜백 전달
  const { orders, loading, apiError, refetch } = useFetchOrders(location); // 위치를 기반으로 주문을 가져옵니다.

  // refetch 함수를 ref에 저장
  useEffect(() => {
    refetchRef.current = refetch;
  }, [refetch]);

  const handleOrderSelect = (order) => {
    // 주문 선택 시 CallIncoming 페이지로 이동
    navigate("/delivery/call-incoming", {
      state: {
        order,
        location,
      },
    });
  };

  // 주문이 있을 때 자동 이동
  useEffect(() => {
    if (orders && orders.length > 0) {
      const order = orders[0];
      navigate("/delivery/call-incoming", {
        state: {
          order,
          location,
        },
      });
    }
  }, [orders, location, navigate]);

  if (error) {
    return <div> 위치 에러! {error}</div>;
  }
  if (loading) {
    return <div>주문을 불러오는 중...</div>;
  }
  if (apiError) {
    return <div>주문을 불러오는 중 오류 발생: {apiError}</div>;
  }

  console.log("📍 현재 위치:", location);
  console.log("📦 주문 목록:", orders);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* 전체 화면 지도 */}
      {location && (
        <BasicMap
          center={{
            lat: location.latitude,
            lng: location.longitude,
          }}
          level={3}
          width="100%"
          height="100%"
          showControls={true}
          loading={loading}
          onCenterChanged={(newCenter) => {
            console.log("🗺️ 지도 중심 변경:", newCenter);
          }}
        >
          {/* 현재 위치 마커 */}
          <MapMarker
            position={{
              lat: location.latitude,
              lng: location.longitude,
            }}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: {
                width: 24,
                height: 35,
              },
            }}
            title="현재 위치"
          />
        </BasicMap>
      )}
    </div>
  );
}
