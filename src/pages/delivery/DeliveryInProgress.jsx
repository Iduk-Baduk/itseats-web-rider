import DeliveryHeader from "../../components/delivery/DeliveryHeader";
import DeliveryRequest from "../../components/delivery/DeliveryRequest";
import styles from "./DeliveryInProgress.module.css";

export default function DeliveryInProgress() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainCard}>
        <DeliveryHeader
          service="쿠팡이츠서비스 배달"
          address="서울시 강남구 쿠팡이츠 1-1"
          orderCode="GRMTON"
        />

        <DeliveryRequest
          request='문고리에 걸어 두시고 문자 주세요! 벨은 누르지 말아주세요.'
        />

        <div className={styles.menuSection}>
          <div className={styles.orderCode}>GRMTON</div>
          <div className={styles.menuRow}>
            <span>설렁탕(공기밥포함) x 3개</span>
            <span className={styles.menuPrice}>0,000원</span>
          </div>
          <div className={styles.menuDetail}>결경이 김치 160g</div>
          <div className={styles.menuRow}>
            <span className={styles.menuLabel}>주문금액</span>
            <span className={styles.menuPrice}>0,000원</span>
          </div>
          <div className={styles.menuNotice}>
            고객 계좌정보가 보이면 노출되지 않도록 유의해주세요.
          </div>
        </div>

        <button className={styles.supportBtn}>
          <span className={styles.supportIcon}>☎️</span>
          파트너 지원센터에 전화
        </button>

        <div className={styles.photoGuide}>
          <span className={styles.photoIcon}>📷</span>
          <span>
            배달 완료 후 인증 사진을 꼭 찍어주세요<br />
            <span className={styles.photoGuideSub}>
              (다만 계좌번호 등 개인정보가 사진에 노출되지 않도록 유의)
            </span>
          </span>
        </div>

        <button className={styles.photoBtn}>배달상태 촬영</button>

        <div className={styles.bottomNotice}>
          ※ 배달 완료 후 CS 발생시 사진이 없으면 배달완료 처리가 어려울 수 있습니다.
        </div>
      </div>
    </div>
  );
}
