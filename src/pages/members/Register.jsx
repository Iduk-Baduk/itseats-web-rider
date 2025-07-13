import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import styles from "./Register.module.css";
import UpperTextInput from "../../components/basic/UpperTextInput";
import CheckBox from "../../components/basic/CheckBox";
import Button from "../../components/basic/Button";
import { userAPI } from "../../services/userAPI";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    nickname: "",
    email: "",
    phone: ""
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("약관에 동의해야 합니다.");
      return;
    }
    else if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await userAPI.register(form);

      if (response.success) {
        navigate("/rider-register");
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setError(error.message || "회원가입에 실패했습니다.");
    }
  }

  return (
    <>
      <Header
        leftIcon=""
        rightIcon="close"
        rightButtonAction={() => navigate(-1)}
        title=""
      />
      <div className={styles.container}>
        <h1>필수 정보 등록 및 약관 동의</h1>
        <p className={styles.description}>잇츠잇츠 배달파트너를 시작하기 위해 필수 정보를 등록하고 서비스 이용약관에 동의해주세요.</p>
        <UpperTextInput
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="사용자 ID"
          maxLength={1000}
          className={styles.textInput}
        />
        <UpperTextInput
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          maxLength={255}
          type="password"
          className={styles.textInput}
        />
        <UpperTextInput
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleChange}
          placeholder="비밀번호 재확인"
          maxLength={255}
          type="password"
          className={styles.textInput}
        />
        <hr style={{ border: "none" }}/>
        <UpperTextInput
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
          maxLength={50}
          className={styles.textInput}
        />
        <UpperTextInput
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          maxLength={50}
          className={styles.textInput}
        />
        <UpperTextInput
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          maxLength={1000}
          type="email"
          className={styles.textInput}
        />
        <UpperTextInput
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="전화번호"
          maxLength={20}
          type="tel"
          className={styles.textInput}
        />
        <CheckBox
          type="checkbox"
          checked={agreeTerms}
          onChange={() => setAgreeTerms(!agreeTerms)}
          label="배달 파트너 이용약관에 동의합니다."
          className={styles.checkbox}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button className={styles.button} onClick={handleSubmit}>다음</Button>
      </div>
    </>
  );
}
