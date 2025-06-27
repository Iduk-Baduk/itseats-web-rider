import { Link, useParams } from "react-router-dom";

export default function DeliveryStatus() {
  const { orderId } = useParams();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>배달 상태 페이지 (콜, 수락, 픽업, 배달 중)</h1>
      <p>배달 ID: {orderId}</p>
      <Link to={`/delivery/${orderId}/complete`}>배달 완료 이미지 업로드</Link>
      <Link to="/delivery">메인 페이지</Link>
    </div>
  );
}
