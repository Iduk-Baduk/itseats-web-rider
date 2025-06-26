import { Link } from "react-router-dom";

export default function Landing() {
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
      <h1>랜딩 페이지 (회원가입 및 로그인 버튼 표시)</h1>
      <Link to="/login">로그인</Link>
      <Link to="/register">회원가입</Link>
    </div>
  );
}
