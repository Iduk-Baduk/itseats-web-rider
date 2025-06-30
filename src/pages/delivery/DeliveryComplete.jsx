import DeliveryCompleteSummary from "../../components/delivery/DeliveryCompleteSummary";
import styles from "./DeliveryComplete.module.css";

export default function DeliveryComplete() {
  return (
    <div className={styles.wrapper}>
      {/* 지도(배경) */}
      <div className={styles.mapArea}>
        <img src="/images/map_sample.png" alt="지도" className={styles.mapImg} />
      </div>
      {/* 하단 배달완료 카드 */}
      <DeliveryCompleteSummary
        service="쿠팡이츠서비스"
        amount="0,000원"
        baseFee="0,000원"
        extraFee="+0,000원"
        missionText="9건 더하면 1만원"
        missionProgress="10건 배달"
        onConfirm={() => alert("확인")}
      />
    </div>
  );
}
