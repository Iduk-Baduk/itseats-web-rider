import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import styles from "./Summary.module.css";

export default function Summary() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        leftIcon="back"
        rightIcon=""
        leftButtonAction={() => navigate(-1)}
        title="내 업무"
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
        <h1>내 업무</h1>
        <Link to="/mypage">마이페이지로 돌아가기</Link>
      </div>
    </>
  );
}
