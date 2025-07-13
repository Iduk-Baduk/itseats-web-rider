import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../config/auth";
import Header from "../../components/common/Header";
import Button from "../../components/basic/Button";
import TextInput from "../../components/basic/TextInput";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 로그인 처리 함수
  const handleLogin = async () => {
    // 입력값 검증
    if (!username.trim()) {
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await login(username, password);
      console.log("로그인 성공:", result);
      
      // 로그인 성공 시 배달 화면으로 이동
      navigate("/delivery", { replace: true });
    } catch (error) {
      console.error("로그인 실패:", error);
      
      // 에러 메시지 설정
      if (error.response?.status === 401) {
        setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else if (error.response?.status >= 500) {
        setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        setErrorMessage("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Enter 키 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

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
        {errorMessage && (
          <div style={{ 
            color: '#ff4444', 
            textAlign: 'center', 
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#fff0f0',
            borderRadius: '8px',
            border: '1px solid #ffcccc'
          }}>
            {errorMessage}
          </div>
        )}
        
        <TextInput
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textInput}
          disabled={isLoading}
        />
        <TextInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textInput}
          disabled={isLoading}
        />
        <Button
          onClick={handleLogin}
          disabled={isLoading || !username.trim() || !password.trim()}
          className={styles.button}
          style={{
            opacity: (isLoading || !username.trim() || !password.trim()) ? 0.6 : 1,
            cursor: (isLoading || !username.trim() || !password.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
      </div>
    </>
  );
}
