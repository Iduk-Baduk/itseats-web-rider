import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import styles from "./Temp.module.css";

import TextInput from "../../components/basic/TextInput";
import UpperTextInput from "../../components/basic/UpperTextInput";
import RadioButton from "../../components/basic/RadioButton";
import CheckBox from "../../components/basic/CheckBox";
import ComboBox from "../../components/basic/ComboBox";
import Button from "../../components/basic/Button";
import LineButton from "../../components/basic/LineButton";

export default function MyPage() {
  const navigate = useNavigate();

  const [sampleText, setSampleText] = useState("");

  return (
    <>
      <Header
        leftIcon="back"
        rightIcon=""
        leftButtonAction={() => navigate(-1)}
        title="공용 컴포넌트"
        backgroundColor="#F2F2F2"
      />
      <div className={styles.container}>
        {/* 텍스트박스 1 */}
        <div className={styles.samples}>
          <TextInput
            name="textInput"
            value={sampleText}
            onChange={() => {
              setSampleText(event.target.value);
            }}
            placeholder="텍스트 입력"
            maxLength={1000}
            className={styles.textInput}
          />
        </div>
        {/* 텍스트박스 2 */}
        <div className={styles.samples}>
          <UpperTextInput
            name="textInput"
            value={sampleText}
            onChange={() => {
              setSampleText(event.target.value);
            }}
            placeholder="텍스트 입력"
            maxLength={1000}
            className={styles.textInput}
          />
        </div>
        {/* 라디오 버튼 */}
        <div className={styles.samples}>
          <RadioButton
            type="radio"
            checked={false}
            onChange={() => {}}
            label="라디오 버튼"
          />
          <RadioButton
            type="radio"
            checked={true}
            onChange={() => {}}
            label="라디오 버튼"
          />
        </div>
        {/* 체크박스 */}
        <div className={styles.samples}>
          <CheckBox checked={true} onChange={() => {}} label="체크박스" />
          <CheckBox
            type="radio"
            checked={false}
            onChange={() => {}}
            label="체크박스"
          />
        </div>
        {/* 콤보박스 */}
        <div className={styles.samples}>
          <ComboBox
            name="comboBox"
            value=""
            onChange={() => {}}
            options={[
              { value: "option1", label: "옵션 1" },
              { value: "option2", label: "옵션 2" },
              { value: "option3", label: "옵션 3" },
            ]}
            placeholder="콤보박스 선택"
            className={styles.comboBox}
          />
        </div>
        {/* medium 버튼 1 */}
        <div className={styles.samples}>
          <Button className={styles.button}>md 버튼</Button>
        </div>
        {/* medium 버튼 2 */}
        <div className={styles.samples}>
          <LineButton className={styles.lineButton}>md 라인 버튼</LineButton>
        </div>
        {/* small 버튼 1 */}
        <div className={styles.samples}>
          <Button className={styles.button} size="sm">sm 버튼</Button>
        </div>
        {/* small 버튼 2 */}
        <div className={styles.samples}>
          <LineButton className={styles.lineButton} size="sm">sm 라인 버튼</LineButton>
        </div>
      </div>
    </>
  );
}
