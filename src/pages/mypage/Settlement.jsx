import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import styles from "./Settlement.module.css";

export default function Settlement() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        leftIcon="back"
        rightIcon=""
        leftButtonAction={() => navigate(-1)}
        title="내 수입"
        color="#FFFFFF"
        backgroundColor="#1E262F"
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
        <h1>내 수입</h1>
        <Link to="/mypage">마이페이지로 돌아가기</Link>
      </div>
    </>
  );
}
