import { Link } from "react-router-dom";

export default function CompleteDelivery() {
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
      <h1>배달 완료 사진 업로드 페이지</h1>
      <Link to="/delivery">메인 페이지로 돌아가기</Link>
    </div>
  );
}
