import { Link } from "react-router-dom";

export default function Delivery() {
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
      <h1>배달 페이지 (콜, 수락, 픽업, 배달 중, 사진 촬영)</h1>
      <Link to="/main">메인 페이지</Link>
    </div>
  );
}
