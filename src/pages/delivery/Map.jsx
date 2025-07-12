import { Link } from "react-router-dom";
import useMyLocation from "../../hooks/useMyLocation";
import useFetchOrders from "../../hooks/useFetchOrders";
import { i } from "motion/react-client";

export default function Map() {
  const { error, location } = useMyLocation(); // 사용자의 위치
  const { orders, loading, apiError } = useFetchOrders(location); // 위치를 기반으로 주문을 가져옵니다.

  const handleOrderSelect = (order) => {
    // 주문 선택 시 CallIncoming 페이지로 이동
    navigate("/delivery/call-incoming", {
      state: {  
        order,
        location,
      },
    });
  };

  if (error) {
    return <div> 위치 에러! {error}</div>;
  }
  if (loading) {
    return <div>주문을 불러오는 중...</div>;
  }
  if (apiError) {
    return <div>주문을 불러오는 중 오류 발생: {apiError}</div>;
  }
  if (!orders || orders.length === 0) {
    return <div>현재 배달 가능한 주문이 없습니다.</div>;
  }
  if (orders) {
    const order = orders[0]; // 첫 번째 주문을 선택
    navigate("/delivery/call-incoming", {
      state: {
        order,
        location,
      },
    });
  }

  console.log("현재 위치:", location);
  console.log("주문 목록:", orders);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "20px",
        overflowY: "auto",
      }}
    >
      <h1>배달 조회 페이지</h1>
      <div style={{ padding: "20px" }}>
        <h1>가까운 배달 목록</h1>
        {orders && orders.length > 0 ? (
          <div>
            {orders.map((order, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ marginTop: 0 }}>{order.storeName}</h3>
                <p>
                  <strong>주소:</strong> {order.deliveryAddress}
                </p>
                <p>
                  <strong>거리:</strong> {order.deliveryDistance}km
                </p>
                <p>
                  <strong>배달비:</strong> {order.deliveryFee.toLocaleString()}원
                </p>
              </div>
            ))}
          </div>
        ) : (
          // 데이터가 없을 때 표시할 메시지
          <p>주변에 배달 가능한 주문이 없습니다.</p>
        )}
      </div>
      <h1>메인 페이지 (지도 및 배달)</h1>
      <Link to="/mypage">마이페이지</Link>
      <Link to="/delivery/1">배달(콜) 페이지</Link>
      <Link to="/login">로그인으로 돌아가기</Link>
      <Link to="/temp">공용 컴포넌트 갤러리</Link>
    </div>
  );
}
