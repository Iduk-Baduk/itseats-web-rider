import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        leftIcon="back"
        rightIcon=""
        leftButtonAction={() => navigate(-1)}
        title="로그인"
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
        <h1>로그인 페이지</h1>
        <Link to="/">랜딩 페이지</Link>
        <Link to="/register">회원가입</Link>
        <Link to="/main">메인페이지 이동</Link>
      </div>
    </>
  );
}
