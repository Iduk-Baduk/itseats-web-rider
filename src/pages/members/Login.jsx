import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Button from "../../components/basic/Button";
import TextInput from "../../components/basic/TextInput";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header
        leftIcon="back"
        rightIcon=""
        leftButtonAction={() => navigate(-1)}
        title="로그인"
        className={styles.header}
      />
      <div className={styles.container}>
        <TextInput
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.textInput}
        />
        <TextInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.textInput}
        />
        <Button
          onClick={() => navigate("/delivery")}
          disabled={false}
          className={styles.button}
        >
          로그인
        </Button>
      </div>
    </>
  );
}
