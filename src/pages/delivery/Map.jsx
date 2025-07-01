import { Link } from "react-router-dom";
import CommonMap from "../../components/common/CommonMap";

export default function Map() {
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
      <CommonMap
        lat={37.5665}
        lng={126.978}
        markers={[{ lat: 37.5665, lng: 126.978, type: "delivery" }]}
        height="100vh"
        level={3}
      />
      <Link to="/mypage">마이페이지</Link>
      <Link to="/delivery/1">배달(콜) 페이지</Link>
      <Link to="/login">로그인으로 돌아가기</Link>
      <Link to="/temp">공용 컴포넌트 갤러리</Link>
    </div>
  );
}
