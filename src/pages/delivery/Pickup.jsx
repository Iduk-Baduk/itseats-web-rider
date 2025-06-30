import PickupOrderInfo from "../../components/delivery/PickupOrderInfo";
import PickupActionSection from "../../components/delivery/PickupActionSection";
import styles from "./Pickup.module.css";

export default function Pickup() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainCard}>
        <PickupOrderInfo
          service="쿠팡이츠서비스"
          type="픽업"
          address="서울시 강남구 쿠팡이츠 1-1"
          badge="GRMTON"
          menu="설렁탕(공기밥포함) x 3개"
          price="0,000원"
          detail="결경이 김치 160g"
          totalPrice="0,000원"
          request="『수저포크X』 샌드위치 반으로 컷팅해주세요."
        />
        <button className={styles.storeCallBtn}>매장에 전화</button>
        <div className={styles.cancelRow}>
          <span className={styles.cancelLabel}>배정</span>
          <button className={styles.cancelBtn}>취소하기</button>
        </div>
        <PickupActionSection />
      </div>
    </div>
  );
}
