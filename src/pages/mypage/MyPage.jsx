import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import styles from "./MyPage.module.css";

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        leftIcon="back"
        rightIcon=""
        leftButtonAction={() => navigate(-1)}
        title=""
        backgroundColor="#F2F2F2"
      />
      <div
        className={styles.container}
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
    </>
  );
}
