import { Link } from "react-router-dom";

export default function Register() {
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
      <h1>회원가입 페이지</h1>
      <Link to="/login">로그인</Link>
    </div>
  );
}
