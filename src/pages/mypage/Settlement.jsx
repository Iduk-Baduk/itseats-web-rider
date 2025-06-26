import { Link } from "react-router-dom";

export default function Settlement() {
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
      <h1>내 수입</h1>
      <Link to="/mypage">마이페이지로 돌아가기</Link>
    </div>
  );
}
