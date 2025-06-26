import { Link } from "react-router-dom";

export default function MyPage() {
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
      <h1>마이페이지</h1>
      <Link to="/settlement">내 수입 (정산 페이지)</Link>
      <Link to="/summary">내 업무 (배달 내역 페이지)</Link>
      <Link to="/main">메인 페이지로 돌아가기</Link>
    </div>
  );
}
