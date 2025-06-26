import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import styles from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        leftIcon=""
        rightIcon="close"
        rightButtonAction={() => navigate(-1)}
        title=""
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
        <h1>회원가입 페이지</h1>
        <Link to="/login">로그인</Link>
      </div>
    </>
  );
}
