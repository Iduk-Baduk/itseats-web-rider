import { Link } from "react-router-dom";

export default function Main() {
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
      <h1>메인 페이지 (지도 및 배달)</h1>
      <Link to="/mypage">마이페이지</Link>
      <Link to="/delivery">배달(콜) 페이지</Link>
      <Link to="/login">로그인으로 돌아가기</Link>
      <Link to="/temp">공용 컴포넌트 갤러리</Link>
    </div>
  );
}
