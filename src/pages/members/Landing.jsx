import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import Button from "../../components/basic/Button";
import LineButton from "../../components/basic/LineButton";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.centerContent}>
        <img
          src="/images/landing/rider.png"
          alt="배달원"
          className={styles.image}
        />
        <p>
          틈나는 시간 배달하고
          <br />
          생활에 여유를 더해보세요
        </p>
      </div>

      <div className={styles.bottomLinks}>
        <Button className={styles.button} onClick={() => navigate("/register")}>
          지금 바로 가입하기
        </Button>
        <LineButton
          className={styles.lineButton}
          onClick={() => navigate("/login")}
        >
          로그인
        </LineButton>
      </div>
    </div>
  );
}
