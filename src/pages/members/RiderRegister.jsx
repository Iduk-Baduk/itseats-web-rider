import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import styles from "./RiderRegister.module.css";
import UpperTextInput from "../../components/basic/UpperTextInput";
import ComboBox from "../../components/basic/ComboBox";
import Button from "../../components/basic/Button";
import { getProvinces, getCitiesByProvince } from "../../utils/regionsUtils";

export default function RiderRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    deliveryMethod: "MOTORCYCLE",
    preferredArea: "서울특별시",
    provinces: "서울특별시",
    cities: "종로구"
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      preferredArea: prevForm.provinces + " " + prevForm.cities
    }));
  }, [form.provinces, form.cities]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", form);
    // TODO
  }

  return (
    <>
      <Header
        leftIcon=""
        rightIcon=""
        title=""
      />
      <div className={styles.container}>
        <h1>배달 정보 등록</h1>
        <p className={styles.description}>배달 수단과 배달 희망 지역을 입력해주세요.</p>
        <div className={styles.row}>
          <h2>배달 수단</h2>
          <ComboBox
            name="deliveryMethod"
            value={form.deliveryMethod}
            onChange={handleChange}
            options={[
              { value: "MOTORCYCLE", label: "오토바이" },
              { value: "BICYCLE", label: "자전거" },
              { value: "WALK", label: "도보" },
            ]}
            placeholder="배달 수단"
            className={styles.comboBox}
          />
        </div>
        <div className={styles.row}>
          <h2>배달 희망 지역</h2>
          <h3>도/광역시</h3>
          <ComboBox
            name="provinces"
            value={form.provinces}
            onChange={handleChange}
            options={getProvinces().map(province => ({ value: province, label: province }))}
            placeholder="도/광역시"
            className={styles.comboBox}
          />
          <h3>시/군/구</h3>
          <ComboBox
            name="cities"
            value={form.cities}
            onChange={handleChange}
            options={getCitiesByProvince(form.provinces).map(city => ({ value: city, label: city }))}
            placeholder="시/군/구"
            className={styles.comboBox}
          />
        </div>
        <Button className={styles.button} onClick={handleSubmit}>회원가입 완료</Button>
      </div>
    </>
  );
}
